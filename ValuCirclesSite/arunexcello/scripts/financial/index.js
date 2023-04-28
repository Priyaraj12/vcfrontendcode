(function () {
  'use strict';

  angular.module('financial', ['common'])
    .config(function ($stateProvider) {
      $stateProvider
        .state('index.financial', {
          url: '/Financial',
          templateUrl: 'scripts/financial/financial.html',
          controller: 'financialController',
          data: { pageTitle: 'Financial'},
          authenticate: false 
        })
    });

})();
