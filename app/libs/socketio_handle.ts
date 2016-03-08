/*
	Name:
	Link:https://bitbucket.org/Lightnet/
	Created By: Lightnet
	License: Creative Commons Zero [Note there multiple Licenses]
  	Please read the readme.txt file for more information.
*/


// <reference path="../../DefinitelyTyped/cryptojs/cryptojs.d.ts" />
var manageplugin = require('./manageplugin.js');
//var fs = require('fs');
//var path = require('path');
//var crypto = require('crypto');

module.exports = function(io){
	console.log("[ = socket.io = ]");
    // ==========================================
    // Configure
    // ==========================================
    //io.set('log level', 1);
    //io.configure(function (){
	console.log("config authorization");
    io.set('authorization', function (data, accept) {
        // check if there's a cookie header
        //console.log(data.headers.cookie);
        /*
        if (!data.headers.cookie) {
            console.log('Session cookie required.');
            //return accept('Session cookie required.', false);//nodewebkit kit will not work.
            accept(null, true);
        }
        if (data.headers.cookie) {
            data.cookie = require('cookie').parse(data.headers.cookie);
            data.cookie = require("connect").utils.parseSignedCookies(data.cookie, SECRET);
            data.sessionID = data.cookie[KEY];
            console.log(data.sessionID);
            if(data.sessionID == data.cookie[KEY]){

            }else{
                console.log('Cookie is invalid.');
                return callback('Cookie is invalid.', false);
            }
        } else {
           // if there isn't, turn down the connection with a message
           // and leave the function.
           console.log('No cookie transmitted.');
           return accept('No cookie transmitted.', false);
        }
        */
        // accept the incoming connection
        accept(null, true);
    });

    // ==========================================
	// threejs_managenode
	//
	//var threejs_managenode = require('./threejs_managenode');//threejs and cannonjs (physic)
	//var three_manage = new threejs_managenode(); //new class function
	//three_manage.io_db(io,db);


	//console.log(three_manage);
	//var name = 'braitsch';
	//var hash = crypto.createHash('md5').update(name).digest('hex');
	//console.log(hash); // 9b74c9897bac770ffc029102a200c5de
	//console.log(module_data);

    io.on('connection', function(socket){// client listen when connect with the user client web browser
        console.log('a user connected');
		//add on socket.io
		manageplugin.Call_SocketIO_Connection(io, socket);
		socket.on('ping', function(){
			socket.emit('pong');
		});

		//var hash = crypto.createHash('md5').update(socket.id).digest('hex');//md5 hash
		var hash = socket.id;//md5 hash
		//console.log("MDR5:"+hash);
		socket.emit('iduser',hash);//send out userid
		socket.userid = "player_" + hash;
		hash = null;//make null since
		/*
		socket.on('request', function(data){
            //console.log('message: ' + data);
			if(data['action'] != null ){
				if(data['action'] == 'userid' ){
					console.log("==============");
					console.log(socket.userid);
				}
				if(data['action'] == 'three_log' ){
					//console.log("==============");
					//console.log(socket.userid);
					//if(three_manage){
						//three_manage.console_log();
					//}
				}
			}
        });
        */

		/* //1.0 will not work on the new version
		socket.set('iduser','player_'+hash);
		//socket.set('iduser','player_'+hash);
		socket.get('iduser',function(data){
			console.log(data);
		});
		*/
		//var cookie = require("connect").utils.parseSignedCookies(socket.handshake.headers.cookie, config.SECRET);
		//var cookies = socket.handshake.headers.cookie;
		//console.log("cookie:"+cookie);
		//console.log("cookies:"+cookies);
        //require('./bot_parse_directive')(io,socket,db);
		//THREE JS client_connect
		//three_manage.client_connect(socket);
		//console.log(three_manage.network);
        //socket.on('test', function(data){
            //console.log('message: ' + data);
        //});
		socket.on('disconnect', function(data){
			console.log('disconnect message: ' + data);
			//console.log(socket);
			manageplugin.Call_SocketIO_Disconect(io, socket);
		})
    });
	console.log("[ = socket.io config... = ]");
};
