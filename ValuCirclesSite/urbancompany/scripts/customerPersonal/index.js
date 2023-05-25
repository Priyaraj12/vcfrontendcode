(function () {
  'use strict';

  angular.module('customerPersonal', ['common'])
    .config(function ($stateProvider) {
      $stateProvider
        .state('index.customerPersonal', {
          url: '/CustomerPersonal',
          templateUrl: 'scripts/customerPersonal/customerPersonal.html',
          controller: 'customerPersonalController',
          data: { pageTitle: 'Personal Information'},
          title:"Personal Information",
          authenticate: false 
        });
    });

})();
