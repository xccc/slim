
myApp.factory('User', function($http,$rootScope ) {

		var actions = {};
		actions.login = function(username, password)	{
			data = {
			username: username,
			password: password
			};

			$http.post('/login', data).
			success(function(data) {

				if(data == 'OK') {
					alert('yay');
					$rootScope.loginStatus = '';
					$rootScope.isLogged = 'true';
					$rootScope.loggedIn = true;
					// display user menus and login name etc
				}  
			        else $rootScope.loginStatus = 'Invalid login'	
				
			
			
			
		});
	};
		
		return actions;

	});
	
