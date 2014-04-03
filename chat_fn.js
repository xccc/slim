exports.generate_username = function() {
	
	
	
	var chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
	var max = chars.length-1;
	var min = 1;
	var full_name = '';
	for(var i = 0; i < 8; i++) {
		
		var randomKey = Math.floor(Math.random()*(max-min)-min);
		full_name += chars.charAt(randomKey);
	}
	return 'Anon'+full_name;
	
	
}








