exports.route = function(app, passport) {
	require('./modules/passport-magic')(passport);
	var auth = require('./modules/auther');
	var pages = require('./modules/page');
	var csrf = require('./modules/csrf');
	var base = require('./modules/basicLogic');
	var admin = require('./modules/admin');
	
	
	

	app.get('/',base.verifyPageLevel, pages.index);
	app.get('/registerFB', pages.registerFB);
	app.get('/updatePage', pages.updatePage);
    app.get('/auth/facebook/callback', auth.loginFacebook);
    app.get('/getFBStatus', pages.FBStatus);
    app.get('/Posts', pages.allPosts);
    app.get('/news', pages.view_news);
    app.get('/hack', function(req, res) {
		res.send('gotcha!');
	});
    app.get('/admin/:news',base.verifyPageLevel, pages.news);
    app.get('/admin', base.verifyPageLevel, pages.admin);
    
	app.post('/admin/new', base.verifyAdmin, csrf.verify_req, admin.add_new);
    app.post('/admin/update_post', base.verifyAdmin, csrf.verify_req, admin.update);
    app.post('/admin/delete', base.verifyAdmin, csrf.verify_req, admin.delete_item);
    
    
	app.post('/local-register', auth.local_register);
	app.post('/login', auth.local_login);
	app.post('/check-email', auth.check_db);
	app.post('/whoami', base.displayPages);
	
	app.all('*', function(req, res) {
		res.send('fuk u want?');
	})
	

}
