var mongoose = require('mongoose');

var sessionSchema = new mongoose.Schema({
	
	sessionname: String,
	admin: Boolean,
	timetolive: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('Userkeks', sessionSchema);
