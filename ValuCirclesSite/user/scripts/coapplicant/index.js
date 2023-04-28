(function () {
  'use strict';

  angular.module('coApplicant', ['common'])
    .config(function ($stateProvider) {
      $stateProvider
        .state('index.coApplicant', {
          url: '/CoApplicant',
          templateUrl: 'scripts/coapplicant/CoApplicant.html',
          controller: 'coApplicantController',
          data: { pageTitle: 'Co-Applicant Personal Information'},
          authenticate: false 
        });
    });

})();
