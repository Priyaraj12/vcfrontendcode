(function () {
  'use strict';

  angular.module('credit', ['common'])
    .config(function ($stateProvider) {
      $stateProvider
       .state('index.credit', {
          url: '/credit',
          templateUrl: 'scripts/credit/credit.html',
          controller: 'creditController',
          data: { pageTitle: 'Credit Report', specialClass: 'gray-bg'},
          authenticate: false 
        });
    });

})();
