MyApp.angular.directive('bookingModal', function() {
  return {
      restrict: 'E',
      controller: 'bookingController',
      templateUrl: '_partials/booking-modal.html'
  };
});