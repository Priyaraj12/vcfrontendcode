// eslint-disable-next-line
var Ps = Ps || {};

(function() {
	'use strict';

	angular
			.module('trackMyRequest')
			.controller(
					'trackMyRequestController',
					[
							'$state',
							'$http',
							'$scope',
							'getcokkies',
							'config',
							'$location',
							'$rootScope',
							'getLpiService',
							'$window',
							function($state, $http, $scope, getcokkies, config,
									$location, $rootScope, getLpiService,
									$window) {
								
								$scope.setlenderLocal = function(data){
									
									localStorage.setItem(
											"applicationStatus", JSON.stringify(data));
									$state.go('index.trackMyRequest');
								}
								
								getLpiService
										.getlenderapplications()
										.then(
												function successCallback(
														response) {
													localStorage.setItem(
															"mint", 600000);
													$rootScope.SessionTime = 600000;

													$scope.resultt = JSON
															.parse(response.data.lenderlist)['#result-set-1'];
													
													$scope.lenderss = $scope.resultt;
												},
												
												function errorCallback(response) {
												});

							} ]);
})();