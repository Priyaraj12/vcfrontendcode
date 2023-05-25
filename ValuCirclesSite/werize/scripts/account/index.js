(function () {
  'use strict';

  angular.module('account', ['common'])
    .config(function ($stateProvider) {
      $stateProvider
        .state('index.changePassword', {
          url: '/ChangePassword',
          templateUrl: 'scripts/account/changepassword.html',
          controller: 'accountController',
          data: { pageTitle: 'changepassword'},
          authenticate: false 
        }).state('register', {
          url: '/Register',
          templateUrl: 'scripts/account/register.html',
          controller: 'accountController',
          data: { pageTitle: 'Register'},
          authenticate: false 
        });
    });

})();
