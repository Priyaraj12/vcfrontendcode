(function () {
  'use strict';

  angular.module('loanOffers', ['common'])
    .config(function ($stateProvider) {
      $stateProvider
        .state('index.loanOffers', {
          url: '/loanOffers',
          templateUrl: 'scripts/loanOffers/loanOffers.html',
          controller: 'loanOffersController',
          data: { pageTitle: 'loanOffers', specialClass: 'gray-bg'},
          authenticate: false 
        });
    });

})();
