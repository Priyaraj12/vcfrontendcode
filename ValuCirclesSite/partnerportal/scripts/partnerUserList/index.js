(function () {
  'use strict';

  angular.module('partnerUserList', ['common'])
    .config(function ($stateProvider) {
      $stateProvider
        .state('index.partnerUserList', {
          url: '/partnerUserList',
          templateUrl: 'scripts/partnerUserList/partnerUserList.html',
          controller: 'partnerUserListController',
          data: { pageTitle: 'partnerUserList'},
          authenticate: false 
        });
    });

})();