/*
    Name:
    Link:https://bitbucket.org/Lightnet/
    Created By: Lightnet
    License: Creative Commons Zero [Note there multiple Licenses]
    Please read the readme.txt file for more information.
*/
//https://docs.mongodb.org/getting-started/shell/tutorial/install-mongodb-on-windows/
/// <reference path="./DefinitelyTyped/node/node.d.ts" />
/// <reference path="./DefinitelyTyped/express/express.d.ts" />
// ============================================== NODEJS
/// <reference path="./app/config.ts" />
/// <reference path="./app/initalizers/00_packetmodels.ts" />
/// <reference path="./app/initalizers/01_mongodb.ts" />
/// <reference path="./app/routes/error_route.ts" />
/// <reference path="./app/libs/socketio_handle.ts" />
/// <reference path="./app/libs/engineio_handle.ts" />
/// <reference path="./app/libs/manageplugin.ts" />
/*global mongoose, config */
//console.log(module);
if (typeof __dirname == 'undefined') {
    __dirname = ".";
}
//===============================================
// Plugin setup
//===============================================
var manageplugin = require('./app/libs/manageplugin.js');
config = require(__dirname + "/app/config.js");
manageplugin.setConfig(config);
console.log("MODE:" + config.mode);
var favicon = require('serve-favicon');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var methodOverride = require('method-override');
var compression = require('compression');
var session = require('express-session');
var flash = require('connect-flash');
var connect = require('connect');
var cookieParser = require('cookie-parser');
var path = require('path');
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
var routes = require('./app/routes/index');
var users = require('./app/routes/users');
var enabledTransports = ['polling']; // possible options: ['polling', 'websocket', 'flashsocket']
var engine = require('engine.io');
//var engineio = new engine.Server({ transports: enabledTransports });
var engineio = new engine.Server({ 'transports': ['websocket', 'polling'] });
engineio.attach(http);
//var engineio = engine.attach(http);
//console.log(engineio);
//app.get('/', function(req, res) {
//res.send('user ' + req.params.id);
//engineio.handleRequest(req, res);
//});
app.get('/engine.io.js', function (req, res) {
    res.sendFile(path.join(__dirname + '/node_modules/engine.io-client/engine.io.js'));
});
if (__dirname == null) {
    __dirname = "./";
}
//var routes = express.Router(); //Router is for page access
//load initalizers
//console.log("loading Sync initalizers:");
var init_files = fs.readdirSync(__dirname + "/app/initalizers");
init_files.forEach(function (initFile) {
    if (path.extname(initFile) == '.js') {
        console.log('loading initalizer: ' + initFile);
        require(__dirname + "/app/initalizers/" + initFile);
    }
});
//load models
//console.log("loading Sync models:");
var model_files = fs.readdirSync(__dirname + "/app/models");
model_files.forEach(function (modelFile) {
    if (path.extname(modelFile) == '.js') {
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
    model_files.forEach(function (modelFile) {
        var modulepath = __dirname + "/plugins/" + modelFile + "/";
        var modulepathname = modulepath + "index.json";
        try {
            //load the json file for config
            var scriptconfig = require(modulepath);
            if (scriptconfig.bable == false) {
                console.log("[Disable]Module Name:" + scriptconfig.name);
            }
            else {
                try {
                    //console.log(scriptmodule);
                    //console.log(modulepath + scriptmodule.script);
                    //load json from file name script
                    var scriptmodule = require(modulepath + scriptconfig.script);
                    //check if the function exist to set the url page name link
                    //add module
                    manageplugin.addModule(scriptmodule);
                    console.log("[PASS]Module Name:" + scriptconfig.name);
                }
                catch (err) {
                    console.log("[FAIL]Module Name:" + scriptconfig.name);
                }
            }
        }
        catch (err) {
            //console.log("Fail to load! | Doesn't exist!");
            console.log("[FAIL]Module Name:" + modelFile);
            console.log(err);
        }
    });
}
else {
    console.log("[ = disable modules = ]");
}
if ('development' == config.mode) {
    app.use(function (req, res, next) {
        //console.log("process....");
        //res.header('Access-Control-Allow-Origin', 'http://localhost:3000/');
        //res.header("Access-Control-Allow-Origin", "*");
        //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        //engineio.handleRequest(req, res);
        next();
    });
    //app.use("/engine.io/",function(req, res, next) {
    //console.log("engine.io");
    //res.header('Access-Control-Allow-Origin', "true");
    //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    //engineio.handleRequest(req, res);
    //next();
    //});
    app.set('view engine', 'ejs'); // set up ejs for templating
    app.set('views', [__dirname + '/app/views']);
    //app.use(favicon(__dirname + '/public/favicon.ico',{ maxAge: 1000 }));
    //app.use(favicon('./public/favicon.ico',{ maxAge: 1000 }));
    app.use(compression());
    // parse application/json
    app.use(bodyParser.json());
    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: false })); // get information from html forms
    // parse application/vnd.api+json as json
    //app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
    // required for passport
    app.use(cookieParser()); // required before session.
    app.use(require('express-session')({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false
    }));
    app.use(passport.initialize());
    app.use(flash());
    app.use(passport.session());
    app.use("/", express.static('./public')); //redirect folder path
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
    manageplugin.AssignBeforeSession(app, session, config);
    manageplugin.AssignSession(app, session, config);
    app.use(methodOverride());
    manageplugin.AssignAfterSession(app, session, config);
    //app.use(passport.initialize());//working with the express 4
    //app.use(passport.session()); // persistent login sessions
    //app.use(flash()); // use connect-flash for flash messages stored in session
    app.use(routes);
    console.log("[ = Production Express Config... = ]");
}
//set up route if exist for plugin module
manageplugin.SetRoutes(routes, app);
routes.get('/', function (req, res) {
    //res.send('Hello World');
    res.render('home', {});
});
//set up route urls
app.use('/', routes);
// ==============================================
// passport strategy
// ==============================================
require('./app/libs/passport_strategy')(passport);
// ==============================================
// socket.io
// ==============================================
require('./app/libs/socketio_handle.js')(io);
// ==============================================
// engine.io
// ==============================================
require('./app/libs/engineio_handle.js')(engineio);
//var jsdom  = require('jsdom');
//jsdom.env({
//html: "<html><body><canvas id='application-canvas'></canvas></body></html>",
//done: function(errs, _window) {
//global var
//document = _window.document;
//window = _window
//var Ammo = require('ammo.js');
//global.window = _window;
//console.log(Ammo);
//console.log("load window var");
//LoadPlayCanvas();
//}
//});
var HOSTIP = process.env.IP || "0.0.0.0";
var HOSTPORT = process.env.PORT || 3000;
//console.log(process);
http.listen(HOSTPORT, HOSTIP, function () {
    //console.log('http://' + HOSTIP + ':' + HOSTPORT +'/');
    //console.log('http://' + HOSTIP + ':' + HOSTPORT +'/'+'forum');
    //console.log('http://' + HOSTIP + ':' + HOSTPORT +'/'+'game');
    console.log('listening on:' + HOSTIP + ':' + HOSTPORT);
    console.log(new Date());
});
