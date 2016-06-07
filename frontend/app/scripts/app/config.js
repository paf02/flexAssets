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


// MyApp.endPoints = {
// 	getProduct: 'http://jsonplaceholder.typicode.com/posts/1',
// 	getLanguage: 'http://jsonplaceholder.typicode.com/posts/2',
// 	getCurrency: 'http://jsonplaceholder.typicode.com/posts/3'
// }