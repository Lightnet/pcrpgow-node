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

module.exports.setBeforeSession = function(app,session,config){
    //mongoose.connect(config.database);
}

module.exports.setSession = function(app,session,config){
    var MongoStore = require('connect-mongo')(session);
    console.log("init Session");

    if(config.bdatabasesession){
		app.use(session({
			secret: config.SECRET,
			key: config.KEY,
			store: new MongoStore({
				url: config.database //url: 'mongodb://guest:guest@staff.mongohq.com:10034/mmo'
			}),
			//cookie: { maxAge: 900000 } // expire session in 15 min or 900 seconds
			cookie: { maxAge: 365 * 24 * 60 * 60 * 1000 },
			resave: true,
			saveUninitialized: true
		}));
	}else{
		app.use(session({
			secret: config.SECRET,
			key: config.KEY,
			cookie: { maxAge: 365 * 24 * 60 * 60 * 1000 },
			resave: true,
			saveUninitialized: true
		}));
	}
}

module.exports.setAfterSession = function(app,session,config){

}
