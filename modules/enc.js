var crypto = require('crypto');

	
exports.crypt_password = function(password) {
	
var	iteration = 1000,
	keylen = 48,
	callback = function(err, key) {
		var hexHash = Buffer(key, 'binary').toString('hex');
};
	


	var binary_hash = crypto.pbkdf2Sync(password,'ofkfokr3ciu390ruj3o',iteration,keylen);
	return Buffer(binary_hash, 'binary').toString('hex');
	
	
}

