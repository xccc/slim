
function simpleController($scope,$rootScope, User, $http) {
	$rootScope.haxx = function() {
		
		if(!$rootScope.securityToken) $rootScope.securityToken = $('#securityToken').val();
		
		$http.post('/whoami').success(function(data) {
			var toArray = data.link.split(',');
			var hashTag = [];
			
			for(key in toArray) {
				//hashTag[toArray[key][
				var exploit = toArray[key].split(':');
				hashTag.push(exploit);
				
			}
		
		
				
				if(data.act == 'OK') { 
					
					$scope.loggedIn = !$scope.loggedIn;
					$rootScope.links = hashTag
					$rootScope.showLogin = false;
				}
				else {
					
					 $rootScope.links = hashTag;
					 $rootScope.showLogin = true;
				 }
				
				
			});
	
		
		
	}
	
	
		$scope.saveHack = function(title) {
			
			
			
			$http.post('/hacker', { data: title, security_token: $rootScope.securityToken }).
				success(function(result) {
					console.log(result + 'lala');
				});
		}
		
		
		
		$scope.newReg = function(username, password, email) {
			
			// register user
			
			$http.post('/local-register', { username: username, password: password, email: email }).
			success(function(data) {
				if(data == 'OK') alert('thank-you for registering with us!');
			});
			
			
			
			
		}
		$scope.localRegister = function() {
			
			$scope.register = !$scope.register;
		}
		$scope.loginFB = function() {
			
		var host = 'https://www.facebook.com/dialog/oauth?response_type=code&redirect_uri=http://localhost:8000/auth/facebook/callback&client_id=571342276287204'
		var url = window.open(host, 'randomWindow', 'location=1');
		
		setTimeout(function() {
			$http.get('/getFBStatus').
			success(function(data) {
				if(data == 'false') $scope.message = 'There is no such user in our database, would you like to register new one?' 
				else alert('Thank-you for logging in!');
			});
		}, 1000);
		
		
		}

		
		$scope.login = function(username, password) {

		
		User.login(username, password);
		};
	}
