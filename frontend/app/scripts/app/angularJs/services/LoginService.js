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