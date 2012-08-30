var config=require("../config");
module.exports = function(params) {

    var controller = controller || {};
    var sql = params.sql;
    //connection string from config file
    var conn_str =  config.sqlExpressConnection;
    //Index Page
    controller.index = function(req, res) {
        var categories = [];
        var query = "SELECT CategoryID, Name, Description FROM dbo.Categories";    
        sql.open(conn_str, function(err, conn) {
            if(err) {
                res.render('error',
                    {
                        title: 'Error opening the connection!',
                        layout: false,
                        error: 'Could not open the database connection'
                    });
                return;
            }

            conn.queryRaw(query, function(err, results) {
                if(err) {
                    res.render('error',
                        {
                            title: 'Error running query!',
                            layout: false,
                            error: 'Error running the query'
                        });
                    return;
                }

                for(var i = 0; i < results.rows.length; i++) {
                    categories[i] = {
                        ID: results.rows[i][0],
                        Name: results.rows[i][1],
                        Description: results.rows[i][2]
                    };
                }
                res.render('index', { title: 'CategoryList', categories: categories });
            }); //conn.queryRaw
        }); // sql.open
    };
    //New Category
    controller.newCategory = function(req, res) {
        res.render('create', { title: 'Create Category' });
    };
    //Save the new Category
    controller.saveCategory = function(req, res) {
        if(req.body) {
            var query = "INSERT INTO dbo.Categories (Name,Description)" +
                 " VALUES (?, ?)";
            var params = [req.body.name,
                      req.body.description];
            sql.open(conn_str, function(err, conn) {
                if(err) {
                    res.render('error.jade',
                    {
                        title: 'Error running query command',
                        layout: false,
                        error: 'Could not open database connection'
                    });
                    return;
                }
                conn.queryRaw(query, params, function(err, results) {
                    if(err) {
                        res.render('error.jade',
                    {
                        title: 'Error running query',
                        layout: false,
                        error: 'Database insert failed'
                    });
                        return;
                    }
                    res.redirect('/category');

                });
            }); // sql.open
        }
        else {
            res.render('error.jade',
            {
                title: 'Error posting Category',
                layout: false,
                error: 'Posted data not found'
            });
        }
    };
    //Edit Category
    controller.editCategory = function(req, res) {
        var params = [req.params.id];
        var query = "SELECT CategoryID, Name, Description FROM dbo.Categories WHERE CategoryID = ?";
        sql.open(conn_str, function(err, conn) {
            if(err) {
                res.render('error',
                {
                    title: 'Error opening the connection!',
                    layout: false,
                    error: 'Could not open the database'
                });
                return;
            }
            conn.queryRaw(query, params, function(err, results) {
                if(err) {
                    res.render('error',
                    {
                        title: 'Error running query!',
                        layout: false,
                        error: 'Error running the query'
                    });
                    return;
                }
                var category = {
                    ID: results.rows[0][0],
                    Name: results.rows[0][1],
                    Description: results.rows[0][2]
                };
                res.render('edit', { title: 'Edit Category', category: category });
            }); //conn.queryRaw
        }); // sql.open
    };
    //Delete Category
    controller.deleteCategory = function(req, res) {
        var params = [req.params.id];
        var query = "DELETE FROM dbo.Categories WHERE CategoryID = ?";
        sql.open(conn_str, function(err, conn) {
            if(err) {
                res.render('error',
                {
                    title: 'Error opening the connection!',
                    layout: false,
                    error: 'Could not open the database'
                });
                return;
            }

            conn.queryRaw(query, params, function(err, results) {
                if(err) {
                    res.render('error',
                    {
                        title: 'Error running query!',
                        layout: false,
                        error: 'Error running the query'
                    });
                    return;
                }
                res.redirect('/category');
            }); //conn.queryRaw
        }); // sql.open
    };
    //Update Category
    controller.updateCategory = function(req, res) {
        if(req.body) {
            var query = "UPDATE dbo.Categories SET Name=?,Description=? WHERE CategoryID=?";
            var params = [req.body.name,
                      req.body.description,
                      req.body.id];
            sql.open(conn_str, function(err, conn) {
                if(err) {
                    res.render('error.jade',
                    {
                        title: 'Error running query!',
                        layout: false,
                        error: 'Could not open database'
                    });
                    return;
                }                
                conn.queryRaw(query, params, function(err, results) {
                    if(err) {
                        res.render('error.jade',
                    {
                        title: 'Error running query',
                        layout: false,
                        error: 'Database update failed'
                    });
                        return;
                    }
                    res.redirect('/category');

                });
            }); // sql.open
        }
        else {
            res.render('error.jade',
            {
                title: 'Error posting Category',
                layout: false,
                error: 'Posted data not found'
            });
        }
    };
    return controller;
}