	var LocalStrategy = require('passport-local').Strategy;
	var encrypter = require('./enc');
	var Users = require('./Users');
	var FacebookStrategy = require('passport-facebook').Strategy;
	
	
module.exports = function(passport) {
		passport.serializeUser(function(user, done) {
	done(null, user.id);
});
	passport.deserializeUser(function(id, done) {
		Users.findById(id, function(err, data) {
			done(err, data);
	});
});
	
	
passport.use('local-login', new LocalStrategy(
	function(username, password, done) {
		var password = encrypter.crypt_password(password);
		console.log(username + password + 'lala');
		Users.findOne({ username: username, password: password}, function(err, user) {
			if(err) throw err
			if(user) done(null, user);
			else  done(null,null);
			 
			
			
		})
		
	}));
	
	
	
	
	
passport.use(new FacebookStrategy( {
	clientID: '571342276287204',
	clientSecret: '801a8af1ed32f6d130b32b866e6e8ad0',
	callbackURL: 'http://localhost:8000/auth/facebook/callback'
},function(accessToken, refreshToken, profile, done) {
	
	var email = profile.emails[0].value,
	id = profile.id,
	username = profile.username;
	
	Users.findOne({ user_id: id }, function(err, data) {
		console.log(data);
		if(err) throw err
		if(data == null)  {
			var temporary_user = new FbTemp({
				user_id: id,
				username: username,
				email: email
			});
			temporary_user.save(function(err) {
				if(err) throw err
				
				
			});
				
			done(null, null, id);
		}
		done(null, data);
	});
	
}));
	


}
