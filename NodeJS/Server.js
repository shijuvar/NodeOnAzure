var http = require('http');
var port=process.env.PORT;
var querystring = require('querystring');
var utils = require('util');
var url = require("url");

 var server = http.createServer(function(req, res) {
  switch (req.url) { //checking the request url
    case '/':
      homePageHandler (req, res); //handler for home page
      break;
    case '/register':  
      registerFormHandler (req, res);//hamdler for register
      break;
    default:
      nofoundHandler (req, res);// handler for 404 not found
      break;
  }
});
server.listen(port);
//function to display the html form
function homePageHandler (req, res) {
console.log('Request handler home was called.');
  res.writeHead(200, {'Content-Type': 'text/html'});
   var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/register" method="post">'+
    'Name:<input type=text value="" name="name" size=15></br>'+
    'Email:<input type=text value="" name="email" size=15></br>'+
    '<input type="submit" value="Submit" />'+
    '</form>'+
    '</body>'+
    '</html>';
//response content
res.end(body);
}
//handler for Post request
function registerFormHandler (req, res) {
console.log('Request handler register was called.');    
var pathname = url.parse(req.url).pathname;
console.log("Request for " + pathname + " received.");    
 var postData = "";    
  req.on('data', function(chunk) {
      // append the current chunk of data to the postData variable
      postData += chunk.toString();
    });   
    req.on('end', function() {   
   // doing something with the posted data
      res.writeHead(200, "OK", {'Content-Type': 'text/html'});      
      // parse the posted data
      var decodedBody = querystring.parse(postData);      
      // output the decoded data to the HTTP response          
      res.write('<html><head><title>Post data</title></head><body><pre>');
      res.write(utils.inspect(decodedBody));    
      res.write('</pre></body></html>');       
      res.end();
    });
}
//Error handler for 404 no found
function nofoundHandler(req, res) {
  console.log('Request handler nofound was called.');    
  res.writeHead(404, {'Content-Type': 'text/plain'});
  res.end('404 Error - Request handler not found'); 
}