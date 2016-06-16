MyApp.angular.factory("LoginService", function () {

	var auth;

	return {
	    getAuth: function () {
	        return auth;
	    },
	    setAuth: function (value) {
	        auth = value;
	    }
	};

});