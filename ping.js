var http = require('http');
var io = require('socket.io');

server = http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write('<html>\n');
  res.write('  <head>\n');
  res.write('    <title>Node Ping</title>\n');
  res.write('    <script src="/socket.io/socket.io.js"></script>\n');
  res.write('    <script>\n');
  res.write('        var socket = new io.Socket();\n');
  res.write('        socket.on("connect",function(){ });\n');
  res.write('        socket.on("message",function(){ socket.send(1); });\n');
  res.write('        socket.connect();\n');
  res.write('    </script>\n');
  res.write('  </head>\n');
  res.write('  <body>\n');
  res.write('    <h1>Node Ping</h1>\n');
  res.write('  </body>\n');
  res.write('</html>\n');
  res.end();
});
server.listen(8080);

console.log('Server running at http://127.0.0.1:8080/');

var socket = io.listen(server);

socket.on('connection',function(client){
  var start = new Date().getTime();
  client.send(1);
  console.log(client);
  client.on('message',function(message){ client.send(1);  console.log( (new Date()).getTime() - start ); start = new Date().getTime();});
  client.on('disconnect',function(){});
});