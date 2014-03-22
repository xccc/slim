exports.route = function(app, passport) {
	require('./modules/passport-magic')(passport);
	var auth = require('./modules/auther');
	var pages = require('./modules/page');
	
	
	

	app.get('/', pages.index);
	app.get('/registerFB', pages.registerFB);
	app.get('/updatePage', pages.updatePage);
    app.get('/auth/facebook/callback', auth.loginFacebook);
    app.get('/getFBStatus', pages.FBStatus);
    app.get('/test', pages.test);
    
	app.post('/local-register', auth.local_register);
	app.post('/login', auth.local_login);
	app.post('/check-email', auth.check_db);
	

}
