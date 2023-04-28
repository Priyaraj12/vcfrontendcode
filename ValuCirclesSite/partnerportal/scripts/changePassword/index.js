(function () {
  'use strict';

  angular.module('changePassword', ['common'])
    .config(function ($stateProvider) {
      $stateProvider
        .state('index.changePassword', {
          url: '/changePassword',
          templateUrl: 'scripts/changePassword/changePassword.html',
          controller: 'changePasswordController',
          data: { pageTitle: 'changePassword'},
          authenticate: false 
        });
    });

})();