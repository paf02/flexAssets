// Init angular
var MyApp = {};

MyApp.config = {
};

MyApp.angular = angular.module('flexApp', ['ui.router', 'ui.bootstrap']);


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
      url: "/details?:userId",
      templateUrl: "_partials/details.html"
    })
    .state('booking', {
      url: "/booking?:userId",
      templateUrl: "_partials/booking.html",
      controller: 'bookingController'
    })
    .state('approval', {
      url: "/approval",
      templateUrl: "_partials/approval.html"
    });
});


MyApp.endPoints = {
	getUsers: 'http://10.66.22.180:3000/api/v1/user',
  getUsersFilterByID: 'http://10.66.22.180:3000/api/v1/user/filterByID',
	getCountry: 'http://10.66.22.180:3000/api/v1/country',
	getCategory: 'http://10.66.22.180:3000/api/v1/category',
	getRole: 'http://10.66.22.180:3000/api/v1/role',
  getSkill: 'http://10.66.22.180:3000/api/v1/skill',
  postAdminFind: 'http://10.66.22.180:3000/api/v1/adminFind',
	getCurrency: 'http://jsonplaceholder.typicode.com/posts/3'
}
MyApp.angular.controller('AppController', ['$scope', 'DataService', 'LoginService', function($scope, DataService, LoginService){
  
  $scope.$on('authEvent', function(event, data) { 
    $scope.auth = LoginService.getAuth();
  });

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
  	var startDate = new Date,
  			today = new Date(startDate),
  			day_mili = null,
  			day = null,
  			day_number = -1,
  			i = 1,
  			weeks = 0,
  			day_numberOr = today.getDay();

  	// 2 == 2 weeks
  	while (weeks < (2*1)){
  		// get the day in millis
  		day_mili =	new Date(startDate).setDate(today.getDate() + i);
  		// parse the Date to a Date format
  		day = new Date(day_mili);
  		// get the day in the week
  		day_number = day.getDay();
  		if (i == 1 && day_numberOr < 5) {
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

        if (user.calendarPoint[indx].timeOff == '') {
          yssss = 'book';
        } else {
          // switch () {
          //   case 'vacation':
          //     yssss = 'vacation';
          //   break;

          //   case 'holiday':
          //     yssss = 'holiday';
          //   break;

          //   case 'incapacitation':
          //     yssss = 'incapacitation';
          //   break;
          // }

          yssss = user.calendarPoint[indx].timeOff;
        }
  			
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

}]);

MyApp.angular.filter('startFrom', function() {
	return function(input, start) {
		try {
    		start = +start; //parse to int
    		return input.slice(start);	
    	}
    	catch(e) {
    		//console.log(e);
    		return null;
    	}

    }
});

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
MyApp.angular.controller('HeaderController', ['$scope', 'DataService', '$location', '$uibModal', '$stateParams', 'LoginService', function($scope, DataService, $location, $uibModal, $stateParams, LoginService){
	
	$scope.open = function (size) {
		var modalInstance;
		var modalScope = $scope.$new();  

		modalInstance = $uibModal.open({
			template: '<login-modal></login-modal>',
			size: size,
			scope: modalScope
		});
	};

	$scope.logout = function() {
		LoginService.setAuth(false);
		$scope.$emit('authEvent');
		//$scope.auth = false;
		$location.path('/home/search');
	}
}]);
MyApp.angular.controller('LoginController', ['$scope', 'DataService', 'LoginService', function($scope, DataService, LoginService){
	
	$scope.ok = function () {
		$scope.$close('close');
	};

	$scope.cancel = function () {
		$scope.$dismiss('cancel');
	};

	var admin = {
		username: "",
		password: ""
	};

	$scope.login = function() { 
		
		admin = {
			username: $scope.loginForm.username.$modelValue,
			password: $scope.loginForm.password.$modelValue
		}			

		DataService.getAdmin(function(results) {

			if (admin.username == results.data.Admin[0].username && admin.password == results.data.Admin[0].password) {
				LoginService.setAuth(true);
				$scope.$emit('authEvent');
				$scope.ok();
				$scope.message = false;
			} else {
				$scope.message = true;
			}
		}, function() {
			console.log('Not login'); 
			$scope.message = true;
		}, admin);
	};
}]);
MyApp.angular.factory('DataService', ['$document', '$http', function ($document, $http) {
	'use strict';

	var pub = {};

	pub.getUsers = function(success, fail) {
		$http({
			method: 'GET',
			url: MyApp.endPoints.getUsers
		}).then(success, fail);
	};

	pub.getUser = function(success, fail, userId) {
		$http({
			method: 'GET',
			url: MyApp.endPoints.getUsersFilterByID + '/' + userId
		}).then(success, fail);
	};

	pub.getCountry = function(success, fail) {
		$http({
			method: 'GET',
			url: MyApp.endPoints.getCountry
		}).then(success, fail);
	};

	pub.getSkill = function(success, fail) {
		$http({
			method: 'GET',
			url: MyApp.endPoints.getSkill
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

	pub.getAdmin = function(success, fail, admin) {
		$http({
			method: 'POST',
			data: admin,
			url: MyApp.endPoints.postAdminFind
		}).then(success, fail);
	};

	return pub;
}]);
MyApp.angular.factory("LoginService", function () {

	var auth = null;

	return {
	    getAuth: function () {
	        return auth;
	    },
	    setAuth: function (value) {
	        auth = value;
	    }
	};

});
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
MyApp.angular.directive('bookingModal', function() {
  return {
      restrict: 'E',
      controller: 'BookingController',
      templateUrl: '_partials/booking-modal.html'
  };
});
MyApp.angular.directive('loginModal', function() {
  return {
      restrict: 'E',
      controller: 'LoginController',
      templateUrl: '_partials/login-modal.html'
  };
});