/*
    Project Name: Node Web Sandbox API
    Link:https://bitbucket.org/Lightnet/nodewebsandboxapi
    Created By: Lightnet
    License: Please read the readme.txt file for more information.

    Information:

*/
/* global mongoose */

var express = require('express');
//var passport;// = require('passport');
var passport = require('passport');
var fs = require('fs');
var path = require('path');
var methodOverride = require('method-override');
var flash = require('connect-flash');

try  {
    var manageplugin = require('../../app/libs/manageplugin');
    //manageplugin = new manageplugin();
    //console.log(manageplugin);
} catch (err) {
	console.log(err);
}

var config = manageplugin.getConfig();
//var mongooseclass = require('mongoose');
//mongoose = mongooseclass.createConnection(config.database_url);

try  {
    var init_files = fs.readdirSync(__dirname + "/initalizers");
    init_files.forEach(function(initFile){
    	if(path.extname(initFile) == '.js'){//check if javascript ext. file
    		//console.log('loading initalizer: ' + initFile);
    		require(__dirname + "/initalizers/" + initFile);
    	}
    });
} catch (err) {
	console.log(err);
}



//===============================================
// Config
//===============================================
module.exports._config = require('./index.json');


module.exports.setBeforeSession = function(_app,_session,_config){
    config = _config;
    console.log("setBeforeSession");
    //passport = require('passport');
    require('./passport')(passport,_config);
}
//module.exports.setSession = function(app,session,config){
//}
module.exports.setAfterSession = function(app,session,config){
    console.log("setAfterSession");
    //app.use(methodOverride());
    app.use(passport.initialize());//working with the express 4
    app.use(passport.session()); // persistent login sessions
    app.use(flash());
}

//===============================================
// route
//===============================================

module.exports.setroute = function(routes,app){
  //console.log("PASSPORT....");
  try  {
	    manageplugin.addAppView(app, __dirname + '/views');
	} catch (err) {
	    console.log(err);
  }

  try  {
    require('./passport_route')(routes, passport, config); //passport for access
  } catch (err) {
	    console.log(err);
  }
};
