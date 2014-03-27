
var myApp = angular.module('myApp', ['ngRoute']);


	myApp.config(function($routeProvider, $locationProvider) {
	$locationProvider.html5Mode(true);
	
		$routeProvider.when('/', {
			
			templateUrl: 'login.jade',
			controller: simpleController,
			
		});
		$routeProvider.when('/login', {
			controller: simpleController,
			
		});
		$routeProvider.when('/fb-login', {
			templateUrl: '/fb-login',
			controller: simpleController
		});
		
		$routeProvider.when('/auth/facebook/callback', {
			templateUrl: '/auth/facebook/callback'
		});
		
		$routeProvider.when('/admin', {
			templateUrl: '/admin2.jade',
			controller: adminController
		});
		
		$routeProvider.when('/admin/news', {
			templateUrl: '/adminNews.jade',
			controller: adminController
		})
	
});






var io = io.connect()
io.on('update', function() {
	
	// user is being told what happened and then he/she gets redirected to mainpage
	
	$(function() {
		$('#dialog').dialog();
		$('#dialog').text('Thank-you for registering new account, you are being redirected to our front page!');
	});
	
	
	setTimeout(function() {
			
	window.location.assign('/');
}, 2000);


});


	




