MyApp.angular.controller('loginController', ['$scope', 'DataService', '$uibModal', 'LoginService', function($scope, DataService, $uibModal, LoginService){
	
	$scope.open = function (size) {
		var modalInstance;
		modalScope = $scope.$new(); 
		modalScope.ok = function () {
	        modalInstance.close('close');
		};
		modalScope.cancel = function () {
        	modalInstance.dismiss('cancel');
		};

		modalInstance = $uibModal.open({
			template: '<login-modal></login-modal>',
			size: size,
			scope: modalScope
		});
	};

	var admin = {
	  username: "",
	  password: ""
	};

	$scope.login = function() { 
		
		admin = {
		  username: $scope.loginForm.username.$modelValue,
		  password: $scope.loginForm.password.$modelValue,
		}			

		DataService.getAdmin(function(results) {
		  
		  if (admin.username == results.data.Admin[0].username && admin.password == results.data.Admin[0].password) {
		    $scope.auth = true;
		    $scope.open();
		    $scope.message = false;
		  } else {
		   $scope.message = true;
		  }
		}, function() {
		  console.log('Not login'); 
		  $scope.message = true;
		}, admin);

		$scope.auth = true;
	}
}]);