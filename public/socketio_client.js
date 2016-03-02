console.log("socket.io");
var socket = io();
//console.log(socket);

socket.on('connect', function(){
    //$('#messages').append($('<li>').text(msg));
    console.log('connect');
});
