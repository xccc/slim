var mongoose = require('mongoose');
var postSchema = new mongoose.Schema({
	title: String,
	post: String,
	author: String,
	date: {type:Date, default: Date.now() }
});

module.exports = mongoose.model('Posts', postSchema);
