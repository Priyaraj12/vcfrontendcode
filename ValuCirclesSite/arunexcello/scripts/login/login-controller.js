// eslint-disable-next-line
var Ps = Ps || {};

(function() {
    'use strict';

    angular.module('Authentication')
        .controller('LoginController', ['$state', '$http', '$scope', '$rootScope', 'AuthService', 'config', '$timeout', 'getcokkies', '$location','getSponsorService',
            function($state, $http, $scope, $rootScope, AuthService, config, $timeout, getcokkies, $location,getSponsorService,getAccountService) { //currentUser
                $scope.click = false;
                $scope.loginotp = false;
                $scope.loginbody = true;
                $scope.loader = true;
                $scope.localUser=false;
                $scope.NriUser=false;
                document.cookie = "userId=0";
                document.cookie = "sessionId=0";
                localStorage.clear();
              //  console.clear();
                var ip;               
                $.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
                	
          		   ip = data.ip;
          		});
                $scope.home = function() {
                    window.location.href = '../index.html';
                }
                $scope.submit = function(email, pwd) {
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
                    $scope.click = true;
                    $http({
                        url: config.apiUrl + '/user/userLogin',
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        data: $.param({ 'emailId': email, 'password': pwd })
                    }).then(function successCallback(response) {
                    	
                        if (response.data.Error == "") {
                        	 
                            var userId = JSON.parse(response.data.Result).userId;
                            
                            var sessionId = response.data.sessionId;
                            
                            if (userId > 0) {

				var acctPromo = JSON.parse(response.data.Result).account_status;

                            	var userData =JSON.parse(response.data.Result);
                            	 /* Inclusion of OTP page during signup if Otp is not verified
                                 */
				

                            	var otpVal= JSON.parse(response.data.Result).otpVerified;
                            	var isdCode =JSON.parse(response.data.Result).countryCode;
                            	 
                            	localStorage.setItem("MobileNo",userData.userPhone);
                            	localStorage.setItem("MailId",userData.userEmail);
                            	localStorage.setItem("countrycode", isdCode);
                           
                                document.cookie = "userId=" + userId + ";";
                                document.cookie = "sessionId=" + sessionId + ";";
                                localStorage.setItem('subid',JSON.parse(response.data.Result).subscriptionId);
                                localStorage.setItem("MobiNo", btoa(JSON.parse(response.data.Result).userPhone));
                                localStorage.setItem('user_name', JSON.parse(response.data.Result).userName);
                                localStorage.setItem('userLpiStatus', JSON.parse(response.data.Result).userLPiStatus);
                                localStorage.setItem("UserInfo", JSON.stringify(JSON.parse(response.data.UserSession).sessionManagement.userDataDTO));
                                localStorage.setItem("UserEmployment", JSON.stringify(JSON.parse(response.data.UserSession).sessionManagement.userEmploymentDTO));
                                localStorage.setItem("UserIncome", JSON.stringify(JSON.parse(response.data.UserSession).sessionManagement.userIncomeDTO));
                                localStorage.setItem("UserLoan", JSON.stringify(JSON.parse(response.data.UserSession).sessionManagement.userLoanDTO));
                                localStorage.setItem("asset", JSON.stringify(JSON.parse(response.data.UserSession).sessionManagement.assetDTO));
                                localStorage.setItem("assetFinancing", JSON.stringify(JSON.parse(response.data.UserSession).sessionManagement.assetFinancingDTO));
                                localStorage.setItem("UserSalary", JSON.stringify(JSON.parse(response.data.UserSession).sessionManagement.userSalaryDeductionDTO));
                                $rootScope.username = localStorage.getItem("user_name");
                                
                            	if(response.data.Result){  
                            		 $scope.loginbody = false;
                                     $scope.loader = false;
                                     $scope.error = true;
                                     $scope.error_message = response.data.Result;
                                     localStorage.setItem("emailId", email);
                                     
                                   //15/07/2019-Otp verification:Geetha
                            		if(otpVal==0){
                            		                       		                            			 
                            			//$scope.loginotp = true; 
                            			$scope.loginotp = true; 
                            			if(isdCode=="+91")
                                    	{
                                    		$scope.localUser=true;
                                    	}
                                    	else
                                    	{
                                    		$scope.NriUser= true;
                                    			
                                    	}
                            		}else if(otpVal==1){
                            			$scope.loginotp = false;//geetha modified
                            		    //03/07/2019 - Geetha start new code changes for login OTP page removal
                            			localStorage.setItem("mint", 600000);
                        				$rootScope.SessionTime = 600000;
                                     	$("#timerstop").html('Submit');
                                    	$('#rsndotp').prop('disabled',true);
                                        $scope.error = false;
                                        $scope.successfullyRegister = true;
                            			loadWebPages();
                            		}
                            	}

                            } else { window.open("login.html", "_self"); }
                           
                        } else {
                        	//
                            $scope.click = false;
                            $scope.errorlogin = response.data.Message;
                            $('#logmail').removeAttr('disabled');
                            $('#logpass').removeAttr('disabled');
                        }
                        $scope.loader = false;
                    }, function errorCallback(response) {
                    	$scope.click = false;
                        $scope.loader = false;
                    	alert("Something Went Wrong Please try again after Sometimes ");
                    	$scope.click = false;
                        if (response.status == -1) {
                            window.location.href = '#/maintenance';
                        }
                    });
                }
                $scope.init = function () {
                	 $("#rsndotp").attr("disabled", "disabled");
                     setTimeout(function() {
                         $("#rsndotp").removeAttr("disabled");      
                     }, 30000);
                     $scope.startTimer();                    
                };
                $scope.openforgot = function() {
                    $scope.loginbody = false;
                    $scope.forgotbody=true; //geetha added
                }
                
                $scope.closesubmitforgotpwd = function() {
                    $scope.loginbody = true;
                }

                $scope.submitforgotpwd = function(forgotEmailId) {

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
                            $scope.forgotSucessMessage = "Check Your Email To Reset Your Password!!!";
                            $scope.forgotSucessStatus = true;
                            $scope.forgotErrorStatus = false;
                        } else {
                            $scope.forgotErrorMessage = "Incorrect Email Id. Please provide a valid email id!";
                            $scope.forgotErrorStatus = true;
                            $scope.forgotSucessStatus = false;
                        }
                    }, function errorCallback(response) {});
                }
                
  //OTP isempty check otpverify api call get success message redirect loginpage
   // 03/07/2019 Geetha - Login_otp page removal Commented code of OTP Verify																											
     
 
                $scope.otpSubmit =function(otp){
                	$("#timerstop").html('Submit');
                	if(angular.element('#otppp').val() == "" || angular.element('#otppp').val() == undefined){
                		$('#otppp').css('border','1px solid red');
                        $scope.error_message = 'Please enter the otp';
                        $('#rsndotp').prop('disabled',true);
                        $scope.loader = false;
                        return false;
                    }
                    else
                    { 	
                    	$("#timerstop").html('Submit');
                    	var mobile =  localStorage.getItem("MobileNo");
                    	var mailId  = localStorage.getItem("MailId");                    
                        $scope.loader = true;
                        var data = $.param({ 'otp': otp,'mobileNo':mobile,'ipAddress' :ip,'userId':getcokkies.getUserId() });
                        $http({
                            url: config.apiUrl + '/user/otpverify',
                            method: "POST",
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            },
                            data: data
                        }).then(function successCallback(response) {
                        	localStorage.setItem("mint", 600000);
                        	$rootScope.SessionTime = 600000;
                            if(response.data.Result == "Success")
                            {		
                          	$("#timerstop").html('Submit');
                            	$('#rsndotp').prop('disabled',true);
                                $scope.error = false;
                                $scope.successfullyRegister = true;
                                loadWebPages();                               
                            }
                            else{
                            	$('#rsndotp').prop('disabled',false);
                            	$("#timerstop").html('Submit');
                            	$('#mssge').html(response.data.Result);
                            	$('#otppp').css('border','1px solid red');
                            	$('#otppp').removeAttr('disabled');
                                $scope.loader = false;
                                $scope.error = true;
                                $scope.error_message = "Invalid Otp";
                                $scope.sucess = false;
                            }
                        }, function errorCallback(response) {$("#timerstop").html('Submit');});
                    }
                }
               
                //end of otp
                //resend otp to user
                //api hit and check the response
                $scope.resendMailOtpSubmit = function(){
                        $scope.loader = true;
                        var mobile =  localStorage.getItem("MobileNo");
                      //01/24/2020 - Geetha :adding changes to send OTP Email for NRI customers
                        var email = localStorage.getItem("MailId");
                        var varcountryCode =localStorage.getItem("countrycode");
                        var resendType="sms" ;
                        if(varcountryCode!=null){
                        	if(varcountryCode=="+91")
                        	{
                        		resendType="sms";
                        		
                        	}
                        	else
                        		{
                        			resendType="email";
                        			
                        		}
                        }
                        var data = $.param({ 'mobileNo':mobile,'emailId':email, 'type':resendType });
                        
                        $http({
                            url: config.apiUrl + '/user/resendOtp',
                            method: "POST",
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            },
                            data :data

                        }).then(function successCallback(response) {
                        	localStorage.setItem("mint", 600000);
                        	$rootScope.SessionTime = 600000;
                        	 $scope.loader = false;
                        	$scope.init();
                            $('input').prop('disabled',false);
                        }, function errorCallback(response) {
                        	// Currently we are not able to send OTP messages. Please try logging in after sometime.
                        });
                }
                $scope.startTimer = function(){
                	$("#timer").countdowntimer({
                		seconds : 30,
                        size : "xs",
                        stopButton : "timerstop"
                	});
                }  
            function loadWebPages(){
   		
             $http({
                 url: config.apiUrl + '/user/getpages?sessionId=' + getcokkies.getsessionId(),
                 method: "POST",
                 headers: {
                     'Content-Type': 'application/x-www-form-urlencoded'
                 },
                 data: $.param({
                     'userId': parseInt(getcokkies.getUserId())
                 })
             }).then(
							function successCallback(response) {

								var page = JSON .parse(response.data.Page);
								
								if (page == "") {        											
									$rootScope.PAGE_COMPLETED= 0;
									localStorage.setItem('PAGE_COMPLETED',$rootScope.PAGE_COMPLETED);

								} else {
									 $scope.PAGE_COMPLETED = page[0].page_completed;
									localStorage.setItem('PAGE_COMPLETED',$scope.PAGE_COMPLETED);

								}
							});  
             if(localStorage.getItem("subId") == 0) {
                 $http({
                 url: config.apiUrl+'/user/associateSubscriptionToNewUser?sessionId=' + getcokkies.getsessionId(),
                 method: "POST",
                 headers: {
                 'Content-Type': 'application/x-www-form-urlencoded'
                 },
                 data: $.param({
                 'userId': parseInt(getcokkies.getUserId())
                 })
                 }).then(function successCallback(response) {
                	 localStorage.setItem("mint", 600000);
                	 $rootScope.SessionTime = 600000;
                 });
             }
            $http({
                url: config.apiUrl + '/user/getListOfAllGetMethodFinancialTest?sessionId=' + getcokkies.getsessionId(),
                method: "POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: $.param({
                    'sessionId': parseInt(getcokkies.getsessionId()),
                    'userId': parseInt(getcokkies.getUserId())
                })
            }).then(
                function successCallback(response) {  
                	localStorage.setItem("mint", 600000);
                	$rootScope.SessionTime = 600000;
                	$("#timerstop").html('Submit');
                    $scope.dropsown = localStorage.setItem('dropdown', JSON.stringify(response.data));
                    localStorage.setItem('timestamp', response.data.TimeStamp);
                    $http({
                        url: config.apiUrl + '/user/getListOfAllGetMethodPersonal?sessionId=' + getcokkies.getsessionId(),
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        data: $.param({
                            'sessionId': parseInt(getcokkies.getsessionId()),
                            'userId': parseInt(getcokkies.getUserId())
                        })
                    }).then(
                        function successCallback(response) {
                     $http({
                        url: config.apiUrl + '/user/getpages?sessionId=' + getcokkies.getsessionId(),
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        data: $.param({
                            'userId': parseInt(getcokkies.getUserId())
                        })
                    }).then(
                        function successCallback(response) {
                                    var page = JSON  .parse(response.data.Page);
                                    if (page == "") {
                                    	$rootScope.PAGE_COMPLETED= 0;
										localStorage.setItem('PAGE_COMPLETED',$rootScope.PAGE_COMPLETED);
                                    } else {
                                        $rootScope.PAGE_COMPLETED= page[0].page_completed;
                                        $scope.PAGE_COMPLETED = page[0].page_completed;
										localStorage.setItem('PAGE_COMPLETED',$scope.PAGE_COMPLETED);
                                    }
                                    });

                        	localStorage.setItem("mint", 600000);
                        	$rootScope.SessionTime = 600000;
                            localStorage.setItem('gender', response.data.Gender);
                            localStorage.setItem('maritals', response.data.MaritalStatus);
                            localStorage.setItem('educationInstitutions', response.data.EducationInstitution);
                            localStorage.setItem('Residences', response.data.ResidenceCategory);
                            localStorage.setItem('educationDetails', response.data.EducationDetails);
                            localStorage.setItem('educations', response.data.Education);
                            localStorage.setItem('relationShip', response.data.RelationShip);
                            $http({
                                url: config.apiUrl + '/user/firstTimeLoginCheck',
                                method: "POST",
                                headers: {
                                    'Content-Type': 'application/x-www-form-urlencoded'
                                },
                                data: $.param({ 'emailId': localStorage.getItem("emailId") })
                            }).then(
                                function successCallback(responsefirst) {
                                	localStorage.setItem("mint", 600000);
                                	$rootScope.SessionTime = 600000;
                                    if (responsefirst.data.Result == "1") {
                                        var data = $.param({ 'emailId': localStorage.getItem("emailId") });
                                        getSponsorService.getSubscriptionSponsor(data).then(
                                            function successCallback(response) {
                                            	localStorage.setItem("mint", 600000);
                                            	$rootScope.SessionTime = 600000;
                                                $scope.sponsors = JSON.parse(response.data.Result);
                                                if ($scope.sponsors.length == 0) {
                                                	 $scope.loader = false;
                                                    $state.transitionTo('index.assets');
                                                } else {
                                                	 $scope.loader = false;
                                                    $state.transitionTo('index.sponsor');
                                                }
                                            }
                                        );
                                    } else {
                                    	 $scope.loader = false;
                                        $state.transitionTo('index.assets');
                                    }
                                });
                        },
                        function errorCallback(response) {});
                },
                function errorCallback(response) {});
          
            	 
             }
            }
        ]);
})();