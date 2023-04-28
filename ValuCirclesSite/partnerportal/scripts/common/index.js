(function () {
  'use strict';

  angular.module('common', [])
    .config(function ($stateProvider) {
      $stateProvider
        .state('index', {
          abstract: true,
          url: '/index',
          templateUrl: 'scripts/common/content.html',
          controller: 'MainController',
          data: { pageTitle: 'MainController'},
          authenticate: false 
        });
    });

})();
