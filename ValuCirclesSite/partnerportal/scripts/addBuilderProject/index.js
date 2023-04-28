(function () {
  'use strict';

  angular.module('addBuilderProject', ['common'])
    .config(function ($stateProvider) {
      $stateProvider
        .state('index.addBuilderProject', {
          url: '/addBuilderProject',
          templateUrl: 'scripts/addBuilderProject/addBuilderProject.html',
          controller: 'addBuilderProjectController',
          data: { pageTitle: 'addBuilderProject'},
          authenticate: false 
        });
    });

})();