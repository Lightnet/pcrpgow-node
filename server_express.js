var manageplugin = require('./app/libs/manageplugin.js');
config = require(__dirname + "/app/config.js");
manageplugin.setConfig(config);
console.log("MODE:" + config.mode);
var favicon = require('serve-favicon');
var express = require('express');
var app = express();
var http = require('http').Server(app);
require('./app/libs/ViewEnableMultiFolders');
var io = require('socket.io')(http);
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
if (__dirname == null) {
    __dirname = "./";
}
var routes = express.Router();
var init_files = fs.readdirSync(__dirname + "/app/initalizers");
init_files.forEach(function (initFile) {
    if (path.extname(initFile) == '.js') {
        console.log('loading initalizer: ' + initFile);
        require(__dirname + "/app/initalizers/" + initFile);
    }
});
var model_files = fs.readdirSync(__dirname + "/app/models");
model_files.forEach(function (modelFile) {
    if (path.extname(modelFile) == '.js') {
        console.log('loading model: ' + modelFile);
        require(__dirname + "/app/models/" + modelFile);
    }
});
if (config.benablemodules) {
    console.log("[ = enable modules = ]");
    var model_files = fs.readdirSync(__dirname + "/plugins/");
    model_files.forEach(function (modelFile) {
        var modulepath = __dirname + "/plugins/" + modelFile + "/";
        var modulepathname = modulepath + "index.json";
        try {
            var scriptconfig = require(modulepath);
            if (scriptconfig.bable == false) {
                console.log("[Disable]Module Name:" + scriptconfig.name);
            }
            else {
                try {
                    var scriptmodule = require(modulepath + scriptconfig.script);
                    manageplugin.addModule(scriptmodule);
                    console.log("[PASS]Module Name:" + scriptconfig.name);
                }
                catch (err) {
                    console.log("[FAIL]Module Name:" + scriptconfig.name);
                }
            }
        }
        catch (err) {
            console.log("[FAIL]Module Name:" + modelFile);
            console.log(err);
        }
    });
}
else {
    console.log("[ = disable modules = ]");
}
if ('development' == config.mode) {
    app.set('view engine', 'ejs');
    app.set('views', [__dirname + '/app/views']);
    app.use("/", express.static('./public'));
    app.use(favicon(__dirname + '/public/favicon.ico', { maxAge: 1000 }));
    app.use(compression());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
    app.use(cookieParser());
    manageplugin.AssignBeforeSession(app, session, config);
    manageplugin.AssignSession(app, session, config);
    app.use(methodOverride());
    manageplugin.AssignAfterSession(app, session, config);
    app.use(flash());
    app.use(routes);
    console.log("[ = Development Express Config... = ]");
}
if ('production' == config.mode) {
    app.enable('trust proxy');
    app.set('view engine', 'ejs');
    manageplugin.AssignBeforeSession(app, session, config);
    manageplugin.AssignSession(app, session, config);
    app.use(methodOverride());
    manageplugin.AssignAfterSession(app, session, config);
    app.use(flash());
    app.use(routes);
    console.log("[ = Production Express Config... = ]");
}
manageplugin.AssignRoute(routes, app);
app.use('/', routes);
require('./app/libs/socketio_module.js')(io);
var HOSTIP = process.env.IP || "0.0.0.0";
var HOSTPORT = process.env.PORT || 3000;
http.listen(HOSTPORT, HOSTIP, function () {
    console.log('listening on:' + HOSTIP + ':' + HOSTPORT);
    console.log(new Date());
});
