(function () {
  'use strict';

  angular.module('creditCoApp', ['common'])
    .config(function ($stateProvider) {
      $stateProvider
        .state('index.creditCoApp', {
          url: '/creditCoApp',
          templateUrl: 'scripts/creditCoApp/creditCoApp.html',
          controller: 'creditCoAppController',
          data: { pageTitle: 'Credit CoApplicant', specialClass: 'gray-bg'},
          authenticate: false 
        });
    });

})();
