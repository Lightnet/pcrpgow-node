pc.script.create('NetworkSocketIO', function (app) {
    // Creates a new NetworkSocketIO instance
    var NetworkSocketIO = function (entity) {
        this.entity = entity;
        this.bfoundnetork = false;
        this.oldfoundnetwork = false;
        this.socket = null;
    };

    NetworkSocketIO.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            console.log(socket);
            console.log("start connect?");
        },
        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
            if(socket !=null){
                //console.log("not found");
                this.bfoundnetork = false;
            }else{
                //console.log("found");
                this.bfoundnetork = true;
            }
            if(this.bfoundnetork != this.oldfoundnetwork){
                this.socket = socket;
                this.oldfoundnetwork = this.bfoundnetork;
                console.log(this.socket);
                console.log("init???");
            }

            if(this.socket !=null){
                //console.log(this.socket);
            }
        }
    };

    return NetworkSocketIO;
});
