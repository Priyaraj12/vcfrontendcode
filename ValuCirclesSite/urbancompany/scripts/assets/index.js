(function () {
  'use strict';

  angular.module('assets', ['common'])
    .config(function ($stateProvider) {
      $stateProvider
        .state('index.assets', {
          url: '/Assets',
          templateUrl: 'scripts/assets/assets.html',
          controller: 'assetsController',
          data: { pageTitle: 'Requirements'},
          authenticate: false 
        });
    });

})();


