MyApp.angular.directive('bookingModal', function() {
  return {
      restrict: 'E',
      controller: 'BookingController',
      templateUrl: '_partials/booking-modal.html'
  };
});