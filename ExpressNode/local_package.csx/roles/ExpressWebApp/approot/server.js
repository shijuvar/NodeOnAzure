/**
 * Module dependencies.
 */

var express = require('express');
//var routes = require('./routes');

var app = module.exports = express.createServer();
var port = process.env.port || 1337;
// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

function Blog(author,url,technology) {
  this.author = author;
  this.url=url;
  this.technology=technology;
}

// Technologies
var blogs = [
    new Blog('Shiju Varghese','http://weblogs.asp.net/shijuvarghese/','Windows Azure')
  , new Blog('Glenn Block','http://codebetter.com/glennblock/','Node on Azure')
  , new Blog('Steve Marx','http://blog.smarx.com/','Windows Azure') 
  , new Blog('Scott Guthrie','http://blog.smarx.com/','ASP.NET & Azure')
  , new Blog('Rinat Abdullin','http://abdullin.com/','CQRS')
];
// Routes

//app.get('/', routes.index);
app.get('/', function(req, res){
  res.render('index', {title:'home',blogs: blogs });
});

app.listen(port);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
