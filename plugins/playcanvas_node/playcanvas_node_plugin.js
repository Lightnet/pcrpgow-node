/*
	Name:
	Link:https://bitbucket.org/Lightnet/
	Created By: Lightnet
	License: Creative Commons Zero [Note there multiple Licenses]
  	Please read the readme.txt file for more information.
*/


//Note this base function current set to the plugin module setup
var express = require('express');
var manageplugin = require('../../app/libs/manageplugin');
var playcanvas_engine = require('./playcanvas_engine.js');
//===============================================
// Config
//===============================================
module.exports._config = require('./index.json');
//===============================================
// route
//===============================================
module.exports.setroute = function(routes,app){
	//console.log('Base Module ');
	//set current plugin public folder dir
	app.use(express.static(__dirname + '/public'));
	//set current views folder dir
	manageplugin.addAppView(app, __dirname + '/views');

	routes.get('/pc', function (req, res) {
		res.contentType('text/html');
		//res.send('Hello World!');
		res.render('pc.ejs', {});
	});

	routes.get('/eio', function (req, res) {
		res.contentType('text/html');
		//res.send('Hello World!');
		res.render('eio.ejs', {});
	});
};
//===============================================
// Socket.IO
//===============================================
module.exports.socketio_connect = function(io, socket){
	playcanvas_engine.socketio_connect(io, socket);
};
module.exports.socketio_disconnect = function(io, socket){
 	playcanvas_engine.socketio_disconnect(io, socket);
};
//===============================================
// Engine.IO
//===============================================
module.exports.engineio_connect = function(engineio,socket){
	playcanvas_engine.engineio_connect(engineio,socket);
};
module.exports.engineio_message = function(data,socket){
	playcanvas_engine.engineio_message(data,socket);
};
module.exports.engineio_close = function(socket){
	playcanvas_engine.engineio_close(socket);
};
