MyApp.angular.controller('detailsDateController', ['$scope', 'DataService', '$stateParams', function($scope, DataService, $stateParams){
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
}]);