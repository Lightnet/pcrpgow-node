"use strict";
var Globals;
(function (Globals) {
    Globals.m_Name = "Game Manage";
})(Globals = exports.Globals || (exports.Globals = {}));
var managePlugin = (function () {
    function managePlugin() {
        this.self = this;
        this.databasetype = "";
        this.database = [];
        this.modulelist = [];
        this.routeList = [];
        this.socketconnectList = [];
        this.socketdisconnectList = [];
        this.appBeforeSession = [];
        this.appSession = [];
        this.appAfterSession = [];
        if (Globals.m_Instance == null) {
            Globals.m_Instance = this.self;
            this.id = Math.random();
        }
        else if (Globals.m_Instance != this.self) {
            this.self = Globals.m_Instance;
        }
    }
    managePlugin.prototype.setConfig = function (_config) {
        this.config = _config;
    };
    managePlugin.prototype.getConfig = function () {
        return this.config;
    };
    managePlugin.prototype.addDatabase = function (_data) {
        if (_data === void 0) { _data = {}; }
        if (_data.type != null) {
            if (_data.database != null) {
                this.databasetype = _data.type;
                this.database[_data.type] = _data.database;
            }
        }
    };
    managePlugin.prototype.getDatabase = function (_type) {
        if (_type === void 0) { _type = ""; }
        if (_type != null) {
            if (this.database[_type] != null) {
                return this.database[_type];
            }
            else {
                throw new Error('Database type not setup!');
            }
        }
    };
    managePlugin.prototype.addModule = function (_module) {
        this.modulelist.push(_module);
        if (typeof _module.setroute === 'function') {
            this.routeList.push(_module);
        }
        else {
        }
        if (typeof _module.socket_connect === "function") {
            this.socketconnectList.push(_module);
        }
        else {
        }
        if (typeof _module.socket_disconnect === "function") {
            this.socketdisconnectList.push(_module);
        }
        else {
        }
        if (typeof _module.setBeforeSession === "function") {
            this.appBeforeSession.push(_module);
        }
        if (typeof _module.setSession === "function") {
            this.appSession.push(_module);
        }
        if (typeof _module.setAfterSession === "function") {
            this.appAfterSession.push(_module);
        }
    };
    managePlugin.prototype.AssignBeforeSession = function (_app, _session, _config) {
        for (var i = 0; i < this.appBeforeSession.length; i++) {
            this.appBeforeSession[i].setBeforeSession(_app, _session, _config);
        }
    };
    managePlugin.prototype.AssignSession = function (_app, _session, _config) {
        for (var i = 0; i < this.appSession.length; i++) {
            this.appSession[i].setSession(_app, _session, _config);
        }
    };
    managePlugin.prototype.AssignAfterSession = function (_app, _session, _config) {
        for (var i = 0; i < this.appAfterSession.length; i++) {
            this.appAfterSession[i].setAfterSession(_app, _session, _config);
        }
    };
    managePlugin.prototype.removeModule = function (_module) {
        for (var i = 0; i < this.modulelist.length; i++) {
            if (this.modulelist[i] == _module) {
            }
        }
    };
    managePlugin.prototype.getModuleList = function () {
        return this.modulelist;
    };
    managePlugin.prototype.AssignRoute = function (_routes, _app) {
        for (var i = 0; i < this.routeList.length; i++) {
            this.routeList[i].setroute(_routes, _app);
        }
    };
    managePlugin.prototype.AssignConnect = function (_io, _socket, _db) {
        for (var i = 0; i < this.socketconnectList.length; i++) {
            this.socketconnectList[i].socket_connect(_io, _socket, _db);
        }
    };
    managePlugin.prototype.AssignDisconect = function (_io, _socket, _db) {
        for (var i = 0; i < this.socketdisconnectList.length; i++) {
            this.socketdisconnectList[i].socket_disconnect(_io, _socket, _db);
        }
    };
    managePlugin.prototype.addAppView = function (_app, _view) {
        var views = _app.get('views');
        views.push(_view);
        _app.set('views', views);
    };
    managePlugin.prototype.setSocketIO = function (_io) {
        this.io = _io;
    };
    managePlugin.prototype.getSocketIO = function () {
        return this.io;
    };
    return managePlugin;
}());
exports = (module).exports = new managePlugin();
