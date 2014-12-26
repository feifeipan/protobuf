 var socket = require('socket.io-client')('http://localhost:8080');
var ProtoBuf = require("protobufjs");

var builder = ProtoBuf.loadProtoFile("complex.proto"),
    Game = builder.build("Game"),
    Car = Game.Cars.Car;

var car = new Car({
    "model": "Rusty",
    "vendor": {
        "name": "Iron Inc.",
        "address": {
            "country": "US"
        }
    },
    "speed": "SUPERFAST" // also equivalent to "speed": 2
});

var byteBuffer = car.encode();
var buffer = byteBuffer.toArrayBuffer();

socket.on('connect', function(){
	console.log("connect");
});
socket.on('news', function(data){
	console.log(data);
	console.log(buffer);
});

socket.emit('send proto data',  buffer);
socket.on('disconnect', function(){
	console.log("disconnect");
});

