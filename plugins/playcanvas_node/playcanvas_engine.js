/*
	Name:
	Link:https://bitbucket.org/Lightnet/
	Created By: Lightnet
	License: Creative Commons Zero [Note there multiple Licenses]
  	Please read the readme.txt file for more information.
*/


//console.log('playcanvas plugin?');
//===============================================
// browser variable setup start
//===============================================
//global var
Element = {}; //emulate browser variable
Element.prototype={mozRequestFullScreen:false}
navigator = {};//emulate browser variable
navigator.prototype={isCocoonJS:false}
//webgl null function for headless server
var webgl_null = function(){};
//headless null all functions
webgl_null.prototype={
    getParameter:function(){},
    getExtension:function(){},
    disable:function(){},
    blendFunc:function(){},
    blendEquation:function(){},
    colorMask:function(){},
    enable:function(){},
    cullFace:function(){},
    depthMask:function(){},
    clearDepth:function(){},
    clearColor:function(){},
    createBuffer:function(){},
    bindBuffer:function(){},
    bufferData:function(){},
    getError:function(){},
    vertexAttribPointer:function(){},
    deleteBuffer:function(){},
    createShader:function(){},
    shaderSource:function(){},
    compileShader:function(){},
    createProgram:function(){},
    attachShader:function(){},
};
//https://github.com/tmpvar/jsdom
var jsdom = require("jsdom").jsdom;
document = jsdom("<html><body><canvas id='application-canvas'></canvas></body></html>");
window = document.defaultView;
Ammo = require('ammo.js'); //need to be here to since it need window variable
var canvas = window.document.getElementById("application-canvas");
//override function to null webgl for headless functions
canvas.getContext=function(canvas,options){
	//webgl_null functions
	return new webgl_null();
}
//override boolean to run headless else console.log error
window.WebGLRenderingContext = true;
//===============================================
// browser variable setup end
//===============================================

//===============================================
//set up playcanvas app
//===============================================
var pc = require('./public/playcanvas-stable.min.js').pc;
//create app
var pc_app = new pc.Application(canvas,{});
//wait to load the scene when the ammo.js is finish setup
pc_app.preload(function (err) {
	if (err) {
		console.error(err);
	}
	CreateScene(pc,pc_app);
});

function CreateScene0(pc,app){
	console.log("create scene?");
	app.start();

	app.on("update", function (dt) {
		//console.log("update?");
	});
}

function CreateScene(pc,app){

  app.start();

  // Fill the available space at full resolution
  app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW);
  app.setCanvasResolution(pc.RESOLUTION_AUTO);

  app.scene.ambientLight = new pc.Color(0.2, 0.2, 0.2);

  // Utility function to create a material
  function createMaterial(r, g, b) {
    var material = new pc.scene.PhongMaterial();
    material.ambient.set(r, g, b);
    material.diffuse.set(r, g, b);
    material.specular.set(1, 1, 1);
    material.shininess = 50;
    material.update();
    return material;
  }

  // Create camera entity
  function Camera() {
    var cam = new pc.Entity();
    cam.addComponent('camera', {
      clearColor: new pc.Color(0.1, 0.1, 0.1),
      farClip: 20
    });
    app.root.addChild(cam);
    this.entity = cam;
    this.timer = 0;
  }

  Camera.prototype.update = function (dt) {
    this.timer += dt;
    // Spin the camera around a center point
    var x = Math.sin(this.timer * 0.25) * 6;
    var z = Math.cos(this.timer * 0.25) * 4;
    var e = this.entity;
    e.setPosition(x, 5, z);
    e.lookAt(0, 3, 0);
  }

  // Create spot light entity
  function Light() {
    var light = new pc.Entity();
    light.setPosition(10, 10, 10);
    light.setEulerAngles(45, 45, 0);
    light.addComponent('light', {
      type: "spot",
      intensity: 1.5,
      castShadows: true,
      range: 40
    });
    light.light.shadowResolution = 2048;
    light.light.shadowDistance = 8;
    light.light.shadowBias = 0.005;
    light.light.normalOffsetBias = 0.01;
    app.root.addChild(light);
    this.entity = light;
  }

  // Create ground
  function Ground() {
    var ground = new pc.Entity();
    ground.setPosition(0, -0.5, 0);
    ground.setLocalScale(10, 1, 10);

    ground.addComponent('model', {
      type: "box"
    });
    ground.addComponent('rigidbody', {
      type: "static"
    });
    ground.addComponent('collision', {
      type: "box",
      halfExtents: [5, 0.5, 5]
    });
    var blue = createMaterial(0.28, 0.46, 1);
    ground.model.model.meshInstances[0].material = blue;
    app.root.addChild(ground);
    this.entity = ground;
  }
  var blocks;
  // Create wall
  function Wall() {
    var black = createMaterial(0, 0, 0);
    var white = createMaterial(1, 1, 1);

    this.bricks = blocks = [];

    for (var i = 0; i < 25; i++) {
      var body = new pc.Entity();
      body.name = "box"+i;

      body.addComponent('model', {
        type: "box",
        castShadows: true
      });
      body.addComponent('rigidbody', {
        type: "dynamic"
      });
      body.addComponent('collision', {
        type: "box",
        halfExtents: [0.5, 0.5, 0.5]
      });
      app.root.addChild(body);
      body.model.model.meshInstances[0].material = i % 2 ? black : white;

      this.bricks.push(body);
    }
    blocks =  this.bricks;
    this.reset();
  }

  Wall.prototype.reset = function () {
    for (var i = 0; i < this.bricks.length; i++) {
      var e = this.bricks[i];
      e.rigidbody.teleport(i % 5 - 2, Math.floor(i / 5) + 0.5, 0, 0, 0, 0);
      e.rigidbody.linearVelocity = pc.Vec3.ZERO;
      e.rigidbody.angularVelocity = pc.Vec3.ZERO;
    }
  };

  function Ball() {
    var e = new pc.Entity();
    e.setPosition(0, -10, 0);
    e.addComponent('model', {
      type: "sphere",
      castShadows: true
    });
    e.addComponent('rigidbody', {
      type: "dynamic"
    });
    e.addComponent('collision', {
      type: "sphere",
      radius: 0.5
    });
    var red = createMaterial(1, 0.28, 0.28);
    e.model.model.meshInstances[0].material = red;
    app.root.addChild(e);
    this.entity = e;
  }

  Ball.prototype.fire = function () {
  var e = this.entity;
  e.rigidbody.teleport(0, 2, 5);
  e.rigidbody.linearVelocity = new pc.Vec3((Math.random() - 0.5) * 10, 7, -30);
  e.rigidbody.angularVelocity = pc.Vec3.ZERO;
  };

  // Create the scene
  var camera = new Camera();
  var light = new Light();
  var ground = new Ground();
  var wall = new Wall();
  var ball = new Ball();

  // Reset the wall and fire the ball every 4 seconds
  var n = 0;
  setInterval(function () {
  n++;
  if (n % 4 === 0)
    wall.reset();
  if (n % 4 === 1)
    ball.fire();
  }, 1000);

  app.on("update", function (dt) {
    var data;
    ball.entity.rigidbody.syncEntityToBody();
	//console.log(ball.entity.position.toString());
    data = null;
    camera.update(dt);
  });
}


module.exports.socketio_connect = function(io, socket){

};

module.exports.socketio_disconnect = function(io, socket){

};

module.exports.engineio_connect = function(engineio, socket){

};

module.exports.engineio_message = function(data, socket){

};

module.exports.engineio_close = function(socket){

};
