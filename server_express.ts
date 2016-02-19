/*
    Project Name: Node Web Sandbox API
    Link:https://bitbucket.org/Lightnet/nodewebsandboxapi
    Created By: Lightnet
    License: Please read the readme.txt file for more information.

    Information:

*/

/// <reference path="./DefinitelyTyped/node/node.d.ts" />
/// <reference path="./DefinitelyTyped/express/express.d.ts" />
// ============================================== NODEJS
/// <reference path="./app/config.ts" />
/// <reference path="./app/initalizers/00_packetmodels.ts" />
/// <reference path="./app/initalizers/01_mongodb.ts" />
/// <reference path="./app/routes/error_route.ts" />

/// <reference path="./app/libs/ViewEnableMultiFolders.ts" />
/// <reference path="./app/libs/socketio_module.ts" />
/// <reference path="./app/libs/gamemanage.ts" />
/// <reference path="./app/libs/manageplugin.ts" />
/// <reference path="./app/libs/instanceworld.ts" />

/// <reference path="./plugin_modules/passport_mongoose_module/passport.ts" />
/// <reference path="./plugin_modules/passport_mongoose_module/passport_route.ts" />

//console.log("init server...");
//console.log("init variable setup");

/*global mongoose, config */

//console.log(module);
//import required libs
var manageplugin = require('./app/libs/manageplugin.js');
config = require(__dirname + "/app/config.js");
manageplugin.setConfig(config);
console.log("MODE:"+config.mode);
var favicon = require('serve-favicon');
var express = require('express');
var app = express();
var http = require('http').Server(app);
//enable multiple views for module builds
require('./app/libs/ViewEnableMultiFolders');
var io = require('socket.io')(http);
var methodOverride = require('method-override');
var compression = require('compression');
var session = require('express-session');
var flash = require('connect-flash');
//var MongoStore = require('connect-mongo')(session);
//var passport = require('passport');
var connect = require('connect');
//var mongoose = require('mongoose');
//mongoose.connect(config.database);
var cookieParser = require('cookie-parser')
var path = require('path');
var bodyParser = require('body-parser');
var fs = require('fs');
//var net = require('net');
var path = require('path');

if(__dirname == null){
	__dirname = "./";
}


//var cachetime = 1000;
var routes = express.Router(); //Router is for page access

//load initalizers
//console.log("loading Sync initalizers:");
var init_files = fs.readdirSync(__dirname + "/app/initalizers");
init_files.forEach(function(initFile){
	if(path.extname(initFile) == '.js'){//check if javascript ext. file
		console.log('loading initalizer: ' + initFile);
		require(__dirname + "/app/initalizers/" + initFile);
	}
});

//load models
//console.log("loading Sync models:");
var model_files = fs.readdirSync(__dirname + "/app/models");
model_files.forEach(function(modelFile){
	if(path.extname(modelFile) == '.js'){//check if javascript ext. file
		console.log('loading model: ' + modelFile);
		require(__dirname + "/app/models/" + modelFile);
	}
});
//load plugin module
if (config.benablemodules) {
	console.log("[ = enable modules = ]");

	var model_files = fs.readdirSync(__dirname + "/plugins/");
	//console.log("manageplugin:");
	//console.log(manageplugin);

	model_files.forEach(function(modelFile){
		var modulepath = __dirname + "/plugins/"+modelFile+"/";
		var modulepathname = modulepath+"index.json";
		try  {
			//load the json file for config
			var scriptconfig = require(modulepath);
			if(scriptconfig.bable == false){
				console.log("[Disable]Module Name:"+scriptconfig.name);
			}else{
				try  {
					//console.log(scriptmodule);
					//console.log(modulepath + scriptmodule.script);
					//load json from file name script
					var scriptmodule =  require(modulepath + scriptconfig.script)
					//check if the function exist to set the url page name link
					//add module
					manageplugin.addModule(scriptmodule);
					console.log("[PASS]Module Name:"+scriptconfig.name);
				} catch (err) {
					console.log("[FAIL]Module Name:"+scriptconfig.name);
				}
			}
		} catch (err) {
			//console.log("Fail to load! | Doesn't exist!");
			console.log("[FAIL]Module Name:" + modelFile);
			console.log(err);
		}
	});
}else{
	console.log("[ = disable modules = ]");
}

