pc.script.create('networkmanagement', function (app) {
    // Creates a new Networkmanagement instance
    var Networkmanagement = function (entity) {
        this.entity = entity;
        //this.scriptnetwork = entity;
    };

    Networkmanagement.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            //console.log(this.scriptnetwork);
            //console.log(app);
            //console.log(this.entity.root.findByName('scriptnetwork'));
            //scriptnetwork.js
            //Type script
            console.log(app.root.findByName("Root"));

            //app.scene.root.script.scriptnetwork

            //var root = app.root.findByName("Root")
            //root.script.scriptnetwork


        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
        }
    };

    return Networkmanagement;
});
