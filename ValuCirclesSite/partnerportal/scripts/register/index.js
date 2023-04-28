(function () {
  'use strict';

  angular.module('register', ['common'])
    .config(function ($stateProvider) {
      $stateProvider
        .state('register', {
          url: '/register',
          templateUrl: 'scripts/register/register.html',
          controller: 'registerController',
          data: { pageTitle: 'register'},
          authenticate: false 
        });
    });

})();