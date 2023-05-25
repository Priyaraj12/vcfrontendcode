(function () {
  'use strict';

  angular.module('Contact', ['common'])
    .config(function ($stateProvider) {
      $stateProvider
        .state('contact', {
          url: '/contact',
          templateUrl: 'scripts/contact/contact.html',
          controller: 'ContactController',
          data: { pageTitle: 'Login', specialClass: 'gray-bg'},
          authenticate: true 
        });
    });

})();
