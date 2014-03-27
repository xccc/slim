var FbTemp = require('./tempUsers');
var Users = require('./Users');
var csrf = require('./csrf');
var Pages = require('./Pagesk');
var Posts = require('./Posts');

var mongoose = require('mongoose');
	
	var newSchema = new mongoose.Schema({
		title: String,
		author: String
	});
	var newData = mongoose.model('Hack', newSchema);
	
	
exports.index = function(req, res) {


		if(req.isAuthenticated()) {
		
		csrf.key(req.user.username, function(key)  {
			res.render('index.jade', { token: key });
		});
	} else res.render('index.jade');
		
		
		
		
	
	
	
}
exports.view_news = function(req, res) {
	
	Posts.find({}, function(err, result) {
		if(err) throw err
		console.log(result);
		res.send(result);
	});
	
	

}	
exports.news = function(req, res) {
	
	csrf.key(req.user.username, function(key)  {
			res.render('index.jade', { token: key });
		});
	
	
	
}

	
exports.admin = function(req, res) {
	
		
		csrf.key(req.user.username, function(key)  {
			res.render('index.jade', { token: key });
		});

}



exports.allPosts = function(req, res) {
	console.log('gotcha!');

	
	newData.find({}, function(err, data) {
		
		if(err) throw err
		res.send(data);
	});
	
	
	
	
	
}




exports.registerFB = function(req, res) {
	
	if(!req.cookies.xsa) res.redirect('/'); // if cookie expired
	
	FbTemp.findOne({ user_id: req.cookies.xsa }, function(err, data) { // find person who just tried to login via facebook
		if(err) throw err
		if(data) {
			
					// save new user
				var new_user = new Users({
				user_id: data.user_id,
				email: data.email,
				username: data.username
			});
				
			new_user.save(function(erro) {
				if(erro) console.log(erro)
				
				console.log('guees');
			});
			// runs update_page function
			res.redirect('/updatePage');
			
		
			
		}
		else res.redirect('/updatePage');
		
	});
	
	
}


 // function for redirecting user to main page when registered new user.
exports.updatePage = function(req, res) {
	var socket = require('socket');
	
	socket.sockets.emit('update');
	
	
}

exports.FBStatus =  function(req, res) {
	
	
	if(!req.isAuthenticated()) res.send('false'); // if there is no such user registered
	else res.send('true');
	
	
	
}


exports.test = function(req, res) {
	
	if(req.isAuthenticated()) res.send(req.user + 'lammas oled!');
	else res.end('ei ole sisse loginud!');
	
	
	
	
}






