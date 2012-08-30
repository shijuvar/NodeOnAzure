module.exports = function(params) {
    return {
        CategoryController: require('./CategoryController.js')(params)      
    };
};