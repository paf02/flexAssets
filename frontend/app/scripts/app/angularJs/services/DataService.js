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