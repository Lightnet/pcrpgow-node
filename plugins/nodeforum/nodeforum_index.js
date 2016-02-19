/*
    Project Name: Node Web Sandbox API
    Link:https://bitbucket.org/Lightnet/nodewebsandboxapi
    Created By: Lightnet
    License: Please read the readme.txt file for more information.
  
    Information:
    
*/

/* global addView */

//static file once loaded
var crypto = require('crypto');
var path = require('path');

var express = require('express');
try  {
	var manageplugin = require('../../app/libs/manageplugin');
	//manageplugin = new manageplugin();
} catch (err) {	
	console.log(err);
}
//var _app = module.exports = express();


var intanceWorld = require('../../app/libs/instanceworld.js');
//console.log(intanceWorld.getID());



function dateFormat (date, fstr, utc) {
  	utc = utc ? 'getUTC' : 'get';
  	return fstr.replace (/%[YmdHMS]/g, function (m) {
    	switch (m) {
    		case '%Y': return date[utc + 'FullYear'] (); // no leading zeros required
    		case '%m': m = 1 + date[utc + 'Month'] (); break;
    		case '%d': m = date[utc + 'Date'] (); break;
    		case '%H': m = date[utc + 'Hours'] (); break;
    		case '%M': m = date[utc + 'Minutes'] (); break;
    		case '%S': m = date[utc + 'Seconds'] (); break;
    		default: return m.slice (1); // unknown code, remove %
    	}
    // add leading zero if required
    return ('0' + m).slice (-2);
  });
}
/*
var _config = {
	name:"FORUM",
	description:""
}
*/
//module.exports._config = _config;

module.exports._config = require('./index.json');

// load the things we need
var mongoose = require('mongoose');

