// Init angular
var MyApp = {};

MyApp.config = {
};

MyApp.angular = angular.module('flexApp', ['ui.router']);


MyApp.angular.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/home/search");
  //
  // Now set up the states
  $stateProvider
    .state('home', {
      url: "/home",
      templateUrl: "_partials/home.html"
    })
    .state('home.search', {
      url: "/search",
      templateUrl: "_partials/home.search.html"
    })
    .state('home.add', {
      url: "/add",
      templateUrl: "_partials/home.add.html"
    })
    .state('details', {
      url: "/details",
      templateUrl: "_partials/details.html"
    });
});


MyApp.endPoints = {
	getUsers: 'http://10.66.22.180:3000/api/v1/user',
	getCountry: 'http://10.66.22.180:3000/api/v1/country',
	getCategory: 'http://10.66.22.180:3000/api/v1/category',
	getRole: 'http://10.66.22.180:3000/api/v1/role',
	getCurrency: 'http://jsonplaceholder.typicode.com/posts/3'
}
MyApp.angular.controller('appController', ['$scope', '$location', 'InitService', 'DataService', function($scope, $location, InitService, DataService){
	$scope.auth = false;

	DataService.getUsers(function(results) {
		$scope.users = results.data.User;
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

  // var days = [];

  $scope.dates = [];

  (function() {
  	var startDate = '2016/05/04',
  			today = new Date(startDate),
  			day_mili = null,
  			day = null,
  			day_number = -1,
  			i = 1,
  			weeks = 0;
  	
  	var day_numberOr = today.getDay();

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
  	// } else {
  	// 	yssss = 'hid';
  	// }


  	


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

MyApp.angular.factory('DataService', ['$document', '$http', function ($document, $http) {
	'use strict';

	var pub = {};

	pub.getUsers = function(success, fail) {
		$http({
			method: 'GET',
			url: MyApp.endPoints.getUsers
		}).then(success, fail);
	};

	pub.getCountry = function(success, fail) {
		$http({
			method: 'GET',
			url: MyApp.endPoints.getCountry
		}).then(success, fail);
	};

	pub.getCategory = function(success, fail) {
		$http({
			method: 'GET',
			url: MyApp.endPoints.getCategory
		}).then(success, fail);
	};

	pub.getRole = function(success, fail) {
		$http({
			method: 'GET',
			url: MyApp.endPoints.getRole
		}).then(success, fail);
	};

	return pub;
}]);
MyApp.angular.factory('InitService', ['$document', function ($document) {
  'use strict';

  var pub = {},
    eventListeners = {
      'jQueryReady' : [],
      'ready': []
    };
  
  pub.addEventListener = function (eventName, listener) {
    eventListeners[eventName].push(listener);
  };

  function onReady() {
    var i;
    for (i = 0; i < eventListeners.ready.length; i = i + 1) {
      eventListeners.ready[i]();
    }
  }

  function jQueryOnReady() {
    var i;
    for (i = 0; i < eventListeners.jQueryReady.length; i = i + 1) {
      eventListeners.jQueryReady[i]();
    }
  }
  
  // Init
  (function () {
    $document.ready(function () {
      onReady();
    });
  }());


  (function() {
    var nTimer = setInterval(function() {
      if (window.jQuery) {
        // Do something with jQuery
        jQueryOnReady();
        clearInterval(nTimer);
      }
    }, 100);
  })();

  return pub;
  
}]);
MyApp.angular.directive('toggle', function(){
  return {
    restrict: 'A',
    link: function(scope, element, attrs){
      if (attrs.toggle=="tooltip"){
        $(element).tooltip();
      }
    }
  };
});