(function () {
  'use strict';

  angular.module('buillderInfo', ['common'])
    .config(function ($stateProvider) {
      $stateProvider
        .state('index.builderInfo', {
          url: '/builderInfo',
          templateUrl: 'scripts/builderInfo/builderInfo.html',
          controller: 'builderInfoController',
          data: { pageTitle: 'builderInfo'},
          authenticate: false 
        });

    });

})();
