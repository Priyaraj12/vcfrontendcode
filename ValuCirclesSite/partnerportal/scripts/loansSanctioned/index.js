(function () {
  'use strict';

  angular.module('loansSanctioned', ['common'])
    .config(function ($stateProvider) {
      $stateProvider
        .state('index.loansSanctioned', {
          url: '/loansSanctioned',
          templateUrl: 'scripts/loansSanctioned/loansSanctioned.html',
          controller: 'loansSanctionedController',
          data: { pageTitle: 'loansSanctioned'},
          authenticate: false 
        });
    });

})();