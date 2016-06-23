MyApp.angular.controller('loginController', ['$scope', 'DataService', 'LoginService', function($scope, DataService, LoginService){
	
	$scope.ok = function () {
		$scope.$close('close');
	};

	$scope.cancel = function () {
		$scope.$dismiss('cancel');
	};

	var admin = {
		username: "",
		password: ""
	};

	$scope.login = function() { 
		
		admin = {
			username: $scope.loginForm.username.$modelValue,
			password: $scope.loginForm.password.$modelValue
		}			

		DataService.getAdmin(function(results) {

			if (admin.username == results.data.Admin[0].username && admin.password == results.data.Admin[0].password) {
				LoginService.setAuth(true);
				$scope.$emit('authEvent');
				$scope.ok();
				$scope.message = false;
			} else {
				$scope.message = true;
			}
		}, function() {
			console.log('Not login'); 
			$scope.message = true;
		}, admin);
	};
}]);