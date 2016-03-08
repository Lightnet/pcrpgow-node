/*
	Name:
	Link:https://bitbucket.org/Lightnet/
	Created By: Lightnet
	License: Creative Commons Zero [Note there multiple Licenses]
  	Please read the readme.txt file for more information.
*/


var express = require('express');

//===============================================
// Config
//===============================================
module.exports._config = require('./index.json');

//===============================================
// route
//===============================================

module.exports.setroute = function(routes,app){

  //console.log('plugin module');
  app.use(express.static(__dirname + '/public'));

};
