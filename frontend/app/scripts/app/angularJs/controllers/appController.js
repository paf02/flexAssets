MyApp.angular.controller('AppController', ['$scope', '$cookies', 'DataService', 'LoginService', 'Repository', function ($scope, $cookies, DataService, LoginService, Repository) {
	$scope.dates = [];
	
	var cookie = $cookies.get('FlexBookingApp');
    $scope.auth = cookie ? true : false;
	$scope.$on('authEvent', function (event, data) {
		$scope.auth = LoginService.getAuth();
	});

	Repository.getCountries().then(function (results) {
		$scope.countries = results.Country;
	});

	Repository.getCategories().then(function (results) {
		$scope.categories = results.Category;
	});

	Repository.getRole().then(function (results) {
		$scope.roles = results.Role;
	});
	
	Repository.getEmployees().then(function (results) {
		$scope.users = results.User;
		pagination();
	});
	
	function pagination() {
		$scope.currentPage = 0;
		$scope.defaultPageSize = 5;
		$scope.pageSize = $scope.defaultPageSize;
		var len = Math.ceil($scope.users.length / $scope.pageSize);
		$scope.pageArray = [];

		for (var i = 0; i < len; i++) {
			$scope.pageArray.push(i);
		}

		return len;
	}
	(function () {
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
		while (weeks < (2 * 1)) {
			// get the day in millis
			day_mili = new Date(startDate).setDate(today.getDate() + i);
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

	$scope.getBreakLine = function (dayView, indx) {
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

	$scope.getCSSClass = function (user, dayView) {
		var day = null;
		var yssss = '';


		for (var indx = 0; indx < user.calendarPoint.length; indx++) {
			day = new Date(user.calendarPoint[indx].date);
			if (parseDate(day) == parseDate(dayView)) {
				if (user.calendarPoint[indx].timeOff == '') {
					yssss = 'book';
				} else {
					yssss = user.calendarPoint[indx].timeOff;
				}
				break;
			}
		};
		return yssss;
	}

	function parseDate(day) {
		try {
			return day.getFullYear() + "/" + (day.getMonth() + 1) + "/" + day.getDate();
		} catch (e) {
			return '';
		}
	}

}]);

MyApp.angular.filter('startFrom', function () {
	return function (input, start) {
		try {
			start = +start; //parse to int
			return input.slice(start);
		}
		catch (e) {
			//console.log(e);
			return null;
		}

    }
});
