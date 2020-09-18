var express = require('express');
var socket = require('socket.io')
// Application Setup

var app = express();
// creating server
var port = process.env.PORT||8000
var server = app.listen(port,function(){
  console.log("Requested");
});

// Static Files

app.use(express.static('Public'));

// Setting up socket

var io = socket(server);

io.on('connection',function(socket){
  console.log('new connection');

  socket.on('calculate',function(data){
    io.sockets.emit('calculate',data);

  });
});
