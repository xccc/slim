var mongoose = require('mongoose');
	var sessionSchema = new mongoose.Schema({
		session_id: String,
		username: String,
		expires: { type: Date, default: Date.now() }
	});
	
	
	var sess_ID = mongoose.model('securitytokens', sessionSchema);
	
	
exports.key = function(username, done) {
	
	sess_ID.findOne({ username: username}, function(err, result) {
		if(err) throw err;
	
		
		if(result != null) done(result);
		
	});


	
}

exports.protect = function(username) {
	
	
	
	var charList = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!#@';
	var list_len = charList.length-1;
	var full_string = '';
	for(var i = 0; i < 16; i++) {
		var sPos = Math.floor(Math.random()*(list_len-0)+1);
		full_string += charList.charAt(sPos);
	}
	
	var store_token = new sess_ID({
		session_id: full_string,
		username: username
	});
	
	store_token.save(function(err) {
		if(err) throw err
		
	
});
	return full_string;
}


exports.verify_req = function(req, res, next) {
	var securityToken = req.body.security_token;
	console.log(securityToken);
	sess_ID.findOne({ session_id: securityToken }, function(err, result) {
		if(err) throw err
		
		if(result == null) res.redirect('/'); // for some reason it's not working
		else next();
		
	});
	
	
	
	
}
