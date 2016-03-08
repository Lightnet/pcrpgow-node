/*
	Name:
	Link:https://bitbucket.org/Lightnet/
	Created By: Lightnet
	License: Creative Commons Zero [Note there multiple Licenses]
  	Please read the readme.txt file for more information.
*/


//var config = require(__dirname + "/../config.js");
try{
  //global variable to access all in sub files.
  mongoose = require('mongoose');
  mongoose.connect(config.database_url);
}catch(error){
  console.log(error);
}
