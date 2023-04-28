(function () {
  'use strict';

  angular.module('lpi', ['common','ngSanitize'])
    .config(function ($stateProvider) {
      $stateProvider
        .state('index.lpi', {
          url: '/Lpi',
          templateUrl: 'scripts/lpi/lpi.html',
          controller: 'lpiController',
          data: { pageTitle: 'Lpi'},
          authenticate: false 
        });
    });

})();
