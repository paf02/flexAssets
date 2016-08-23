MyApp.angular.controller('HeaderController', ['$scope', 'DataService', '$location', '$uibModal', '$stateParams', 'LoginService', '$state', function($scope, DataService, $location, $uibModal, $stateParams, LoginService, $state){
	
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
		$state.go('home.search');

		
		LoginService.setAuth(false);
		$scope.$emit('authEvent');
		//$scope.auth = false;


		// $location.path('/home/search');
	}
}]);