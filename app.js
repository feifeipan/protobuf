var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');
var ProtoBuf = require("protobufjs");

app.listen(8080);

var builder = ProtoBuf.loadProtoFile("complex.proto"),
    Game = builder.build("Game"),
    Car = Game.Cars.Car; 

function handler (req, res) {
 /* fs.readFile('index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });*/
}

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('send proto data', function (data) {
    console.log(data);
    var buffer = Car.decode(data); 
    console.log(buffer);
    console.log(buffer.getModel("model"));
    //console.log(buffer);
  });
});



