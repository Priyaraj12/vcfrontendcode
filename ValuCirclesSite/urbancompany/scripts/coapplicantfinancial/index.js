(function () {
  'use strict';

  angular.module('coApplicantFinancial', ['common'])
    .config(function ($stateProvider) {
      $stateProvider
        .state('index.coApplicantfinancial', {
          url: '/coApplicantfinancial',
          templateUrl: 'scripts/coapplicantfinancial/coapplicantfinancial.html',
          controller: 'coApplicantFinancialController',
          data: { pageTitle: 'co-Applicant Financial'},
          authenticate: false 
        });
    });

})();
