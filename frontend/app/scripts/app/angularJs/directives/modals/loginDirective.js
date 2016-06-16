MyApp.angular.directive('loginModal', function() {
  return {
      restrict: 'E',
      controller: 'loginController',
      templateUrl: '_partials/login-modal.html'
  };
});