MyApp.angular.controller('HeaderController', ['$scope','$cookies', 'DataService', '$location', '$uibModal', '$stateParams', 'LoginService', '$state', function($scope,$cookies, DataService, $location, $uibModal, $stateParams, LoginService, $state){
	
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
		$cookies.remove('FlexBookingApp');

		// $location.path('/home/search');
	}
}]);