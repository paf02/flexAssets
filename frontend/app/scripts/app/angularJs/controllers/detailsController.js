MyApp.angular.controller('DetailsController', ['$scope', 'InitService', 'DataService', '$stateParams', function($scope, InitService, DataService, $stateParams){
	DataService.getUser(function(results) {
		try {
			$scope.user = results.data.User;
      		$scope.skills = $scope.user.skill;
		} 
		catch(e) {
			console.log(e);
		}
	}, function() {
		console.log('fail'); 
	}, $stateParams.userId);

  $scope.userSkills = [];

  $scope.add = function() {
    $scope.userSkills.push($scope.selected);
    $scope.selected = '';
  }
  $scope.delete = function() {
    $scope.userSkills.splice(this.$index, 1);
  }
}]);