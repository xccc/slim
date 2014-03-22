var FbTemp = require('./tempUsers');
	var Users = require('./Users');
exports.index = function(req, res) {
	
	console.log(req.isAuthenticated());
	if(req.user) console.log(req.user.username);

		res.render('index.jade');
	
	
	
}


exports.registerFB = function(req, res) {
	
	if(!req.cookies.xsa) res.redirect('/'); // if cookie expired
	
	FbTemp.findOne({ user_id: req.cookies.xsa }, function(err, data) { // find person who just tried to login via facebook
		if(err) throw err
		if(data) {
			
					// save new user
				var new_user = new Users({
				user_id: data.user_id,
				email: data.email,
				username: data.username
			});
				
			new_user.save(function(erro) {
				if(erro) console.log(erro)
				
				console.log('guees');
			});
			// runs update_page function
			res.redirect('/updatePage');
			
		
			
		}
		else res.redirect('/updatePage');
		
	});
	
	
}


 // function for redirecting user to main page when registered new user.
exports.updatePage = function(req, res) {
	var socket = require('socket');
	
	socket.sockets.emit('update');
	
	
}

exports.FBStatus =  function(req, res) {
	
	
	if(!req.isAuthenticated()) res.send('false'); // if there is no such user registered
	else res.send('true');
	
	
	
}


