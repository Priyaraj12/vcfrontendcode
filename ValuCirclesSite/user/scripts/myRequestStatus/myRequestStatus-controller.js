// eslint-disable-next-line
var Ps = Ps || {};


(function() {
    'use strict';

    angular.module('myRequestStatus')
        .controller('myRequestStatusController', ['$state', '$http', '$scope', 'getcokkies', 'config', '$location', '$rootScope','getLpiService','$window',
            function($state, $http, $scope, getcokkies,config, $location, $rootScope,getLpiService,$window) {
        	function getCookie(cname) {
        	    var name = cname + "=";
        	    var decodedCookie = decodeURIComponent(document.cookie);
        	    var ca = decodedCookie.split(';');
        	    for(var i = 0; i <ca.length; i++) {
        	        var c = ca[i];
        	        while (c.charAt(0) == ' ') {
        	            c = c.substring(1);
        	        }
        	        if (c.indexOf(name) == 0) {
        	            return c.substring(name.length, c.length);
        	        }
        	    }
        	    return "";
        	}
        	
        	$scope.dataInfo = JSON.parse(localStorage.getItem("applicationStatus"));  
        	
        	
        	var data =  $.param({
        		'userId' : parseInt(getcokkies.getUserId()),
                 'lenderId': $scope.dataInfo.userLPiLenderId,
                
             });      
        	getLpiService
			.getlenderapplicationstatus(data)
			.then(
					function successCallback(
							response) {
						localStorage.setItem(
								"mint", 600000);
						$rootScope.SessionTime = 600000;

						$scope.resultt = JSON.parse(response.data.status)['#result-set-1'];
			
						
						$scope.lenderss = $scope.resultt;
					},
					
					function errorCallback(response) {
					});
        	
        	
        	getLpiService
			.getlenderapplicationsanctions(data)
			.then(
					function successCallback(
							response) {
						localStorage.setItem(
								"mint", 600000);
						$rootScope.SessionTime = 600000;

						$scope.resultt = JSON.parse(response.data.sanctions)['#result-set-1'];
						
						
						$scope.lenders1 = $scope.resultt;
					},
					
					function errorCallback(response) {
					});
        	
        	
        	getLpiService
			.getlenderapplicationdisbursements(data)
			.then(
					function successCallback(
							response) {
						localStorage.setItem(
								"mint", 600000);
						$rootScope.SessionTime = 600000;

						$scope.resultt = JSON
								.parse(response.data.disbursements)['#result-set-1'];
						
						
						$scope.lenders2 = $scope.resultt;
					},
					
					function errorCallback(response) {
					});
                 
        }
        ]);
})();