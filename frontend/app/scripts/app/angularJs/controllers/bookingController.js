MyApp.angular.controller('BookingController', ['$scope', 'DataService', '$stateParams', '$uibModal', function($scope, DataService, $stateParams, $uibModal){
	// console.log($stateParams.userId);

	DataService.getUser(function(results) {
		try {
			$scope.user = results.data.User;
      		console.log($scope.user);
		} 
		catch(e) {
			console.log(e);
		}
	}, function() {
		console.log('fail'); 
	}, $stateParams.userId);


	$scope.open = function (size) {
		var modalInstance;
		var modalScope = $scope.$new();
		modalScope.ok = function () {
	        modalInstance.close('close');
		};
		modalScope.cancel = function () {
        	modalInstance.dismiss('cancel');
		};      

		modalInstance = $uibModal.open({
			template: '<booking-modal></booking-modal>',
			size: size,
			scope: modalScope
		});
	};
}]);