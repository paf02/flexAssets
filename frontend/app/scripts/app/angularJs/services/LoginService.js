MyApp.angular.factory("LoginService", function () {

	var auth = false;

	return {
	    getAuth: function () {
	        return auth;
	    },
	    setAuth: function (value) {
	        auth = value;
	    }
	};

});