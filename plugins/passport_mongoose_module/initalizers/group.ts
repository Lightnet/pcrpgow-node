/*
	Project Name: Node Web Sandbox
	Link:https://bitbucket.org/Lightnet/nodewebsandbox
	
	Information: To create a bot and rpg system with the module plug-in build prototype.
	Currently work in progress builds.
	
	Notes: Working toward multiple builds to keep simple and stable to run host server.
	
	Please read the readme.txt file for more information.
	
*/
declare var mongoose;
// load the things we need
//var mongoose = require('mongoose');
//var bcrypt   = require('bcrypt-nodejs');
// define the schema for our user model
var groupSchema = new mongoose.Schema({
	userid:String,
    username:String,
	subject:String,
	content:String,
	locked:Boolean,
	password:Boolean,
	flaged:Boolean,
	date: { type: Date, default: Date.now }
});

// generating a hash
//userSchema.methods.generateHash = function(password) {
    //return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
//};

// checking if password is valid
//userSchema.methods.validPassword = function(password) {
    //return bcrypt.compareSync(password, this.local.password);
//};

// create the model for users and expose it to our app
module.exports = Group = mongoose.model('Group', groupSchema);
