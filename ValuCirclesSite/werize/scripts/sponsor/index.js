(function () {
  'use strict';

  angular.module('sponsor', ['common'])
    .config(function ($stateProvider) {
      $stateProvider
        .state('index.sponsor', {
          url: '/sponsor',
          templateUrl: 'scripts/sponsor/sponsor.html',
          controller: 'sponsorController',
          data: { pageTitle: 'sponsor', specialClass: 'gray-bg'},
          authenticate: true 
        });
    });

})();
