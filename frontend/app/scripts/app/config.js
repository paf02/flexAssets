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