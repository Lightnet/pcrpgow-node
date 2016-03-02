/*
	Project Name: Node Web Sandbox API
	Link:https://bitbucket.org/Lightnet/nodewebsandboxapi
	Created By: Lightnet
	License: Please read the readme.txt file for more information.

	Information: This must be init first start up for the passport to work on global variable.
*/
//declare var mongoose;
var mongoose = require('mongoose');
mongoose.connect(config.database_url);
