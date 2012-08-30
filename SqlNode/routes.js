
var config = require('./config.js');

exports.setup = function(params) {

 var controllers = params.controllers;
 var app = params.app;    
app.get('/', controllers.CategoryController.index);
app.get('/category', controllers.CategoryController.index);
app.get('/category/create', controllers.CategoryController.newCategory);
app.post('/category/submit', controllers.CategoryController.saveCategory);
app.post('/category/update', controllers.CategoryController.updateCategory);
app.get('/category/edit/:id', controllers.CategoryController.editCategory);
app.get('/category/delete/:id', controllers.CategoryController.deleteCategory);
};