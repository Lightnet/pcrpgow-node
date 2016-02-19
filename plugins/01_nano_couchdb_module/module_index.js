/*
    Project Name: Node Web Sandbox API
    Link:https://bitbucket.org/Lightnet/nodewebsandboxapi
    Created By: Lightnet
    License: Please read the readme.txt file for more information.
  
    Information:
    
*/
//var nano = require('nano')('http://localhost:5984/');
//global var?
//global variable to access all in sub files.

//var auth = config.KEY;
console.log("init naon couchdb cookies");
var auth = 'express.sid';
//nano = require('nano')({url:'http://localhost:5984/', cookie: 'AuthSession=' + auth });
nano = require('nano')({url:'http://localhost:5984/' });

/*
nano.session(function(err, session) {
  if (err) {
    return console.log('oh noes!')
  }

  console.log('user is %s and has these roles: %j',
    session.userCtx.name, session.userCtx.roles);
});
*/



/*
var auth = "some stored cookie"
  , callback = console.log // this would normally be some callback
  , alice = require('nano')(
    { url : 'http://localhost:5984/alice', cookie: 'AuthSession=' + auth });
  ;

alice.insert(doc, function (err, body, headers) {
  if (err) {
    return callback(err);
  }

  // change the cookie if couchdb tells us to
  if (headers && headers['set-cookie']) {
    auth = headers['set-cookie'];
  }

  callback(null, "it worked");
});
*/