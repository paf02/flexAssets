MyApp.angular.controller('EmployeeController', ['$scope', 'InitService', 'DataService', function($scope, InitService, DataService){
		console.log('a');
	// DataService.getSkill(function(results) {
	// 	try {
	// 		$scope.skills = results.data.Skill;
	// 		console.log($scope.skills);
	// 	} 
	// 	catch(e) {
	// 		console.log(e);
	// 	}
	// }, function() {
	// 	console.log('fail'); 
	// });


	// $scope.userSkills = [];

	// $scope.add = function() {
	// 	$scope.userSkills.push($scope.selected);
	// 	$scope.selected = '';
	// }
	// $scope.delete = function() {
	// 	$scope.userSkills.splice(this.$index, 1);
	// }
}]);