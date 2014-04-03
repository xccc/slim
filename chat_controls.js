var User = require('./session_schema.js');
var server = require('./chat_server.js');
var admin_passwod = 'kdwodkjijr930ur30jif'; // to login as admin
var conf = require('./chat_fn');
	
exports.logged_in = function(nick) {
	

				// see if such user exists
	 User.findOne({ sessionname: nick.username }, function(err, result) {
		 
		 if(err) throw err
				// if there is no such user send client error response
		 if(!result) server.io.emit('logIn', { message: 'no_auth' });
				// tell user he can continue
		 else { server.io.emit('logIn', { 
				
				message: 'auth' });
				server.io.join(nick.username);
					// add user into his private room
		}
	});
	

};

exports.admin_message = function(data) {
		
	// private message to user from admin
	server.io.broadcast.to(data.nick).emit('recv', {msg: data.message });
	
};
	// let user know if admin is online or offline
exports.admin_status = function() {
	
	
		User.findOne({ admin: true }, function(err, result) {
			if(err) throw err
		
			var status = (result.admin == true) ? 'Online' : 'offline';
			server.io.emit('admin_status', { admin: status });
	});
	
	
};
		// change admin status to offline
exports.admin_offline = function(pass) {
	
			// make sure we are dealing with actual admin
	if(pass.pwd == admin_passwod)  {
				// update database
		User.update({ admin: true }, { admin: false },function(err) {
			if(err) throw err;
					// let users know admin has signed off.
			server.io.broadcast.emit('admin_status', { admin: 'Offline' });
		});
}
	
	
	
};

exports.admin_login = function(pass) {
	
	
	
	if(pass.pwd == admin_passwod) {
			
			// add admin to his own room
		server.io.join('admin');
		server.io.broadcast.emit('admin_status', { admin: 'online' }); // change admin status to Online
		
		// update admin status in database also
	 User.update({ admin: false }, { admin: true },function(err, result) {
			if(err) throw err;
			
			
		});
}
	
	

	
};
exports.new_user = function(nick) {
	
			// generate new random name for user
		var name = conf.generate_username();
		
			
		var new_session = new User({
			sessionname: name   });
				//store it into database.
				
		new_session.save(function(err) {
			if(err) throw err;  });
			
			// sepparate room for user.
		server.io.join(name);
		
			// let client know that he can now chat.
		server.io.emit('registration', { name: name });

	
	
};

exports.message = function(data) {
	
			// data from user
		var username = (typeof data.nick != 'undefined') ? data.nick : 'default';
		var message = data.msg;
		
		
			// see if user actually exists.
		User.findOne({ sessionname: username }, function(err, res) {
			if(err) throw err
			if(!res) server.io.emit('logIn', { message: 'no_auth' }); // re-register user, something has gone sour
			
			
					// send message to admin
			server.io.broadcast.to('admin').emit('recv', { nick: username, msg: message });
			
		
	});



	
};






