(function () {
  'use strict';

  angular.module('bankverification', ['common'])
    .config(function ($stateProvider) {
     $stateProvider
        .state('index.bankverification', {
          url: '/bankVerify',
          templateUrl: 'scripts/bankverification/bankVerify.html',
          controller: 'bankVerificationController',
          data: { pageTitle: 'Bank Verification'},
          authenticate: false 
        })
    });

})();
