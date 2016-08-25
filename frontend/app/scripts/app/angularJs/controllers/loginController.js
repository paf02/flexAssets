MyApp.angular.controller('LoginController', ['$scope', '$cookies', 'DataService', 'LoginService', function ($scope, $cookies, DataService, LoginService) {

	$scope.ok = function () {
		$scope.$close('close');
		var now = new Date(),
			exp = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours()+1, now.getMinutes(),now.getSeconds(),now.getMilliseconds());
		$scope.$emit('authEvent');
		$cookies.put('FlexBookingApp','sessionToken', {
			expires: exp
		});
	};

	$scope.cancel = function () {
		$scope.$dismiss('cancel');
	};

	var admin = {
		username: "",
		password: ""
	};

	$scope.login = function () {

		admin = {
			username: $scope.loginForm.username.$modelValue,
			password: $scope.loginForm.password.$modelValue
		}

		DataService.getAdmin(function (results) {

			if (admin.username == results.data.Admin[0].username && admin.password == results.data.Admin[0].password) {
				LoginService.setAuth(true);
				$scope.ok();
				$scope.message = false;
			} else {
				$scope.message = true;
			}
		}, function () {
			console.log('Not login');
			$scope.message = true;
		}, admin);
	};
}]);