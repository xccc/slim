var mongoose = require('mongoose');
	var sessionSchema = new mongoose.Schema({
		session_id: String,
		username: String
	});
	
	
var sess_ID = mongoose.model('securityToken', sessionSchema);
	
	
exports.key = function(username) {
	
	sess_ID.findOne({ username: username}, function(err, result) {
		if(err) throw err
		if(result != null) return result.session_id;
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
		
	
}
