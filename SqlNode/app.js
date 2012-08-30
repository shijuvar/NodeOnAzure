var express = require('express');
var path=require('path');
var http=require('http');
var sql = require('node-sqlserver');
var controllers = require('./controllers')({ 'sql': sql });
var routes = require('./routes.js');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});
//Configure routes and setup corresponding controllers
routes.setup({
    'controllers': controllers,
    'app': app
});
app.listen(process.env.port || 3000);