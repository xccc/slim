
myApp.factory('User', function($http, $rootScope, $route) {

		var actions = {};
		actions.login = function(username, password)	{
			data = {
			username: username,
			password: password
			};

			$http.post('/login', data).
			success(function(data) {
			

				if(data != 'false') {
					alert('yay');
					$rootScope.loginStatus = '';
					$rootScope.isLogged = 'true';
					$rootScope.loggedIn = true;
					$rootScope.securityToken = data;
					
					// display user menus and login name etc
					
					$rootScope.haxx();
				
			
					
					
					
			
			
				}  
			        else $rootScope.loginStatus = 'Invalid login'	
				
			
			
			
		});
	};
		
		return actions;

	});
	

