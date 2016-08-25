MyApp.angular.factory('Repository', Repository);
Repository.$inject = ['$document', '$http', '$q'];
function Repository($document, $http, $q) {
	var _countries;
    var getCountries = function () {
		var defer = $q.defer();
		$http.get(MyApp.endPoints.getCountry).then(function (response) {
			defer.resolve(response.data);
		}, function (response) {
			defer.reject(response);
		});
		return defer.promise;
	};

	var getCategories = function () {
		var defer = $q.defer();
		$http.get(MyApp.endPoints.getCategory).then(function (response) {
			defer.resolve(response.data);
		}, function (response) {
			defer.reject(response);
		});
		return defer.promise;
	};

	var getRole = function () {
		var defer = $q.defer();
		$http.get(MyApp.endPoints.getRole).then(function (response) {
			defer.resolve(response.data);
		}, function (response) {
			defer.reject(response);
		});
		return defer.promise;
	};

	var getEmployees = function () {
		var defer = $q.defer();
		$http.get(MyApp.endPoints.getUsers).then(function (response) {
			defer.resolve(response.data);
		}, function (response) {
			defer.reject(response);
		});
		return defer.promise;
	};

	var repository = {
		getCountries: getCountries,
		getCategories: getCategories,
		getRole: getRole,
		getEmployees: getEmployees
	};
	return repository;
}