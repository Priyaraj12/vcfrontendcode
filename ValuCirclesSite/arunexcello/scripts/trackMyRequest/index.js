(function () {
  'use strict';

  angular.module('trackMyRequest', ['common'])
    .config(function ($stateProvider) {
      $stateProvider
        .state('index.trackMyRequest', {
          url: '/trackMyRequest',
          templateUrl: 'scripts/trackMyRequest/trackMyRequest.html',
          controller: 'trackMyRequestController',
          data: { pageTitle: 'Track My Request'},
          title:"Track My Request",
          authenticate: false 
        });
    });

})();
