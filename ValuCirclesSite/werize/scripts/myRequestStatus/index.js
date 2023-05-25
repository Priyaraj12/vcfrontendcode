(function () {
  'use strict';

  angular.module('myRequestStatus', ['common'])
    .config(function ($stateProvider) {
      $stateProvider
        .state('index.myRequestStatus', {
          url: '/myRequestStatus',
          templateUrl: 'scripts/myRequestStatus/myRequestStatus.html',
          controller: 'myRequestStatusController',
          data: { pageTitle: 'Request Status'},
          title:"Request Status",
          authenticate: false 
        });
    });

})();
