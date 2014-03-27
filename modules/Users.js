var mongoose = require('mongoose'),
userSchema = new mongoose.Schema({
	   user_id: String,
	   email: String,
	   username: String,
	   password: String,
	   reg_date: { type: Date, default: Date.now() },
	   userLevel: { type: String, default: 1 }
	   
	
   });
module.exports = mongoose.model('Logins', userSchema);

