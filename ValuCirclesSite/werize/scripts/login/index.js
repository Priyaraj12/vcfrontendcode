(function () {
  'use strict';

  angular.module('Authentication', ['common'])
    .config(function ($stateProvider) {
      $stateProvider
        .state('login', {
          url: '/login',
          templateUrl: 'scripts/login/login.html',
          controller: 'LoginController',
          data: { pageTitle: 'Login', specialClass: 'gray-bg'},
          authenticate: true 
        });
    });

})();
