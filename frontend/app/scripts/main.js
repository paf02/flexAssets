// Init angular
var MyApp = {};

MyApp.config = {
};

MyApp.angular = angular.module('tomeFerreto', []);

MyApp.angular.controller('IndexPageController', ['$scope', '$http', 'InitService', function ($scope, $http, InitService) {
  'use strict';
  
  InitService.addEventListener('ready', function () {
    // DOM ready
    console.log('IndexPageController: ok, DOM ready');
    
  });
}]);
console.log('Angular Directive');    
MyApp.angular.factory('InitService', ['$document', function ($document) {
  'use strict';

  var pub = {},
    eventListeners = {
      'ready' : []
    };
  
  pub.addEventListener = function (eventName, listener) {
    eventListeners[eventName].push(listener);
  };

  function onReady() {
    var i;
    for (i = 0; i < eventListeners.ready.length; i = i + 1) {
      eventListeners.ready[i]();
    }
  }
  
  // Init
  (function () {
    $document.ready(function () {
      onReady();
    });
  }());

  return pub;
  
}]);