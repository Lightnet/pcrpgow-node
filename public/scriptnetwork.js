
//http://stackoverflow.com/questions/950087/include-a-javascript-file-in-another-javascript-file
function loadScript(url, callback)
{
    // Adding the script tag to the head as suggested before
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = callback;
    script.onload = callback;

    // Fire the loading
    head.appendChild(script);
}

var socket;

pc.script.create('scriptnetwork', function (app) {
    // Creates a new Scriptnetwork instance
    var Scriptnetwork = function (entity) {
        this.entity = entity;
        this.socket = null;
    };

    Scriptnetwork.prototype = {

        // Called once after all resources are loaded and before the first update
        initialize: function () {
            var self = this;
            var InitSocket = function() {
                self.socket = socket = io('http://127.0.0.1:3000/');
                self.setupsocket();
            };
            loadScript("http://localhost:3000/socket.io/socket.io.js", InitSocket);

            console.log("set network?");
            //console.log(app.root.script.);
            //console.log(app.scene.root.script.scriptnetwork);
            //app.scene.root.script.scriptnetwork.message("hello");

            //method #1
            //app.scene.root.script.scriptnetwork;
            //method #2
            //var root = app.root.findByName("Root");
            //root.script.scriptnetwork;
        },

        setupsocket: function () {
            this.socket.on('connect', function () {
                console.log('server connected');
                //socket.emit('getdiscordclient');
            });
            this.socket.on('disconnect', function () {
                console.log('server disconnected');
            });
            console.log("set up?");
        },


        message: function (dt) {
            console.log(dt);
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
        }
    };

    return Scriptnetwork;
});
