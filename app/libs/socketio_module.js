var manageplugin = require('./manageplugin.js');
var fs = require('fs');
var path = require('path');
module.exports = function (_io) {
    console.log("[ = socket.io = ]");
    io = _io;
    var db;
    console.log("config authorization");
    io.set('authorization', function (data, accept) {
        accept(null, true);
    });
    io.on('connection', function (socket) {
        console.log('a user connected');
        manageplugin.AssignConnect(io, socket, db);
        socket.on('ping', function () { socket.emit('pong'); });
        var hash = socket.id;
        socket.emit('iduser', hash);
        socket.userid = "player_" + hash;
        hash = null;
        socket.on('disconnect', function (data) {
            console.log('disconnect message: ' + data);
            manageplugin.AssignDisconect(io, socket, db);
        });
    });
    console.log("[ = socket.io config... = ]");
};
