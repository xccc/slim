var smexy = (function() {
	this.freek = 'vittu';
	var secret = 'noko!';
	var dibla = function() {
		console.log('im private!');
	}
	this.free = function() {
		console.log('im public!');
	}
})
var huh = new smexy()
var test2 = (function() {
	this.testing = 'wts';
	var secret = 'im hidden!';
	this.imnot = 'oops';
	return {
	
	  free: function() {
		console.log('i can do fuck all');
	},
	alsopublic: function() {
		console.log('yeap');
		
	},
	tellSecret: function() {
		console.log(secret);
	}
}
});
var test3 = (function() {

	
	function imprivate() {
		console.log('so fuck you!');
	}
	
	return {
	  impublic: imprivate
	}


});
test3().impublic()
