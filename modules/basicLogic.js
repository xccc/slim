var Pagesk = require('./Pagesk');

exports.verifyPageLevel = function(req, res, next) {
	
	function displayResult(err, result) {
		if(result == 1) next();
		else res.send("FUCK OFF BITCH");
		
	}
	function findPage(arrList, path, callback) {
		
		var toArray = arrList.split(','); // paths
		var pathKeys = [];
		var status;
		for(key in toArray) {
			
			var exploit = toArray[key].split(':');
			pathKeys.push(exploit);
			
		}
		
		for(var i in pathKeys) {
			if(pathKeys[i].indexOf(req.path) == 0) status = 1;
			
		}
		callback(null, status);
		
}
if(req.isAuthenticated()) var data = { 'elevel': req.user.userLevel };
else var data = { 'elevel': 1 };

	

	Pagesk.findOne(data, function(err, resk) {
		if(err) throw err
		
		findPage(resk.elist, req.path, displayResult);
	

})
	

}


exports.displayPages = function(req, res) {
	
	
		if(req.isAuthenticated()) var data = { 'elevel': req.user.userLevel };
		else var data = { 'elevel': 1 };
			
		
		 Pagesk.findOne(data, function(err, result) {
			 
			 if(req.isAuthenticated()) var data = { 'act': 'OK', 'link': result.elist };
			 else var data = { 'act': 'NO', 'link': result.elist };
			 res.send(data);
		 });
		
}
	
	
exports.verifyAdmin = function(req, res, next) {
	
	if(req.isAuthenticated()) {
		if(req.user.userLevel == 3) next();
		
		else res.redirect('/'); // if user is not admin
	} else res.redirect('/'); // if user is not authenticated
		
	
	
}
	
