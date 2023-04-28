var Ps = Ps || {};

(function() {
        'use strict';

        angular.module('changePassword')
            .controller('changePasswordController', ['$state', '$http', '$scope', 'getcokkies','config',
                function($state, $http, $scope, getcokkies, config) {

$scope.submit = function(){
                    if($scope.newpwd == $scope.cnfrmpwd){
                        $http({
                        url: config.apiUrl+'/user/changepassword?sessionId='+getcokkies.getsessionId(),
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        data: $.param({
                            'sessionId': parseInt(getcokkies.getsessionId()),
                            'userId': parseInt(getcokkies.getUserId()),
                            'oldpwd': $scope.oldpwd,
                            'newpwd': $scope.newpwd
                        })

                    }).then(function successCallback(response) {
                        console.log(response);
                        if(response.data.Result == "Success"){
                            $scope.sucess = true;
                            $scope.sucess_message = "sucessfully updated!!!" 
                            $scope.error = false;
                        }
                        else{
                            $scope.error = true;
                            $scope.error_message = response.data.Result;
                            $scope.sucess = false;
                        }
                    }, function errorCallback(response) {
                        // called asynchronously if an error occurs

                    })
                    }
                    else{
                        $scope.error = true;
                        $scope.error_message = 'New and confirm password is not match!!!';
                        $scope.error = false;
                    }
                    
                }
             
            }]);
})();