(function () {
  'use strict';

  angular.module('subscription', ['common'])
    .config(function ($stateProvider) {
      $stateProvider
        .state('index.subscription', {
          url: '/subscription',
          templateUrl: 'scripts/subscription/subscription.html',
          controller: 'subscriptionController',
          data: { pageTitle: 'subscription'},
          authenticate: false 
        });
    });

})();