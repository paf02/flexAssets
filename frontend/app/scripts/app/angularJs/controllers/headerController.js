MyApp.angular.controller('HeaderController', ['$scope', 'DataService', '$location', '$uibModal', '$stateParams', 'LoginService', function($scope, DataService, $location, $uibModal, $stateParams, LoginService){
	
	$scope.open = function (size) {
		var modalInstance;
		var modalScope = $scope.$new();  

		modalInstance = $uibModal.open({
			template: '<login-modal></login-modal>',
			size: size,
			scope: modalScope
		});
	};

	$scope.logout = function() {
		LoginService.setAuth(false);
		$scope.$emit('authEvent');
		//$scope.auth = false;
		$location.path('/home/search');
	}
}]);