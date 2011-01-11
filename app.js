var http = require('http');
var io = require('socket.io');
var wina = require('./wina.js');
var readFileSync = require("fs").readFileSync;
var jsdom = require("jsdom")



function handler(req, res) {
	console.log("handler called");
	jsdom.jQueryify(window, './www/vendor/jquery-1.4.4.min.js', function (window, jquery) {
		  //window.jQuery('body').append("<div class='testing'>Hello World</div>");
		  console.log(window.jQuery("html").html()); // outputs Hello World
	});
	return false;
}

var server = wina.createServer('./www', handler);
wina.get("/static", handler);


server.listen(8888, "0.0.0.0");

var doc = readFileSync("./www/index.html", "utf8")
console.log("A");
var window = jsdom.jsdom(doc, false, {url: "http://127.0.0.1:8888/"}).createWindow();
console.log("B", window);//.$('html').html());
jsdom.jQueryify(window, function() {
	  window.jQuery('body').append("<div class='testing'>Hello World, It works!</div>");
	  console.log("C", window.jQuery(".testing").text());
	});


console.log("D");


var socket = io.listen(server);

socket.on('connection',function(client){
  var start = new Date().getTime();
  client.send(1);
  console.log(client);
  client.on('message',function(message){ client.send(1);  console.log( (new Date()).getTime() - start ); start = new Date().getTime();});
  client.on('disconnect',function(){}); 	
});
 