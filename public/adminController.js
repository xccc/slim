function adminController($scope,$rootScope, $http) {
	

	$scope.getNews = function() {
		
		$http.get('/news').
			success(function(data) {
				$scope.newPost = data
		
				
				
				
			})
		
	}
	$scope.new_post = function(title, post) {
		$http.post('/admin/new', { title: title, post: post, security_token: $rootScope.securityToken }).
			success(function(data) {
				$scope.newMessage = data;
				$scope.getNews();
			});
			
		
	}
	
	$scope.addPost = function() {
		$('#add-dialog').html("<input type='text' id='title' placeholder='title'> \
		<textarea id='post' placeholder='text'></textarea>");
		$('#add-dialog').dialog({
			
			buttons: {
				'Save': function() {
					$scope.new_post($('#title').val(), $('#post').val());
					
					$(this).dialog('close');
					
					
				},
				'Cancel': function() {
					
					$(this).dialog('close');
				}
			}
			
			})
	}
	$scope.savePost = function(title, post, id) {
		$http.post('/admin/update_post', { id: id, title: title, post: post, security_token: $rootScope.securityToken }).
			success(function(data) {
				$scope.updateMessage = data;
				//if there is already delete message, remove it to avoid confusion
				if($scope.deleteMessage) $scope.deleteMessage = '';
				
				$scope.getNews(); // update news
				
				});
		
		
	}
	
	$scope.editPost = function(id, title, post) {
		
		$('#dialog-form').html("<form><input type='text' id='title' value=" + title + "><textarea id='post'>" + post + "</textarea></form>");
		$('#dialog-form').dialog( {
			
			buttons: {
				'Edit': function() {
					
					$(this).dialog('close');
					$scope.savePost($('#title').val(), $('#post').val(), id); // sending updated valus
					$('#dialog-form').html(''); // remove old values
				},
				'Cancel': function() {
					
					$(this).dialog('close');
					
				}
			}
			
			
			});
	
}
	$scope.confirm_delete = function(id) {
	
		$http.post('/admin/delete', { id: id, security_token: $rootScope.securityToken }).
			success(function(data) {
				$scope.deleteMessage = data;
				if($scope.updateMessage) $scope.updateMessage = '';
				$scope.getNews();
			});
			
		
		
	}

	$scope.deletePost = function(id) {
		$('#delete-dialog').html('Delete message?');
		$('#delete-dialog').dialog( {
			
			buttons: {
				'Delete': function() {
					$scope.confirm_delete(id);
					$(this).dialog('close');
				},
				'Cancel': function() {
					$(this).dialog('close');
				}
			}
			})
		
		
		
	}

}
