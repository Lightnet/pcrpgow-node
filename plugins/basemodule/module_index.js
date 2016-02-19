/*
    Project Name: Node Web Sandbox API
    Link:https://bitbucket.org/Lightnet/nodewebsandboxapi
    Created By: Lightnet
    License: Please read the readme.txt file for more information.
  
    Information:
    
*/

//Note this base function current set to the plugin module setup

var express = require('express');

var manageplugin = require('../../app/libs/manageplugin');

/*global getModules */

var io;
var socket;
var db;

//===============================================
// Config
//===============================================
module.exports._config = require('./index.json');


//===============================================
// Session
//===============================================

/*
module.exports.setBeforeSession = function(app,session,config){
  //console.log('Base Module ');
}

module.exports.setSession = function(app,session,config){
  //console.log('Base Module ');
}

module.exports.setAfterSession = function(app,session,config){
  //console.log('Base Module ');
}
*/
//===============================================
// route
//===============================================

/*
module.exports.setroute = function(routes,app){
  //console.log('Base Module ');
  //set current plugin public folder dir
  app.use(express.static(__dirname + '/public'));
  //set current views folder dir
	manageplugin.addAppView(app, __dirname + '/views');
    
  //routes.get('/basemodule', function (req, res) {
     //res.contentType('text/html');
     //res.send('Hello World!');
	//});
	
};
*/


//===============================================
// Socket.io
//===============================================

/*
module.exports.socket_connect = function(_io, _socket,_db){
  //console.log("disconnect! Base Module Script!"); 
  io = _io; //usable
  socket = _socket; //usable
  db = _db;// not usable -working another methods
  socket = _socket; //usable
  
  //socket.on('chat', function (data) {
    //console.log(data);
  //});
  
};

module.exports.socket_disconnect = function(io, socket,db){
 //console.log("disconnect! Base Module Script!");
};
*/