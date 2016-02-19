/*
    Project Name: Node Web Sandbox API
    Link:https://bitbucket.org/Lightnet/nodewebsandboxapi
    Created By: Lightnet
    License: Please read the readme.txt file for more information.
  
    Information:
    
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