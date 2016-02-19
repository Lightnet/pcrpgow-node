/*
	Project Name: Node Web Sandbox API
	Link:https://bitbucket.org/Lightnet/nodewebsandboxapi
	Created By: Lightnet
	License: Please read the readme.txt file for more information.

	Information:

*/
/* global config */
//import required lib
var args = require('minimist')(process.argv.slice(2));
var extend = require('extend');

var environment = args.env || "development";

var common_config = {
	name:"Sandbox API server",
	version:"0.0.1",
	SECRET:'secret', //express secret key
	KEY:'express.sid', //express key
	bdatabasesession:true,
	//if you have KEY turn on if not it will cause the Error.
	benable_facebook:false,
	'facebookAuth':{
		'clientID' 		: '', // your App ID
		'clientSecret' 	: '', // your App Secret
		'callbackURL' 	: 'http://127.0.0.1:8080/auth/facebook/callback'
	},
	benable_twitter:false,
	'twitterAuth' : {
		'consumerKey' 		: '',
		'consumerSecret' 	: '',
		'callbackURL' 		: 'http://127.0.0.1:8080/auth/twitter/callback'
	},
	benable_google:false,
	'googleAuth' : {
		'clientID' 		: '',
		'clientSecret' 	: '',
		'callbackURL' 	: 'http://127.0.0.1:8080/auth/google/callback'
	},
	environment:environment,
	database:'mongodb://127.0.0.1/mmo',
	databasetype:"mongodb",
	//database:'http://localhost/',
	//database:'http://localhost:5984/',
	//databasetype:"couchdb",
	cachetime:(365 * 24 * 60 * 60 * 1000)
	//max_player:100,
}

//environment specific configuration
var conf = {
	production:{
		ip: args.ip || "0.0.0.0",
		port: args.port || 8080,
		mode:"production",
		benablemodules: true
	},
	development:{
		ip: args.ip || "0.0.0.0",
		port: args.port || 8080,
		mode:"development",
		benablemodules: true
	},
	alpha:{
		ip: args.ip || "0.0.0.0",
		port: args.port || 8080,
		mode:"alpha",
		benablemodules: true
	}
}

extend(false,conf.production,common_config);
extend(false,conf.development,common_config);
extend(false,conf.alpha,common_config);

//set config on the arguments default
module.exports = config = conf[environment];
