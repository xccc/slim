var mongoose = require('mongoose');
var pageSchema = new mongoose.Schema({
	p_level: String,
	link_list: String
});

module.exports = mongoose.model('P_access', pageSchema);