module.exports.setroute = function(routes,app){
	//console.log('Node Forum Post');
	
	//var views  = app.get('views');
	//views.push(__dirname + '/views');
	//app.set('views', views);
	//console.log(__dirname);
	//var fileviewpath =  __dirname + '/views';
	
	manageplugin.addAppView(app, __dirname + '/views');
	app.use(express.static(__dirname + '/public'));
	
	

	//var Cat = mongoose.model('Cat', { name: String });
	//var Board = mongoose.model('topic', { name: String });

	var BoardSchema = mongoose.Schema({
		boardid:String,
		name: String,
		content:String,

		parentid:String,
		childsid:String,

		groups:String,
		type:String,
		tags:String,
		userid:String,
		username:String,
		locked:String,
		bpassword:String,
		passwordhash:String,

		date:String,
		datestamp:String
	});
	var BoardModel = mongoose.model('Board', BoardSchema);

	var TopicSchema = mongoose.Schema({
		boardid:String,
		topicid:String,
		name: String,
		content: String,

		groups:String,
		type:String,
		tags:String,
		userid:String,
		username:String,
		date:String,
		datestamp:String
	});
	var TopicModel = mongoose.model('ForumTopic', TopicSchema);

	var PostSchema = mongoose.Schema({
		topicid:String,
		postid:String,

		name: String,
		content: String,

		groups:String,
		type:String,
		tags:String,
		userid:String,
		username:String,

		flag:String,

		date:String,
		datestamp:String
	});
	var PostModel = mongoose.model('Post', PostSchema);

	var topicview = function (){
		var self = this;
		self.boardid = "";
		self.topicid = "";
		self.name = "";
		self.content = "";
		self.datestamp = "";
	}

	var boardview = function (){
		var self = this;
		self.boardid = "";
		self.name = "";
		self.content = "";
		self.datestamp = "";
	}

	var postview = function (){
		var self = this;
		self.topicid = "";
		self.postid = "";
		self.name = "";
		self.content = "";
		self.datestamp = "";
	}

	//display the index forum
    routes.get('/forum', function (req, res) {
       res.contentType('text/html');
       //res.send('Hello World!');
		//console.log('boardid: ' + req.params.id);
		
       	

		//var _parentid = "" || req.params.id;
		var _parentid = "";
		//console.log("...");
		//console.log(_parentid);
		
		
		BoardModel.find({parentid:_parentid},function (err, boards) {

			if (err) return console.error(err);
			//console.log("boards....");
			//console.log(boards);
			var boardlist = [];

			for (var i = 0; i < boards.length;i++){
				var newboard = new boardview();
				newboard.name = boards[i].name;
				newboard.content = boards[i].content;
				newboard.boardid = boards[i].boardid;
				newboard.datestamp = boards[i].datestamp;
				boardlist.push(newboard);
			}

			TopicModel.find({boardid:''},function (err, topics) {
				if (err) return console.error(err);
				//console.log("topics....");
				//console.log(topics);
				var topiclist = [];

				for (var i = 0; i < topics.length;i++){
					var newtopic = new topicview();
					newtopic.name = topics[i].name;
					newtopic.content = topics[i].content;
					newtopic.boardid = topics[i].boardid;
					newtopic.topicid = topics[i].topicid;
					newtopic.datestamp = topics[i].datestamp;
					topiclist.push(newtopic);
				}

				//res.render('postboard', {user: req.user, boardnode:boardlist, topicnode:topiclist,id:_parentid});
				res.render('forum', {user: req.user, boardnode:boardlist, topicnode:topiclist,id:_parentid});
			});
		});
		
    });

	//create a board
	routes.post('/board/:id?*', function(req, res){
		res.contentType('text/html');
		//console.log("post incoming...");
		//console.log(req.body);
		//console.log(req.body.topic);
		//console.log(req.body.subject);

		var text_name = req.body.name;
		var text_content = req.body.content;
		var text_tags = req.body.tags;
		var text_parentid = req.body.parentid;

		var date_format =  dateFormat(new Date (), "%Y-%m-%d %H:%M:%S", true);

		var hashid = '' || crypto.createHash('md5').update(date_format).digest('hex'); //md5 hash

		var _board = new BoardModel({
									  boardid : hashid,
									  name : text_name,
									  content : text_content,
									  datestamp : date_format,
									  parentid : text_parentid
									  });

		_board.save(function (err) {
			if (err){} // ...
			console.log('topic save...');
			_topic = null;
		});

		//console.log(_topic);

		BoardModel.find(function (err, boards) {
			if (err) return console.error(err);
			console.log("boards....");
			console.log(boards);
			var boardlist = [];

			for (var i = 0; i < boards.length;i++){
				var newboard = new boardview();
				newboard.name = boards[i].name;
				newboard.content = boards[i].content;
				newboard.boardid = boards[i].boardid;
				newboard.datestamp = boards[i].datestamp;
				boardlist.push(newboard);
			}

			//res.render('postboard', {user: req.user,boardnode:boardlist});
			res.redirect('back');
			topiclist = null;
		});


		//res.send('posted!');
		//io.sockets.emit('my other event', req.body);
		//res.redirect('back');
	});

	routes.get('/board/:id', function (req, res) {
        res.contentType('text/html');
		//console.log('boardid: ' + req.params.id);
		console.log('params: ');
		console.log(req.params);
		console.log(req.body);
		console.log(req.url);
		BoardModel.find({parentid:req.params.id},function (err, boards) {

			if (err) return console.error(err);
			console.log("boards....");
			//console.log(boards);
			var boardlist = [];

			for (var i = 0; i < boards.length;i++){
				var newboard = new boardview();
				newboard.name = boards[i].name;
				newboard.content = boards[i].content;
				newboard.boardid = boards[i].boardid;
				newboard.datestamp = boards[i].datestamp;
				boardlist.push(newboard);
			}

			//TopicModel.find({boardid:},function (err, topics) {
			TopicModel.find({boardid:req.params.id},function (err, topics) {
				if (err) return console.error(err);
				console.log("topics....");
				//console.log(topics);
				var topiclist = [];

				for (var i = 0; i < topics.length;i++){
					var newtopic = new topicview();
					newtopic.name = topics[i].name;
					newtopic.content = topics[i].content;
					newtopic.boardid = topics[i].boardid;
					newtopic.topicid = topics[i].topicid;
					newtopic.datestamp = topics[i].datestamp;
					topiclist.push(newtopic);
				}

				res.render('postboard', {user: req.user, boardnode:boardlist, topicnode:topiclist,id:req.params.id});
			});
		});
    });

	// create a topic
	routes.post('/topic/:id', function(req, res){
		res.contentType('text/html');
		console.log("post incoming...");

		//console.log(req.body);
		//console.log(req.body.topic);
		console.log("req.params.id :" + req.params.id);
		//console.log(req.body.subject);
		var text_name = req.body.name;
		var text_content = req.body.content;
		var date_format =  dateFormat(new Date (), "%Y-%m-%d %H:%M:%S", true);
		var hashid = '' || crypto.createHash('md5').update(date_format).digest('hex'); //md5 hash

		var postid = '' || crypto.createHash('md5').update(date_format + req.body.name).digest('hex'); //md5 hash

		var _topic = new TopicModel({
										boardid: req.params.id,
										topicid: hashid,
										name: text_name,
										content: text_content,
										datestamp: date_format
									});

		_topic.save(function (err) {
			if (err){} // ...
			console.log('topic save...');
			_topic = null;
		});

		var _post = new PostModel({
										topicid: hashid,
										postid: postid,
										name: text_name,
										content: text_content,
										datestamp: date_format
									});

		_post.save(function (err) {
			if (err){} // ...
			console.log('post save...');
			_post = null;
		});

		//console.log(_topic);
		//res.render('posttopic', {user: req.user});
		//res.send('posted!');
		//io.sockets.emit('my other event', req.body);
		res.redirect('back');
	});

    routes.get('/topic/:id', function (req, res) {
        res.contentType('text/html');
		console.log('boardid: ' + req.params.id);
		var postlist = [];
		PostModel.find({topicid:req.params.id},function (err, posts) {
			if (err) return console.error(err);
			//console.log("topics....");
			//console.log(topics);

			for (var i = 0; i < posts.length;i++){
				var newpost = new postview();
				newpost.name = posts[i].name;
				newpost.content = posts[i].content;
				newpost.boardid = posts[i].boardid;
				newpost.topicid = posts[i].topicid;
				newpost.datestamp = posts[i].datestamp;
				postlist.push(newpost);
			}
			res.render('posttopic', {user: req.user,postnode:postlist, id:req.params.id});
		});
        //res.send('postforum');
		//console.log('user ' + req.params.id);
    });

	//create a post
	routes.post('/posttopic/:id', function(req, res){
		res.contentType('text/html');
		//console.log("post incoming..."); //console.log(req.body);//console.log(req.body.topic);//console.log(req.body.subject);

		var text_name = req.body.name;
		var text_content = req.body.content;

		var date_format =  dateFormat(new Date (), "%Y-%m-%d %H:%M:%S", true);

		var hashid = '' || crypto.createHash('md5').update(date_format).digest('hex'); //md5 hash

		var _post = new PostModel({
									topicid: req.params.id,
									postid: hashid,
									name: text_name,
									content: text_content,
									datestamp: date_format
								});

		_post.save(function (err) {
			if (err){} // ...
			console.log('topic save...');
			_topic = null;
		});
		//console.log(_topic);//res.render('posttopic', {user: req.user});//res.send('posted!');//io.sockets.emit('my other event', req.body);

		res.redirect('back');
	});

};
