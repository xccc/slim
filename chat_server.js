var mongoose = require('mongoose');
var socket = require('socket.io').listen(8081);
var chat = require('./chat_controls.js');
var User = require('./session_schema.js');
mongoose.connect('mongodb://localhost:27017/nodetest1');

exports.fix = socket; // glitch fix


 socket.sockets.on('connection', function(socket) {
	
	exports.io = socket; // for emiting signals from control page.

	socket.on('logged_in', chat.logged_in);
	socket.on('admin_message', chat.admin_message);

	

	socket.on('new_user',  chat.new_user);
	socket.on('message', chat.message);
	
	socket.on('get_admin_status', chat.admin_status);
	socket.on('admin_offline', chat.admin_offline);
 	socket.on('admin_login', chat.admin_login);
 	
});









