
function simpleController($scope,$rootScope, User, $http) {
		$scope.saveHack = function(title) {
			console.log(title);
			
			$http.post('/hacker', { data: title}).
				success(function(result) {
					console.log(result + 'lala');
				});
		}
		
		$scope.showPosts = function() {
			
			
			$http.get('/Posts').
				success(function(data) {
					$scope.emo = data;
					console.log(data + 'mari');
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