//require('./app/passport')(passport);

if ('development' == config.mode) {

	app.set('view engine', 'ejs'); // set up ejs for templating

	app.set('views',[__dirname + '/app/views']);

	app.use("/", express.static('./public'));//redirect folder path

    app.use(favicon(__dirname + '/public/favicon.ico',{ maxAge: 1000 }));
    //app.use(favicon('./public/favicon.ico',{ maxAge: 1000 }));
    app.use(compression());
		// parse application/json
    app.use(bodyParser.json());
		// parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({extended:true})); // get information from html forms

    // parse application/vnd.api+json as json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
    // required for passport
    app.use(cookieParser()); // required before session.
    //app.use(session({secret: SECRET,key: KEY,proxy: true // if you do SSL outside of node.}));

	manageplugin.AssignBeforeSession(app,session,config);
	manageplugin.AssignSession(app,session,config);

	/*
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

    app.use(methodOverride());
    manageplugin.AssignAfterSession(app,session,config);
    //app.use(passport.initialize());//working with the express 4
    //app.use(passport.session()); // persistent login sessions
    app.use(flash()); // use connect-flash for flash messages stored in session
    app.use(routes);
	console.log("[ = Development Express Config... = ]");
}

if ('production' == config.mode) {
    //console.log('production');
    // configure stuff here
    app.enable('trust proxy');
    //app.set('port', port);
    app.set('view engine', 'ejs'); // set up ejs for templating
    //app.use(express.static('public'), { maxAge: cachetime });
    //app.use("/js", express.static('./js'));//redirect folder path
    //app.use(favicon('./public/favicon.ico',{ maxAge: 1000 }));
    //app.use(compression());
    // required for passport
    //app.use(cookieParser()); // required before session.

	manageplugin.AssignBeforeSession(app,session,config);
	manageplugin.AssignSession(app,session,config);

	/*
    if(config.bdatabasesession){
		app.use(session({
			secret: config.SECRET,
			key: config.KEY,
			store: new MongoStore({
				url: config.database //url: 'mongodb://guest:guest@staff.mongohq.com:10034/mmo'
			}),
			//cookie: { maxAge: 900000 } // expire session in 15 min or 900 seconds
			cookie: { maxAge: 365 * 24 * 60 * 60 * 1000 }
		}));
	}else{
		app.use(session({
			secret: config.SECRET,
			key: config.KEY,
			cookie: { maxAge: 365 * 24 * 60 * 60 * 1000 }
		}));
	}
	*/
    app.use(methodOverride());
    manageplugin.AssignAfterSession(app,session,config);
    //app.use(passport.initialize());//working with the express 4
    //app.use(passport.session()); // persistent login sessions
    app.use(flash()); // use connect-flash for flash messages stored in session
    app.use(routes);
	console.log("[ = Production Express Config... = ]");
}

//set up route if exist for plugin module
manageplugin.AssignRoute(routes,app);

//require('./app/routes/passport_route')(routes, passport); //passport for access
//require('./app/routes/error_route')(routes);
//routes.get('/',function(req, res){
	//res.send('Hello World');
//});
app.use('/', routes);

// ==============================================
// socket.io
// ==============================================
require('./app/libs/socketio_module.js')(io);

var HOSTIP = process.env.IP || "0.0.0.0";
var HOSTPORT = process.env.PORT || 3000;

http.listen(HOSTPORT, HOSTIP, function () {
	//console.log('http://' + HOSTIP + ':' + HOSTPORT +'/');
	//console.log('http://' + HOSTIP + ':' + HOSTPORT +'/'+'forum');
	//console.log('http://' + HOSTIP + ':' + HOSTPORT +'/'+'game');
    console.log('listening on:' + HOSTIP + ':' + HOSTPORT);
    console.log(new Date());
});
