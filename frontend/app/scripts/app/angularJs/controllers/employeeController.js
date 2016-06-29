MyApp.angular.controller('EmployeeController', ['$scope', 'InitService', 'DataService', function($scope, InitService, DataService){
	DataService.getSkill(function(results) {
		try {
			$scope.skills = results.data.Skill;
			console.log($scope.skills);
		} 
		catch(e) {
			console.log(e);
		}
	}, function() {
		console.log('fail'); 
	});

	$scope.test = "Test";

	$scope.userSkills = [];

	$scope.add = function() {
		$scope.userSkills.push($scope.selected);
		$scope.selected = '';
	}
	$scope.delete = function() {
		$scope.userSkills.splice(this.$index, 1);
	}
}]);