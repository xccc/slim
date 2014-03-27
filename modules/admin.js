var Posts = require('./Posts');

var db = (function() {
	
	function findOne(collection, query, callback) {
		
		collection.findOne(query, callback);
	}
	return {
		
		findOne: findOne
	}
});
		
exports.update = function (req, res) {
	
	var query = {'_id': req.body.id };
	
	db().findOne(Posts, query, function(err, result) {
		if(!result) return res.send('No such article!');
		
		Posts.update({ _id: req.body.id }, { title: req.body.title, post: req.body.post }, function(err, result) {
			
		
		res.send('Post has been updated!');
	});
})
	
	
}


exports.delete_item = function(req, res) {
		var query = {'_id': req.body.id };
		db().findOne(Posts, query, function(err, result) {
			if(!result) return res.send('No such article!');
			result.remove(function(err) {
				if(err) throw err
				res.send('Article has been deleted!');
			});
		});
	
	
	
	
}

exports.add_new = function(req, res) {
	
	var new_post = new Posts({
		
		title: req.body.title,
		post: req.body.post,
		author: req.user.username
	});
	new_post.save(function(err) {
		if(err) throw err;
		res.send('Article added!');
	});
	
}
