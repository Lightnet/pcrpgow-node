"use strict";
var Globals;
(function (Globals) {
    Globals.m_Name = "Game Manage";
})(Globals = exports.Globals || (exports.Globals = {}));
var instanceworld = (function () {
    function instanceworld() {
        this.self = this;
        this.modulelist = [];
        if (Globals.m_Instance == null) {
            Globals.m_Instance = this.self;
            this.id = Math.random();
        }
        else if (Globals.m_Instance != this.self) {
            this.self = Globals.m_Instance;
        }
        return this;
    }
    instanceworld.prototype.addModule = function (_module) {
        this.modulelist.push(_module);
    };
    instanceworld.prototype.getID = function () {
        return this.id;
    };
    return instanceworld;
}());
exports = (module).exports = new instanceworld();
