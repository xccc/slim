var crypt = require('crypto'),
iteration = 1000,
keylen = 48,
callback = function(err, key) {
	var hexHash = Buffer(key, 'binary').toStrin('hex');
	return hexHash;
	};
module.exports = crypto.pbkdf2(password,'ofkfokr3ciu390ruj3o',iteration,keylen, callback);
