(function () {
  'use strict';

  angular.module('loansWIP', ['common'])
    .config(function ($stateProvider) {
      $stateProvider
        .state('index.loansWIP', {
          url: '/loansWIP',
          templateUrl: 'scripts/loansWIP/loansWIP.html',
          controller: 'loansWIPController',
          data: { pageTitle: 'loansWIP'},
          authenticate: false 
        });
    });

})();