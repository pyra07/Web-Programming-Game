// Express import
const express = require('express');
const app = express();
const serv = require ('http').Server(app);
var clients = 0;

app.use(express.static(__dirname));
app.use(express.static('client'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/client/index.html');
});

var portNumber = (2000);
serv.listen(2000);
console.log('server connection')

// socket.io import
var io = require('socket.io') (serv, {});

// Initialization
var SOCKET_LIST = {};
var POLICE_PLAYERS = {};
var CRIMINAL_PLAYERS = {};

// Police Player
var police = function(id) {
    var self = {
    x: 15,
    y: 50 ,
    width: 45,
    height: 45,
    color: 'blue',
    xSpeed: 4,
    }
    return self
}

// On Connection
io.sockets.on('connection', function(socket) {
    console.log('socket connection');
    
    socket.id = Math.random();
    socket.x = 0;
    socket.y = 0;
    socket.number = " " + Math.floor(10 * Math.random());

    SOCKET_LIST[socket.id] = socket;

    if (POLICE_PLAYERS == [] || POLICE_PLAYERS.length < CRIMINAL_PLAYERS.length) {
        var player = police(socket.id)
        POLICE_PLAYERS[socket.id] = player;
    }

    else {
        CRIMINAL_PLAYERS[socket.id] = socket; 
    }

})

// On Disconnect
io.sockets.on('disconnect', function(socket) {
    console.log('socket disconnection');
    delete SOCKET_LIST[socket.id];
    delete CRIMINAL_PLAYERS[socket.id];
    delete POLICE_PLAYERS[socket.id]
})

// Sending Packs
setInterval(function() {

    var packPol = [];   

    for(var i in POLICE_PLAYERS) {
        var player = POLICE_PLAYERS[i];
        var model = player;

        packPol.push({
            object: model
            });
    }

    for (var i in SOCKET_LIST) {
        var socket = SOCKET_LIST[i];
        socket.emit('newPositions', packPol);
    }

}, 1000/60) ;