var passport = require('passport');
var Users = require('./Users');
var encrypter = require('./enc');
var csrf = require('./csrf');
var Pagesk = require('./Pagesk');


exports.local_login = function(req, res) {
	
	
	passport.authenticate('local-login', function(err, user) {
		if(user == false) res.send('false');// invalid login
		else  {
			req.login(user, function(err) {
				if(err) throw err
				res.send(csrf.protect(user.username));
				
				
			});
			
			
		}
	})(req);
	
}



exports.local_register = function(req, res) {
	
	var username = req.body.username,
	password = req.body.password,
	email = req.body.email,
	encrypted_password = encrypter.crypt_password(password);
	
	Users.findOne({ username: username, email: email}, function(err, user) {
		if(err) throw err
		if(user == null) {
			var new_user = new Users({
				username: username,
				password: encrypted_password,
				email: email
			});
			new_user.save(function(err) {
				if(err) throw err;
				console.log('saved!');
			});
			res.send('OK');
		}
	});
	
	
	
}


exports.check_db = function(req, res) {
	
	
	if(req.body.fieldName == 'username') var data = { 'username': req.body.data };
	if(req.body.fieldName == 'email') var data = { 'email': req.body.data };
	
	
	Users.findOne( data , function(err, result) {
		if(err) throw err
		console.log(result);
		if(result == null) res.send('nonexists') // email exists
		if(result != null && req.body.data != undefined && req.body.fieldName == 'email') res.send('email_exists'); // when email isn't in correct form
		if(result != null && req.body.data != undefined && req.body.fieldName == 'username') res.send('username_exists');
	});
	
	
	
	
	
	
}


exports.loginFacebook = function(req, res) {
	
	
	passport.authenticate('facebook', function(err, user, status) {
		
		
		if(user != false) {
			req.login(user, function(error) { // save user session
				if(error) throw error
					res.send('<script>window.close()</script>');
			});
		}
		else {
			res.cookie('xsa', status, { expires: new Date(Date.now() + 60000) } ); // create cookie, expires within 1 minute
			res.send('<script>window.close()</script>'); // fb window
		 }
	
	
	})(req, res);
	
	
}
