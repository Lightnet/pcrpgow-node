/*
    Project Name: Node Web Sandbox API
    Link:https://bitbucket.org/Lightnet/nodewebsandboxapi
    Created By: Lightnet
    License: Please read the readme.txt file for more information.
  
    Information:
    
*/

//static file once loaded
//var crypto = require('crypto');

var io;
var socket;
var db;

function dateFormat (date, fstr, utc) {
  utc = utc ? 'getUTC' : 'get';
  return fstr.replace (/%[YmdHMS]/g, function (m) {
    switch (m) {
    case '%Y': return date[utc + 'FullYear'] (); // no leading zeros required
    case '%m': m = 1 + date[utc + 'Month'] (); break;
    case '%d': m = date[utc + 'Date'] (); break;
    case '%H': m = date[utc + 'Hours'] (); break;
    case '%M': m = date[utc + 'Minutes'] (); break;
    case '%S': m = date[utc + 'Seconds'] (); break;
    default: return m.slice (1); // unknown code, remove %
    }
    // add leading zero if required
    return ('0' + m).slice (-2);
  });
}

// load the things we need
//var mongoose = require('mongoose');

//===============================================
// Config
//===============================================

module.exports._config = require('./index.json');



var bottext = [
    { "question": "hi", "answer": "hello!" },
    { "question": "how are you", "answer": "I am fine." },
    { "question": "hello", "answer": "Heya" }
];

//===============================================
//Process that string from the data array
//===============================================

function ProcessText(_text, _socket) {
  var bFound = false;
  
  console.log(bottext.length);
  
  for (var i = 0; i < bottext.length; i++) {
    //console.log(bottext[i].question);
    //console.log(_text);
      if (bottext[i].question == _text) {
          bFound = true;
          console.log("found...");
          var botname = "bot:";
          _socket.emit('clientchat', { msgtype: 'local', msg: (botname + bottext[i].answer) });
          break;
      }
  }
  
  if(bFound == false){
    _socket.emit('chat', { msgtype: 'local', msg: ('bot:...') });
  }
}

//===============================================
// route
//===============================================

module.exports.setroute = function(routes,app){
	//console.log('Node Bot System');
	//display the index forum
    routes.get('/botsystem', function (req, res) {
       res.contentType('text/html');
       res.send('Hello World!');
		});
};

//===============================================
// Socket.io
//===============================================
module.exports.socket_connect = function(_io, _socket,_db){
  //console.log("connect! bot script!");
  
  io = _io;
  socket = _socket;
  db = _db;
  var socket = _socket;
  socket.on('chat', function (data) {
    console.log(data);
    if (data['msgtype'] != null) {
      if (data['msgtype'] == 'local') {
        var username = "guest:";
        socket.emit('clientchat', { msgtype: 'local', msg: (username + data['msg']) }); //send to current client
        console.log("chat...");
        ProcessText(data['msg'], socket); // function to ProcessText();
      }
    }
  });
  
};


module.exports.socket_disconnect = function(io, socket,db){
 //console.log("disconnect! bot script!");
};
