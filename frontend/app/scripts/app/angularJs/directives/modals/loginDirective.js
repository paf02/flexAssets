MyApp.angular.directive('loginModal', function() {
  return {
      restrict: 'E',
      controller: 'LoginController',
      templateUrl: '_partials/login-modal.html'
  };
});