/*
	Project Name: Node Web Sandbox API
	Link:https://bitbucket.org/Lightnet/nodewebsandboxapi
	Created By: Lightnet
	License: Please read the readme.txt file for more information.

	Information:

*/
/*
declare var PacketModels;

var Parser = require('binary-parser').Parser;

var StringOptions = {length: 99, zeroTerminated: true};

module.exports = PacketModels = {

	header: new Parser().skip(1)
		.string("command", StringOptions),

	//login: new Parser().skip(1)
	login: new Parser().endianess('big')
		.string("command", StringOptions)
		.string("username", StringOptions)
		.string("password", StringOptions),

	register: new Parser().skip(1)
		.string("command", StringOptions)
		.string("username", StringOptions)
		.string("password", StringOptions),

	pos: new Parser().skip(1)
		.string("command", StringOptions)
		.int32le("target_x", StringOptions)
		.int32le("target_y", StringOptions),

	updateroom: new Parser().skip(1)
		.string("command", StringOptions)
}
*/
