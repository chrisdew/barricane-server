var http = require('http');
var io = require('socket.io');
var wina = require('./wina.js');
var readFileSync = require("fs").readFileSync;
var jsdom = require("jsdom");

function handler(req, res) {
	console.log("handler called");
	jsdom.jQueryify(window, '', function (window, jquery) {
		  console.log("alpha");
		  var body = "<html>" + window.jQuery("html").html() + "</html>";
		  console.log(body); 
	      res.writeHead(200, [ ["Content-Type", "text/html"]
		                      , ["Content-Length", body.length]
		                      ] );
		  res.write(body, "utf8");
		  res.end();
		  console.log("omega");
	});
}

var server = wina.createServer('./www');
wina.get("/static", handler);


server.listen(8888, "0.0.0.0");

var file = readFileSync("./www/index.html", "utf8");
console.log("A");
var doc = jsdom.jsdom(file);
console.log("A1", doc.createWindow);
var window = doc.createWindow();
console.log("B", window);//.$('html').html());
/*
jsdom.jQueryify(window, function() {
	  window.jQuery('body').append("<div class='testing'>Hello World, It works!</div>");
	  console.log("C", window.jQuery(".testing").text());
	});
*/

console.log("D");


var socket = io.listen(server);

socket.on('connection',function(client){
  var start = new Date().getTime();
  client.send(1);
  console.log(client);
  client.on('message',function(message){ client.send(1);  console.log( (new Date()).getTime() - start ); start = new Date().getTime();});
  client.on('disconnect',function(){}); 	
});
 