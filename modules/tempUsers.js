var mongoose = require('mongoose'),
temp_user = new mongoose.Schema({
	user_id: String,
	email: String,
	username: String,
	reg_date: { type: Date, default: Date.now() }
	});
	
module.exports = mongoose.model('TempUsers', temp_user);
