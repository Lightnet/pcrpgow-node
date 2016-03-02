/*
	Project Name: Node Web Sandbox
	Link:https://bitbucket.org/Lightnet/nodewebsandbox

	Information: To create a bot and rpg system with the module plug-in build prototype.
	Currently work in progress builds.

	Notes: Working toward multiple builds to keep simple and stable to run host server.

	Please read the readme.txt file for more information.

*/
console.log("USER?");
// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
// define the schema for our user model
var userSchema = mongoose.Schema({
    local            : {
        email        : String,
        password     : String
    },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    access:{
        level:String,
        title:String,
        group:String
    },
    profile:{
        username:String,
        date:String
    }
});

// generating a hash
userSchema.methods.generateHash = function(password) {
		//console.log("generateHash:"+password);
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
		//console.log("validPassword:"+password);
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
