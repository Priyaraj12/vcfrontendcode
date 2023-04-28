(function () {
  'use strict';

  angular.module('reset', ['common'])
    .config(function ($stateProvider) {
      $stateProvider
        .state('reset', {
          url: '/reset',
          templateUrl: 'scripts/reset/reset.html',
          controller: 'resetController',
          data: { pageTitle: 'reset'},
          authenticate: false 
        });
    });

})();