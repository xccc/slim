var mongoose = require('mongoose'),
userSchema = new mongoose.Schema({

	username: String,
	password: String,
	email: String,
	reg_date: {type: Date, default: Date.now() }


});

module.exports = mongoose.model('Users', userSchema);
