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

module.exports.setBeforeSession = function(app,session,config){
    //mongoose.connect(config.database);
}

var callback = console.log; // this would normally be some callback
alice = nano.use('nano');
  
//var sessionstore = require('sessionstore');

module.exports.setSession = function(app,session,config){
	
	
	app.use(session({
		secret: config.SECRET,
		key: config.KEY,
		cookie: { maxAge: 365 * 24 * 60 * 60 * 1000 },
		resave: true,
		saveUninitialized: true
	}));
	
	/*
	app.use(express.session({
	    store: sessionstore.createSessionStore({
	        type: 'couchdb',
	        host: 'http://localhost',  // optional
	        port: 5984,                // optional
	        dbName: 'express-sessions',// optional
	        collectionName: 'sessions',// optional
	        timeout: 10000             // optional
	    })
	}));
	*/
	
	
	
	/*
	nano.session(function(err, _session) {
	  if (err) {
	    return console.log('oh noes!')
	  }
	
	  console.log('user is %s and has these roles: %j',
	    _session.userCtx.name, _session.userCtx.roles);
	});
	*/
	
	
	/*
	alice.insert(doc, function (err, body, headers) {
	  if (err) {
	    return callback(err);
	  }
	
	  // change the cookie if couchdb tells us to
	  if (headers && headers['set-cookie']) {
	    auth = headers['set-cookie'];
	  }
	
	  callback(null, "it worked");
	});
	*/
	
	
	
	
	
	
	/*
	var nano = require('nano')('http://localhost:5984/');
	
	app.get('/_session', function(req, res) {
		console.log("_session");
	    var auth = req.cookies['AuthSession'],
	        appNano;
	    console.log(auth + " from session");
	    if (!auth) {
	        res.send(401);
	    } else {
	        appNano = nano({
	            url : 'http://localhost:5984', 
	            cookie: 'AuthSession=' + auth
	        });
	        appNano.request({
	            method: "GET",
	            db: "_session"
	        }, function(err, body, headers) {
	            if (err) {
	                res.send(401);
	                return;
	            }
	            if (headers && headers['set-cookie']) {
	                res.cookie(headers['set-cookie']);
	            }
	            console.log(body);
	            res.send(body);
	        });
	    }
	});
	*/
	
	/*
	
	var ConnectCouchDB = require('connect-couchdb')(session);
	
	var store = new ConnectCouchDB({
	  // Name of the database you would like to use for sessions.
	  name: "sessions",
	  host: 'http://localhost',
      port: 5984,
	  // Optional. How often expired sessions should be cleaned up.
	  // Defaults to 600000 (10 minutes).
	  //reapInterval: 600000,
	
	  // Optional. How often to run DB compaction against the session
	  // database. Defaults to 300000 (5 minutes).
	  // To disable compaction, set compactInterval to -1
	  //compactInterval: 300000,
	  //compactInterval: 300000
	
	  // Optional. How many time between two identical session store
	  // Defaults to 60000 (1 minute)
	  //setThrottle: 60000
	});
	
	
	
	app.use(session({
			secret: config.SECRET,
			key: config.KEY,
			store:store,
			//cookie: { maxAge: 900000 } // expire session in 15 min or 900 seconds
			cookie: { maxAge: 365 * 24 * 60 * 60 * 1000 },
			resave: true,
			saveUninitialized: true
		}));
	*/
	
	
	/*
	 if(config.bdatabasesession){
		app.use(session({
			secret: config.SECRET,
			key: config.KEY,
			store:store,
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
	*/
	//Sample of get session  
	/*
	app.get('/session/:key', function(req, res){
	    console.log(req.session);
	    res.end(util.format('key:%s --> value:%s', 
	           req.params.key, req.session[req.params.key]));  
	});
	//Sample of set session
	app.get('/session/:key/:value', function(req, res){
	    req.session[req.params.key] = req.params.value;
	    res.end('OK');  
	});
	*/
	
	/*
	does not work
	var sessionstore = require('sessionstore');
	
	app.use(express.session({
	    store: sessionstore.createSessionStore({
	        type: 'mongodb',
	        host: config.database,         // optional
	        port: 5984,               // optional
	        dbName: 'sessionDb',       // optional
	        collectionName: 'sessions',// optional
	        timeout: 10000             // optional
	        // authSource: 'authedicationDatabase',        // optional
	        // username: 'technicalDbUser',                // optional
	        // password: 'secret'                          // optional
	    })
	}));
	*/
	
	/*
	
	
	*/
	
	
	
	
	
	
	
	
	/*
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
	*/
}

module.exports.setAfterSession = function(app,session,config){
    
}