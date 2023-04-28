(function () {
  'use strict';

  angular.module('landing', ['common'])
    .config(function ($stateProvider) {
      $stateProvider
        .state('landing', {
          url: '/Landing',
          templateUrl: 'scripts/landing/landing.html',
          controller: 'landingController',
          data: { pageTitle: 'landing', specialClass: 'gray-bg'}
        });
    });

})();
