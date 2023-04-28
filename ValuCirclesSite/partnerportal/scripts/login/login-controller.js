

// eslint-disable-next-line
var Ps = Ps || {};

(function() {
    'use strict';

    angular.module('Authentication')
        .controller('LoginController', ['$state', '$http', '$scope', '$rootScope', 'AuthService','config','$timeout','$location',
            function($state, $http, $scope, $rootScope, AuthService,config,$timeout,$location,getSponsorService,getAccountService) { //currentUser
                $scope.click=false;
                $scope.loginbody = true;
				$scope.forgotSucessStatus = false;
                $scope.forgotErrorStatus = false;
				$scope.errorlogin = false;
                $scope.home = function () {
                // body...
                window.location.href = '#/Landing';
                }
                $scope.submit = function(email,pwd) {
                	 $scope.loader = true;
                     if(pwd=='' || pwd == undefined || email=='' || email== undefined)
                      {
                      	$scope.loader = false;
                          $scope.click = false;
                          $scope.errorlogin = "Please check your Email and Password.";
                          return false;
                      }
                      else
                      {
                     	 
                     	 pwd=md5(pwd);
                           
                      	
                      }
                     if ($scope.click) { return false; }
                    $scope.click=true;
                    $http({
                    url:config.apiUrl+'/user/userLogin',
                    method:"POST",
                    headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data: $.param({'emailId': email , 'password' : pwd})

                    }).then(function successCallback(response) {
                    	
                   //     if (response.data.Result != "INVALID CREDENTIALS!! Please check the emailId and password") {
                        if (response.data.Result ) {	
                            var userId = JSON.parse(response.data.Result).userId;
                         
                            var refUserTypeId = JSON.parse(response.data.Result).refUserTypeId;
                          
                             var builderName = JSON.parse(response.data.Result).builderName;
                            var sessionId = response.data.sessionId;
                            if (userId > 0 && refUserTypeId == 3) {
                                document.cookie = "userId="
                                + userId + ";";
                                document.cookie = "sessionId="
                                + sessionId + ";";
                                 document.cookie = "builderName="
                                + builderName + ";";
                                
                                
                                $state.transitionTo('index.partnerUserList');
                            }else{

                                $scope.click = false;
				$scope.loader=false;
				$scope.forgotErrorStatus = true;
                                $scope.forgotSucessStatus = false;
                                
                                $scope.errorlogin = "Please check your Email and Password.";
                                $state.transitionTo('index.login');
                            }
                        } else {

                            $scope.click = false;	
                         	 $scope.loader=false;
				$scope.forgotErrorStatus = true;
                                $scope.forgotSucessStatus = false;
                            $scope.errorlogin = "Please check your Email and Password.";
                            //alert("INVALID CREDENTIALS!! Please check the emailId and password");
                        }
                    }, function errorCallback(response) {
                    });
                }
                
              $scope.openforgot = function() {
                    $scope.loginbody = false;
 
                    $scope.forgotbody=true; //geetha added
		    $scope.forgotSucessStatus = false;
		    $scope.forgotErrorStatus = false;
                }
                $scope.closesubmitforgotpwd = function() {
                    $scope.loginbody = true;
					$scope.forgotbody = false;
					$scope.forgotSucessStatus = false;
					$scope.forgotErrorStatus = false;
					$scope.errorlogin = false;
                }

                $scope.submitforgotpwd = function(forgotEmailId) {
					
				$scope.loader = true;	
 
          var paramtr = 'emailId=' + encodeURIComponent(forgotEmailId) + '&siteName=' + ($location.$$absUrl.split('/')[3] == "Uat" || $location.$$absUrl.split('/')[3] == "dev" ? $location.$$absUrl.split('/')[3] + '/' + $location.$$absUrl.split('/')[4] : $location.$$absUrl.split('/')[3]);

                 
 $http({
                        url: config.apiUrl + '/user/resetPwd',
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        data: paramtr,
                        
                    }).then(function successCallback(response) {
                    	
                        $('input').prop('disabled',false);
                        if (response.data.Result == "Success") {
                            $scope.forgotSucessMessage = "An email has been sent to your email address with instructions to reset password.";
                            $scope.forgotSucessStatus = true;
                            $scope.forgotErrorStatus = false;
                        } else {
                            $scope.forgotErrorMessage = "Incorrect Email Id. Please provide a valid email id.";
                            $scope.forgotErrorStatus = true;
                            $scope.forgotSucessStatus = false;
                        }
						$scope.loader = false;	
                    }, function errorCallback(response) {
                    });
                
				}
            }
        ]);
})();
 