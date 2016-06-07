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
	getLanguage: 'http://jsonplaceholder.typicode.com/posts/2',
	getCurrency: 'http://jsonplaceholder.typicode.com/posts/3'
}
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
MyApp.angular.controller('appController', ['$scope', '$location', 'InitService', 'DataService', function($scope, $location, InitService, DataService){
	$scope.auth = false;


	DataService.getUsers(function(results) {
		console.log(results); 

		$scope.users = results.data.user;
	}, function() {
		console.log('fail'); 
	});

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


}])
MyApp.angular.factory('DataService', ['$document', '$http', function ($document, $http) {
	'use strict';

	var pub = {};

	pub.getUsers = function(success, fail) {
		$http({
			method: 'GET',
			url: MyApp.endPoints.getUsers
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