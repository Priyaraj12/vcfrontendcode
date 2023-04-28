var Ps = Ps || {};

(function() {
        'use strict';

        angular.module('register')
            .controller('registerController', ['$state', '$http', '$scope', 'getcokkies','config',
                function($state, $http, $scope, getcokkies, config) {
                     $scope.otp = true;
                /*$scope.home = function () {
                // body...
                window.location.href = '#/Landing';
                }*/
  $scope.register =function(m,e,p,cp,a){
                    console.log(m,e,p,cp);
                            $scope.loader = true;
                    if(angular.isUndefined(m) || angular.isUndefined(e) || angular.isUndefined(p) || angular.isUndefined(cp)){
                            $scope.loader = false;
                            $scope.error = true;
                            $scope.error_message = 'Please fill all the fields';
                    }
                    else if(m.toString().length != 10 ){
                         $scope.loader = false;
                        $scope.error = true;
                        $scope.error_message = 'Please enter valid number';
                    }
                    else if(e.indexOf("@") < 1 || e.lastIndexOf(".") < e.indexOf("@") + 2 || e.lastIndexOf(".") + 2 >= e.length){
                        $scope.loader = false;
                        $scope.error = true;
                        $scope.error_message = 'Enter the vaild email address for ex: example@gmail.com ';
                    }
                    else if(p != cp ){
                        $scope.loader = false;
                        $scope.error = true;
                        $scope.error_message = 'Password and confirm password did not match';
                    }
                    else if(angular.isUndefined(a)){
                        $scope.loader = false;
                        $scope.error = true;
                        $scope.error_message = 'Please select agree to the terms';
                    }
                    else{
                         $scope.error = false;
                        $scope.userSignUp={
                            'userEmail': e,
                            'userPhone': m,
                            'userCreds': p,
                            'refUserTypeId':3
                        }
                        $http({
                        url: config.apiUrl+'/user/signUp',
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        data: $.param({'userSignUp':JSON.stringify($scope.userSignUp)})

                    }).then(function successCallback(response) {
                        //console.log(response);
                        if(response.data.Result == "Success"){
                            $scope.otp = false;

                            $scope.loader = false;
                             document.cookie = "userId="
                            + response.data.userId + ";";
                        }
                        else{
                            $scope.otp = true;
                            $scope.loader = false;
                            $scope.error = true;
                            $scope.error_message = response.data.Result;

                        }
                    }, function errorCallback(response) {
                        // called asynchronously if an error occurs

                    })
                    }
                }
                $scope.otpsubmit =function(otp){
                    if(otp == ''){
                            $scope.error_message = 'Please enter the otp';
                    }
                    else{
                        $scope.loader = true;
                        $http({
                        url: config.apiUrl+'/user/otpverify',
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        data: $.param({
                            'otp': otp,
                            'mobileNo':$scope.userSignUp.userPhone
                        })

                    }).then(function successCallback(response) {
                       // console.log(response);
                        if(response.data.Result == "Success"){
                            $scope.loader = false;
                            window.location.href= '#/login';
                        }
                    }, function errorCallback(response) {
                        // called asynchronously if an error occurs

                    })
                    }
                }


 
                $scope.resendotpsubmit =function(otp){
                        $scope.loader = true;
                        $http({
                        url: config.apiUrl+'/user/resendOtp',
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        data: $.param({
                            'mobileNo':$scope.userSignUp.userPhone.toString()
                        })

                    }).then(function successCallback(response) {
                       // console.log(response);
                        if(response.data.Result == "Success"){
                            $scope.sucess_message = "Otp sent!! check your mobile";
                            $scope.loader = false;
                        }
                    }, function errorCallback(response) {
                        // called asynchronously if an error occurs

                    })
                }

             
            }]);
})();