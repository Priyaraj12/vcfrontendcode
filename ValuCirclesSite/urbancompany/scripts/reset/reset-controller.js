var Ps = Ps || {};

(function() {
    'use strict';

    angular.module('reset')
        .controller('resetController', ['$state', '$http', '$scope', 'getcokkies', 'config','$rootScope',
            function($state, $http, $scope, getcokkies, config,$rootScope) {
                //console*.log(getcokkies.getUserIdFromUrl());

                $scope.home = function () {
                    window.location.href = 'index.html';
                }
                $scope.reset = function(newpwd, cnfrmpwd) {
                	  
                      newpwd=md5(newpwd);
                      cnfrmpwd=md5(cnfrmpwd);
                    //console*.log("np,cp", newpwd, cnfrmpwd);                     
                    $scope.loader = true;
                    if (angular.isUndefined(newpwd) || angular.isUndefined(cnfrmpwd)) {
                        $scope.loader = false;
                        $scope.error = true;
                        $scope.error_message = 'Please fill all the fields';
                    } else if (newpwd != cnfrmpwd) {
                        $scope.loader = false;
                        $scope.error = true;
                        $scope.error_message = 'Password and confirm password did not match';
                    } else {
                        $http({
                            url: config.apiUrl + '/user/resetPassword',
                            method: "POST",
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            },
                            data: "userId=" + parseInt(getcokkies.getUserIdFromUrl()) + "&emailId=" + getcokkies.getEmailIdFromUrl() + "&sessionId=" + getcokkies.getSessionIdFromUrl() + "&newpwd=" + newpwd
                            /* data:$.param({
                               'userId':getcokkies.getUserIdFromUrl(), 
                               'emailId':getcokkies.getEmailIdFromUrl(),
                               'sessionId':getcokkies.getSessionIdFromUrl(),
                               'newpwd':newpwd

                             })*/
                        }).then(function successCallback(response) {
                                // this callback will be called asynchronously
                                // when the response is available
                        	localStorage.setItem("mint", 600000);
                        	$rootScope.SessionTime = 600000;
                                //console*.log("save", response);
                                if (response.data.Result == "Success") {
                                    $scope.loader = false;
                                    $scope.sucess = true;
                                    $scope.sucess_message = "sucessfully updated!!!"
                                    $state.go('login');
                                    $scope.error = false;
                                } else {
                                    $scope.loader = false;
                                    $scope.error = true;
                                    $scope.error_message = response.data.Result;

                                }
                            },
                            function errorCallback(response) {
                                // called asynchronously if an error occurs
                            })
                    }
                }
            }
        ]);
})();