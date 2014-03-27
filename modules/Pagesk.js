var mongoose = require('mongoose'),
pageSche = new mongoose.Schema({
	elevel: Number,
	elist: String
});

module.exports = mongoose.model('Accesslevels', pageSche);


