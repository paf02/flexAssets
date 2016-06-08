MyApp.angular.controller('appController', ['$scope', '$location', 'InitService', 'DataService', function($scope, $location, InitService, DataService){
	$scope.auth = false;

	DataService.getUsers(function(results) {
		$scope.users = results.data.user;
		pagination();
	}, function() {
		console.log('fail'); 
	});

	DataService.getCountry(function(results) {
		$scope.countries = results.data.Country;
	}, function() {
		console.log('fail'); 
	});

	DataService.getCategory(function(results) {
		$scope.categories = results.data.Category;
	}, function() {
		console.log('fail'); 
	});

	DataService.getRole(function(results) {
		$scope.roles = results.data.Role;
	}, function() {
		console.log('fail'); 
	});

	function pagination() {
		$scope.currentPage = 0;
	    $scope.defaultPageSize = 5;
	    $scope.pageSize = $scope.defaultPageSize;
        var len = Math.ceil($scope.users.length/$scope.pageSize);
        $scope.pageArray = [];
        
        for( var i = 0; i < len; i++ )
        {
            $scope.pageArray.push( i);
        }
        
        return len;            
	}

	function getMondays() {
      var d = new Date(),
          month = d.getMonth(),
          mondays = [],
          count = 0;

      d.setDate(1);

      // Get the first Monday in the month
      while (d.getDay() !== 1) {
          d.setDate(d.getDate() + 1);
      }

      // Get all the other Mondays in the month
      while (d.getMonth() === month) {
          mondays.push(new Date(d.getTime()));
          d.setDate(d.getDate() + 7);
          count++;
          if(count>2) {
          	break;
          }
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

}]);

MyApp.angular.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});
