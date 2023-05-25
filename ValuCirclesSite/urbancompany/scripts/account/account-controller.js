
var Ps = Ps || {};

(function() {
    'use strict';

    angular.module('account')
        .controller('accountController', ['$state', '$http', '$scope', '$rootScope', 'getcokkies', '$httpParamSerializerJQLike','config','getAccountService',
            function($state, $http, $scope, $rootScope, getcokkies, $httpParamSerializerJQLike,config,getAccountService) {
                $scope.otp = true;
                $scope.successfullyRegister = false;
                $scope.NriUser =false;
                $scope.localUser =false; 
                //route for landing page
                $scope.home = function () {
                    window.location.href = 'index.html';
                }

                $scope.changeUrl = function() {
                    window.location.href = "#/index/CustomerPersonal";
               }
                var systemip = "";
               /* $.getJSON("//freegeoip.net/json/", function (sysip) {
                            systemip =sysip.ip;
               });*/
                $.getJSON('http://gd.geobytes.com/GetCityDetails?callback=?', function(data) {
             		 
                	systemip = data.geobytesipaddress;
             		  //console*.log(data.geobytesipaddress);
             		});
                
				setISDDropdown();
												/**
								 * function to set page values to each fields 
								 */
								function setISDDropdown() {
									$scope.countrycodeList =
										[ 
											{ name: '+91', id: "+91" }
											/*,
											{ name: 'Australia (+61)', id: "+61" },
											{ name: 'Canada (+1)', id: "+1" },
											{ name: 'Hong Kong (+852)', id: "+852" },
											{ name: 'Kuwait (+965)', id: "+965" },
											{ name: 'Malaysia (+60)', id: "+60" },
											{ name: 'Mexico (+52)', id: "+52" },
											{ name: 'New Zealand (+64)', id: "+64" },
											{ name: 'Oman (+968)', id: "+968" },
											{ name: 'Philippines (+63)', id: "+63" },
											{ name: 'Qatar (+974)', id: "+974" },
											{ name: 'Singapore (+65)', id: "+65" },
											{ name: 'South Africa (+27)', id: "+27" },
											{ name: 'Thailand (+66)', id: "+66" },
											{ name: 'UAE (+971)', id: "+971" },
											{ name: 'UK (+44)', id: "+44" },
											{ name: 'USA (+1)', id: "+1" }*/
										];
										
									$scope.refcountry = "+91"
								};
				
				
				
				
                //changepassword submit
                //check the newpwd and old pwd both are same function enter else show error
        		$scope.submit = function(){
        			if($scope.newpwd == $scope.cnfrmpwd){
        			    var data = $.param({ 'userId': parseInt(getcokkies.getUserId()), 'oldpwd': md5($scope.oldpwd),'newpwd': md5($scope.newpwd) });
        			    getAccountService.changePassword(data).then(
        			        function successCallback(response) {
                                if(response.data.Result == "Success"){
                                    $scope.sucess = true;
                                    $scope.sucess_message = "Successfully updated!!!"
                                    $scope.error = false;
                                }
                                else{
                                    $scope.error = true;
                                    $scope.error_message = response.data.Result;
                                    $scope.sucess = false;
                                }
                            }
                        );
        			}
        			else{
        				$scope.error = true;
                        $scope.error_message = 'New password and confirm password does not a match';
        			}
        			
        		};
                //Register submit
                //Check the condition m for mobile e for email p for password cp for confirm password a for terms and condition
                //After hit signup api check the response if it sucsess open the otp page.
                $scope.register = function(m,e,p,cp,a,nri,refcd,refcn){
					refcd = "ARUNEX";
					//alert("in register" + m + e + cp + a + nri +refcd + refcn);
                	p=md5(p);
                    cp=p;
                    $scope.loader = true;
                    if(angular.isUndefined(m) || angular.isUndefined(e) || angular.isUndefined(p) || angular.isUndefined(cp)|| angular.isUndefined(refcn)){
                        $scope.loader = false;
                        $scope.error = true;
                        $scope.error_message = 'Please fill all the fields';
                    }
                    else if((refcn=="+91"||refcn=="+1"||refcn=="+44")&& m.toString().length != 10 ){
						alert("check1..");
                        $scope.loader = false;
                        $scope.error = true;
                        $scope.error_message = 'Please enter valid mobile number';
                    }
                    else if(e.indexOf("@") < 1 || e.lastIndexOf(".") < e.indexOf("@") + 2 || e.lastIndexOf(".") + 2 >= e.length){
                        $scope.loader = false;
                        $scope.error = true;
                        $scope.error_message = 'Enter the vaild email address for ex: example@gmail.com ';
                    }
                   /* else if(p != cp ){
                        $scope.loader = false;
                        $scope.error = true;
                        $scope.error_message = 'New Password and confirm password does not match';
                    }*/
                  
                   /* else if(angular.isUndefined(a)){
                        $scope.loader = false;
                        $scope.error = true;
                        $scope.error_message = 'Please select agree to the terms';
                    } else if(angular.isUndefined(nri)){
                    	$scope.loader = false ;
                    	$scope.error = true;
                    	$scope.error_message = 'Please Confirm your Nationality';
                    } */
                    else if(!angular.isNumber(parseInt(m))){
                        $scope.loader = false;
                        $scope.error = true;
                        $scope.error_message = 'Please Enter Numbers only!!'
                    } 
                   /* else if(angular.isUndefined(consent)){
                    	$scope.loader = false ;
                    	$scope.error = true;
                    	$scope.error_message = 'Please select WhatsApp Consent checkbox';
                    } */
                    else{
                        $scope.error = false;
                    
                  /*  var wats_consent="1";
                    if(consent== true){
                    	wats_consent=1;
                    }else{
                    	wats_consent=0;
                    }*/
                    
                        $scope.userSignUp={
                            'userEmail': e,
                            'userPhone': parseInt(m),
                            'userCreds': p,
                            'refUserTypeId':1,
                            'account_status': refcd,
                            'country_code':refcn
                        //    'whatsapp_consent':wats_consent
                          
                        }
						//alert(refcd);
                      
                        if(refcd!=undefined && refcd.toLowerCase()=="vjr360"){
                        	alert("Your promo code from Vijay Raja Group has been accepted by ValuCircles.");
                        }
						if(refcd!=undefined && refcd.toLowerCase()=="arunex"){
                        	alert("Your promo code from Arun Excello has been accepted by ValuCircles.");
                        }
						if(refcd!=undefined && refcd.toLowerCase()=="alliance"){
                        	alert("Your promo code from Alliance has been accepted by ValuCircles.");
                        }
						if(refcd!=undefined && refcd.toLowerCase()=="urbanrise"){
                        	alert("Your promo code from Urban Rise has been accepted by ValuCircles.");
                        }

                        var data = $.param({'userSignUp':JSON.stringify($scope.userSignUp)});
                        localStorage.setItem("countrycode", refcn);
                        getAccountService.signUp(data).then(
                            function successCallback(response) {
                                if(response.data.Result == "Success")
                                {
                                    $scope.otp = false;
                                    $scope.loader = false;
                                    document.cookie = "userId=" + response.data.userId + ";";
                                    var varcountry_Code =localStorage.getItem("countrycode");
                                    
                                    	if(varcountry_Code=="+91")
                                    	{
                                    		$scope.localUser=true;
                                    	}
                                    	else
                                    	{
                                    		$scope.NriUser= true;
                                    			
                                    	}
                         
								}
                                else
                                {
                                    $scope.otp = true;
                                    $scope.loader = false;
                                    $scope.error = true;
                                    $scope.error_message = response.data.Result;
                                    window.reset();

                                }
                            }
                        )
                    }
                 }
                //OTP isempty check
               
                
                //otpverify api call get success message redirect loginpage
                $scope.otpSubmit =function(otp){
                    
                    if(otp == '')
                    {
                            $scope.error_message = 'Please enter the OTP';
                    }
                    else
                    { 
                       
                        $scope.loader = true;
                      //  var data = $.param({ 'otp': otp,'mobileNo':$scope.userSignUp.userPhone,'ipAddress' :systemip });
                        var data = $.param({ 'otp': otp,'mobileNo':$scope.userSignUp.userPhone,'ipAddress' :systemip,'userId':getcokkies.getUserId() });
                        getAccountService.otpVerify(data).then(
                        		
                            function successCallback(response)
                            {
                                if(response.data.Result == "Success")
                                {
                                    $scope.loader = false;
                                    $scope.error = false;
									$scope.successfullyRegister = true;
									var emailforlogin = $scope.userSignUp.userEmail;
									var pwdforlogin = $scope.userSignUp.userCreds;
									redirecttologin(emailforlogin,pwdforlogin);
                                }
                                else{
                                	$('#email').prop('disabled',false);
                                    $scope.loader = false;
                                    $scope.error = true;
                                 //   $scope.error_message = "Invalid OTP";
                                    $scope.error_message= response.data.Result
                                    $scope.sucess = false;
                                }
                            }
                        );
                    }
                }
                //resend otp to user
                //api hit and check the response
                $scope.resendOtpSubmit = function(){
                        $scope.loader = true;
                        $('input').removeAttr("disabled");
                        var varcountryCode =localStorage.getItem("countrycode");
                        
                        var resendType="sms" ;
                        if(varcountryCode!=null){
                        	if(varcountryCode=="+91")
                        	{
                        		resendType="sms";
                        		$scope.localUser=true;
                        	}
                        	else
                        		{
                        			resendType="email";
                        			$scope.NriUser= true;
                        			
                        		}
                        }
                        var data = $.param({ 'mobileNo':$scope.userSignUp.userPhone.toString(),'emailId':$scope.userSignUp.userEmail.toString(),'type':resendType });
                        getAccountService.resendOtp(data).then(
                            function successCallback(response) {
                            	 $('input').removeAttr("disabled");
                                if(response.data.Result == "Success"){
                                	 $('input').removeAttr("disabled");
                                    $scope.loader = false;
                                    $scope.otp = false;
                                    $scope.sucess = true;
                                    $scope.error = false;
                                    $scope.sucess_message = "OTP has been re-sent.";

                                }
                            }
                        );
                }
                /* Commented as it is no longer used
				$scope.resendMailOtpSubmit = function(){
                	debugger
						$scope.resendOtpSubmit();
                        $scope.loader = true;
                        $('input').removeAttr("disabled");
                        var data = $.param({ 'mobileNo':$scope.userSignUp.userPhone.toString(),'type':"mail" });
                        getAccountService.resendOtp(data).then(
                            function successCallback(response) {
                                $("input").prop("disabled", false);
                                $('input').removeAttr("disabled");
                                if(response.data.Result == "Success"){
                                    $scope.loader = false;
                                    $scope.otp = false;
                                    $scope.sucess = true;
                                    $scope.error = false;
                                    $scope.sucess_message = "OTP sent !! check your mail or phone";
                                }
                            }
                        );
                } */

                $scope.reregister = function(){
                 window.location = "#/register";   

                }
			
			function redirecttologin(email,pwd){
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
                            		                           		                            			 
                            			$scope.loginotp = true; 
                            		   
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
                            var loginresponse = response.data.Message;
							
                            window.location.href = '#/login';
                        }
                        $scope.loader = false;
                    }, function errorCallback(response) {
						alert("error part");
                    	$scope.click = false;
                        $scope.loader = false;
                    	alert("Something went wrong. Please try again later. ");
                    	$scope.click = false;
                        if (response.status == -1) {
                            window.location.href = '#/maintenance';
                        }
						else {
						    window.location.href = '#/login';
                        }
							
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
