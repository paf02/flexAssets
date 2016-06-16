MyApp.angular.controller('headerController', ['$scope', 'DataService', '$location', '$uibModal', '$stateParams', 'LoginService', function($scope, DataService, $location, $uibModal, $stateParams, LoginService){
	
	$scope.open = function (size) {
		var modalInstance;
		$scope.modalScope = $scope.$new();  

		modalInstance = $uibModal.open({
			template: '<login-modal></login-modal>',
			size: size,
			scope: $scope.modalScope
		});
	};

	$scope.logout = function() {
		$scope.auth = false;
		$location.path('/home/search');
	}
}]);