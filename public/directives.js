myApp.directive('comparePassword', function() {
	
	return {
		
		restrict: 'AEC',
		scope: true,
		require: 'ngModel',
		
		link: function(scope, elem, attrs, control) {
			
				
				
				scope.$watch(function() {
					
					return scope.$eval(attrs.ngModel) == scope.$eval(attrs.comparePassword);
				}, function(val) {
					if(val == true) control.$setValidity('uniq', true);
					else control.$setValidity('uniq', false);
				});
					
				
				
			
		
	}
		
	}
});


myApp.directive('checkParam', function($http) {
	
	return {
		//scope: true,
		require: 'ngModel',
		link: function(scope, elem, attr, ctrl) {
			elem.bind('blur', function(e) {
				
			
				 var data = { 'data': scope.$eval(attr.ngModel),
							  'fieldName': attr.ngModel };
				
				
				$http.post('/check-email', data ).
					success(function(data) {
						console.log(data);
						if(data == 'username_exists')  {
							scope.usernameError = true;
							ctrl.$setValidity('unique', false);
							console.log('mis viga');
							
						}
						else if(data == 'email_exists') {
							 scope.emailError = true;
							 ctrl.$setValidity('unique', false);
							 
						 }
						 else {
							 console.log('called me!');
							 if(attr.ngModel == 'username' && scope.usernameError == true) { 
								  ctrl.$setValidity('unique', true);
								  scope.usernameError = false;
							  }
							 if(attr.ngModel == 'email' && scope.emailError == true) {
								  ctrl.$setValidity('unique', true);
								  scope.emailError = false;
							  }
						 }
						
						
					});
			});
		
			
		}
		
	}
	
});
