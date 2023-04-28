(function () {
  'use strict';

/* Commented by Prernna
  angular.module('userDetails', ['common'])
    .config(function ($stateProvider) {
      $stateProvider
        .state('index.userDetails', {
          url: '/userDetails',
          templateUrl: 'scripts/userDetails/userDetails.html',
          controller: 'userDetailsController',
          data: { pageTitle: 'userDetails'},
          authenticate: false 
        });
    }); */
	
	
  angular.module('userDetails', ['common'])
    .config(function ($stateProvider) {
      $stateProvider
        .state('index.userDetails', {
          url: '/userDetails',
          templateUrl: 'scripts/userDetails/userDetails.html',
          controller: 'userDetailsController',
          data: { pageTitle: 'userDetails'},
          authenticate: false 
        }) 
		.state('index.userLpiDetails', {
          url: '/userLpiDetails',
          templateUrl: 'scripts/userDetails/userLpiDetails.html',
          controller: 'userDetailsController',
          data: { pageTitle: 'userLpiDetails'},
          authenticate: false  
        });
    });

})();