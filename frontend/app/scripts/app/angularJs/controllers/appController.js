MyApp.angular.controller('appController', ['$scope', '$location', 'DataService', function($scope, $location, DataService){
	$scope.auth = false;

	DataService.getUsers(function(results) {
		try {
			$scope.users = results.data.User;
			pagination();	
		} 
		catch(e) {
			console.log(e);
		}
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

	// function getMondays() {
 //      var d = new Date(),
 //          month = d.getMonth(),
 //          mondays = [],
 //          count = 0;

 //      d.setDate(1);

 //      // Get the first Monday in the month
 //      while (d.getDay() !== 1) {
 //          d.setDate(d.getDate() + 1);
 //      }

 //      // Get all the other Mondays in the month
 //      while (d.getMonth() === month) {
 //          mondays.push(new Date(d.getTime()));
 //          d.setDate(d.getDate() + 7);
 //          count++;
 //          if(count>2) {
 //          	break;
 //          }
 //      }

 //      return mondays;
 //  	}

 //  	var m = getMondays();
 //  	$scope.dates = [];

 //  	m.forEach(function(ele) {
	//     var x = new Date(ele);
	//     var y = x.getTime();
	//     var z, i, dates;

	//     for (i=0; i<=4; i++) {
	//     	z = (x.getDay() + i * 24 * 60 * 60 * 1000);
	//       dates = new Date(y+z);
	//       $scope.dates.push(dates);
	//     }  	
	// });

	$scope.dates = [];

  (function() {
  	// startDate is a string or Date.now()
  	var startDate = Date.now(),
  			today = new Date(startDate),
  			day_mili = null,
  			day = null,
  			day_number = -1,
  			i = 1,
  			weeks = 0,
  			day_numberOr = today.getDay();

  	// 2 == 2 weeks
  	while (weeks < 2){
  		// get the day in millis
  		day_mili =	new Date(startDate).setDate(today.getDate() + i);
  		// parse the Date to a Date format
  		day = new Date(day_mili);
  		// get the day in the week
  		day_number = day.getDay();
  		if (i == 1) {
  			calza(day_number);
  		}

  		if (day_number == day_numberOr) 
  			weeks++;

  		// filter saturdays and sundays
  		if (0 < day_number && 6 > day_number)
  			$scope.dates.push(day);

  		i++;
			// console.log(day);
		}
	})();

	function calza(day_number) {
		for (var i = day_number - 1; i >= 1; i--) {
			$scope.dates.push('');
		};  
	}

	$scope.getBreakLine = function(dayView, indx) {
  	// var yssss = '';

  	if (dayView) {
  		if (indx == 0) {
  			return 'block';
  		} else {
  			if (dayView.getDay() > 1) {
  				return 'block';
  			} else {
  				return '';
  			}
  		}
  	} else {
  		return 'hid block';
  	}
  } 

  $scope.getCSSClass = function(user, dayView) {
  	var day = null;
  	var yssss = '';
  	
  	
  	for (var indx = 0; indx < user.calendarPoint.length; indx++) {
  		day = new Date(user.calendarPoint[indx].date);
  		// console.log(parseDate(day));
  		// console.log(parseDate(dayView));

  		if (parseDate(day) == parseDate(dayView)) {
  			// console.log('match');
  			yssss = 'book';
  			break;
  		}
  	};

  	// console.log(dayView.getFullYear() + "/" + (dayView.getMonth() + 1) + "/" + dayView.getDate());
  	return yssss;
  }   

  function parseDate(day) {
  	try {
  		return day.getFullYear() + "/" + (day.getMonth() + 1) + "/" + day.getDate();
  	} catch(e) {
  		return '';
  	}
  }

  $scope.credentials = {
  	username: "John Smith",
  	password: "abc123"
  };

  $scope.login = function() { 

    var admin = {
      username: $scope.loginForm.username.$modelValue,
      password: $scope.loginForm.password.$modelValue
    };


    DataService.getAdmin(function(results) {
      console.log(results);
    }, function() {
      console.log('fail'); 
    }, admin);



  	// if($scope.loginForm.username.$modelValue == $scope.credentials.username && $scope.loginForm.password.$modelValue == $scope.credentials.password) {
  	// 	$('#login').modal('hide');
  	// 	$scope.auth = true;
  	// 	$scope.message = false;
  	// } else {
  	// 	$scope.message = true;
  	// }
  }

  $scope.logout = function() {
  	$scope.auth = false;
  	$location.path('/home/search');
  }

}]);

MyApp.angular.controller('detailsController', ['$scope', 'InitService', 'DataService', '$stateParams', function($scope, InitService, DataService, $stateParams){
	console.log($stateParams.userId);

	DataService.getUser(function(results) {
		try {
			$scope.user = results.data.User;
      $scope.skills = $scope.user.skill;
      console.log($scope.skills);
		} 
		catch(e) {
			console.log(e);
		}
	}, function() {
		console.log('fail'); 
	}, $stateParams.userId);
}]);

MyApp.angular.filter('startFrom', function() {
	return function(input, start) {
		try {
    		start = +start; //parse to int
    		return input.slice(start);	
    	}
    	catch(e) {
    		console.log(e);
    		return null;
    	}

    }
});
