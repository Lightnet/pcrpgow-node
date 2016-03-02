/*
    Project Name: Node Web Sandbox API
    Link:https://bitbucket.org/Lightnet/nodewebsandboxapi
    Created By: Lightnet
    License: Please read the readme.txt file for more information.

    Information:

*/
//var config = require(__dirname + "/../config.js");
try{
  //global variable to access all in sub files.
  mongoose = require('mongoose');
  mongoose.connect(config.database_url);
}catch(error){
  console.log(error);
}
