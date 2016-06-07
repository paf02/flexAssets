// MyApp.angular.directive('toggle', function(){
//   return {
//     restrict: 'A',
//     controller: 'appController',
//     link: function(scope, element, attrs){
//       if (attrs.toggle=="tooltip"){
//         $(element).tooltip();
//       }
//     }
//   };
// })
MyApp.angular.controller('appController', ['$scope', '$location', 'InitService', function($scope, $location, InitService){
	$scope.auth = false;

	function getMondays() {
      var d = new Date(),
          month = d.getMonth(),
          mondays = [];

      d.setDate(1);

      // Get the first Monday in the month
      while (d.getDay() !== 1) {
          d.setDate(d.getDate() + 1);
      }

      // Get all the other Mondays in the month
      while (d.getMonth() === month) {
          mondays.push(new Date(d.getTime()));
          d.setDate(d.getDate() + 7);
      }

      return mondays;
  	}
  
  	var m = getMondays();
  	$scope.dates = [];
  
  	m.forEach(function(ele) {
	    var x = new Date(ele);
	    var y = x.getTime();
	    var z, i, dates;
	    
	    for (i=0; i<=4; i++) {
	    	z = (x.getDay() + i * 24 * 60 * 60 * 1000);
	      dates = new Date(y+z);
	      $scope.dates.push(dates);
	    }  	
	});

	$scope.credentials = {
		username: "John Smith",
		password: "abc123"
	};

	$scope.login = function(){ 
		if($scope.loginForm.username.$modelValue == $scope.credentials.username && $scope.loginForm.password.$modelValue == $scope.credentials.password) {
			$('#login').modal('hide');
			$scope.auth = true;
			$scope.message = false;
		} else {
			$scope.message = true;
		}
	}

	$scope.logout = function() {
		$scope.auth = false;
		$location.path('/home/search');
	}

	$scope.service = function(){
		
	}


	// $scope.$on('$stateChangeSuccess', function() {
	// 	console.log("stateChangeSuccess");	   
	// });

	// $scope.$on('$routeChangeSuccess', function() {
	// 	console.log("routeChangeSuccess");	   
	// });

	$scope.$on('$viewContentLoaded', function() {
		console.log("viewContentLoaded");	   
		InitService.addEventListener('jQueryReady', function () {
			$('[data-toggle="tooltip"]').tooltip();
		});	
		// InitService.addEventListener('jQueryReady', function () {
		// 	$('[data-toggle="tooltip"]').tooltip();
		// });
	});


}])