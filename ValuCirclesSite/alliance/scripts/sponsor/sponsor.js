var Ps = Ps || {};

(function() {
    'use strict';

    angular.module('sponsor')
        .controller('sponsorController', ['$state', '$http', '$scope', '$rootScope', 'getcokkies', 'config', '$filter', 'dropDown','getSponsorService',
            function($state, $http, $scope, $rootScope, getcokkies, config, $filter, dropDown,getSponsorService) {
            	$scope.accept = false;
                $scope.subscriptionDetailId = null;
                $scope.error = false;
            	$scope.redirect = function () {
            		$state.transitionTo('index.customerPersonal');
            	}
            	var data = $.param({'emailId': localStorage.getItem("emailId") });
                getSponsorService.getSubscriptionSponsor(data).then(
                    function successCallback(response) {
                        $scope.sponsors = JSON.parse(response.data.Result);
                        if($scope.sponsors.length == 0 ){
                            $state.transitionTo('index.customerPersonal');
                        }
                    }
                );
                $scope.shareSponsor = function(){
                    var subId = $scope.subscriptionDetailId;
                    if(subId !=null){
                        $scope.error = false;
                        var data = $.param({
                            'userId': parseInt(getcokkies.getUserId()),
                            'subId': subId
                        });
                        getSponsorService.selectedSubscription(data).then(
                            function successCallback(response) {
                                if(response.data.Result == "Success"){
                                    $state.transitionTo('index.customerPersonal');
                                }
                            }
                        );
                    }else{
                        $scope.error = true;
                        $scope.error_msg = "Select the subscription from the list..."
                    }
                }
                $scope.setSubScriptionDetailId = function(detailId){
                    $scope.subscriptionDetailId = detailId;
                }

            }
        ]);
})();
