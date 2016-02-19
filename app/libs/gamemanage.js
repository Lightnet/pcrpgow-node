"use strict";
var Globals;
(function (Globals) {
    Globals.m_Name = "Game Manage";
})(Globals = exports.Globals || (exports.Globals = {}));
var Manage = (function () {
    function Manage() {
        this.self = this;
        if (Globals.m_Instance == null) {
            Globals.m_Instance = this;
            this.id = Math.random();
        }
        else if (Globals.m_Instance != this) {
            this.self = Globals.m_Instance;
        }
        console.log("init manage" + this.id);
    }
    return Manage;
}());
var Data = (function () {
    function Data() {
        console.log("init manage");
    }
    return Data;
}());
(module).exports = Manage;
