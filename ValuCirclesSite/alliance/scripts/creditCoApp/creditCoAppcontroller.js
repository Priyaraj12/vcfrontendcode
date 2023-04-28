var Ps = Ps || {};
var coAppId;
(function() {
    'use strict';

    angular.module('creditCoApp')
        .controller('creditCoAppController', ['$state', '$http', '$scope', 'getcokkies', 'config', '$rootScope', 'dropDown', 'vJson', 'financialService', 'regex', '$location','$anchorScroll',
            function($state, $http, $scope, getcokkies, config, $rootScope, dropDown, vJson, financialService, regex , $location,$anchorScroll) {
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
        	$scope.loader1=true;
        	angular.element(document).ready(function () {
           	 $('#selector12').addClass('active');
       		var creditCoNav = parseInt(localStorage.getItem('PAGE_COMPLETED')); 
               $rootScope.PAGE_COMPLETED = creditCoNav;
               $scope.PAGE_COMPLETED = creditCoNav;
			   
             $rootScope.username = localStorage.getItem("user_name");  
       		 $scope.usercreditscore.coappMobno = localStorage.getItem("MobileNo");
			 $rootScope.coApplicantDetails = localStorage.getItem("coApplicantDetails");
			 $rootScope.coAppFirstName = JSON.parse($rootScope.coApplicantDetails)[0].firstName;
       		 
       //	 
       		 $('#mobileCheck').val($scope.usercreditscore.coappMobno);
       		 
       		 $('#mailCheck').val($scope.usercreditscore.coappEmail);
       		 var refreshes = parseInt(sessionStorage.getItem('refreshes'), 10) || 0;
                	 sessionStorage.setItem('refreshes', ++refreshes);
                	if(refreshes == 1){
                    location.reload();
                	}else{
                		sessionStorage.removeItem('refreshes');
                	}
               });
        	 financialService.getCoApplicantId().then(function successCallback(response) {
             	localStorage.setItem("mint", 600000);
            	$rootScope.SessionTime = 600000;
            	$scope.result = JSON.parse(response.data.result)['#result-set-1'];
            	
                var coappliID = $scope.result[0].userid;
                document.cookie = "coAppId="+coappliID;
                var  data = $.param({ 'listOfUserId': JSON.stringify($scope.result)});
                    financialService.getCoApplicantDetailsUsingListOfUserId(data).then(
                    function successCallback(coApplicantsresponse) {
                    	localStorage.setItem("mint", 600000);
                    	$rootScope.SessionTime = 600000;
                        $scope.coApplicants = JSON.parse(coApplicantsresponse.data.Result);
                        localStorage.setItem("coApplicantDetails",coApplicantsresponse.data.Result);
                    }
                );
            });
        	 $('#selector12').addClass('active');
        	var coAppId = getCookie("coAppId");
        	 document.cookie = "coAppId="+coAppId;
        	 var data1 = $.param({
        		 'userId': parseInt(coAppId)
        	 })
        	 
        	 financialService.getCreditScoreValue(data1).then(function successCallback(response) {
        		 localStorage.setItem("mint", 600000);
        		 $rootScope.SessionTime = 600000;
        		 $scope.loader = true;
        		  var t = JSON.parse(response.data.userInfo);
        		  
                  $scope.loader = false;
                  if(t.length>0) {
                /*	  $(".hidecreditbtn").hide();
                	  $('#lastName').attr('disabled','disabled');
                	  $("select,input").attr("disabled","disabled");
                	  */
                
                      var mycreditScore=t[0].mycreditScore;
                	  	if (mycreditScore >=	 0) {
							$(".hidecreditbtn") .hide();	
							$('#lastName').attr( 'disabled', 'disabled');
							$("select,input").attr( "disabled", "disabled");
							}
														if (mycreditScore == 0
														) {
															$scope.creditScoreValue = "0";
															$scope.creditScore_message = "No credit history found.";
														} else if (mycreditScore > 0
																&& mycreditScore < 300) {
															$scope.creditScoreValue = "1-299";
															$scope.creditScore_message = "Credit report not scored by credit bureau.";
														} else if (mycreditScore >= 300
																&& mycreditScore < 600) {
															$scope.creditScoreValue = "300-599";
															$scope.creditScore_message = "Your Credit Score range is 300-599.";
														} else if (mycreditScore >= 600
																&& mycreditScore < 750) {
															$scope.creditScoreValue = "600-749";
															$scope.creditScore_message = "Your Credit Score range is 600-749.";
														} else if (mycreditScore >= 750
																&& mycreditScore <= 900) {
															$scope.creditScoreValue = "750-900";
															$scope.creditScore_message = "Your Credit Score range is 750-900.";
														} else if (mycreditScore = -99) {
															$scope.creditScoreValue = "-99";
															$scope.creditScore_message = "";
														}
                      
                  $scope.disableScore = true;  
              }
                  if(t){
                	  
                      checkCreditDetails(t);
                      }else{
                      }
              }); 
        	 
        	$scope.next = function(){
        		$state.go('index.lpi');
        	}
        	$scope.skip = function(){
        		
        		$state.go('index.lpi');
        	}
        	   $scope.nextPge = function() {
        		     
					var check = $scope.Personalform.$dirty; 
					if ($scope.Personalform.$dirty)  {
						var r = confirm("Current page has unsaved data. Are you sure you want to proceed?");
						if (r == true) {
							$state.go('index.lpi');
						}
						$scope.error_message = "Highlighted Field values have been modified";
						$('input.ng-dirty').addClass(
								'redcolorinput');
						$('select.ng-dirty').addClass(
								'redcolorinput');
						$scope.sucess = false;
						
					} else {
						$state.go('index.lpi');
					}
				}
        	   /* 04/08/2019: Geetha -Adding code for 'Save & Next' functionality */
			
				/*End of code changes*/
        	$scope.back = function(){
        		$state.go('index.credit');
        	}
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
        	
        	 $scope.name = [
                            { "id": 1, "name": "PAN", "o_name": "PAN","value":"object:6" },
                            { "id": 2, "name": "Voter ID", "o_name": "voterId","value":"object:7"  },
                            { "id": 3, "name": "Passport", "o_name": "passport" ,"value":"object:8"}, 
                           ];
             $scope.names = [
                             { "id": 1, "name": "Father Name", "o_name": "fatherName","value":"object:9"  }, 
                             { "id": 2, "name": "Spouse Name", "o_name": "spouseName","value":"object:10" }
                            ];
             
             /*show the selected id field*/
             $scope.fields_name_id = {
                 "PAN": true,
                 "voterId": false,
                 "passport": false
             }
             $scope.selected_field_id = function(data) {
                 $scope.usercreditscore.myvoterId ="";
             	$scope.usercreditscore.myPAN = "";
             	$scope.usercreditscore.mypassport = "";
                 for (var name in $scope.fields_name_id) {
                     if (name == data.o_name) {
                         $scope.fields_name_id[name] = true;
                     } else {
                         $scope.fields_name_id[name] = false;
                     }
                 }
             }
             /*show the selected name field*/
             $scope.fields_name = {
                 "fatherName": true,
                 "spouseName": false
             }
             $scope.selected_field_name = function(data) {
            	 $scope.usercreditscore.myfatherfirstname = "";
             	$scope.usercreditscore.myfatherlastname = "";
             	$scope.usercreditscore.mySpousefirstname = "";
             	$scope.usercreditscore.mySpouselastname = "";
                 for (var name in $scope.fields_name) {
                     if (name == data.o_name) {
                         $scope.fields_name[name] = true;
                     } else {
                         $scope.fields_name[name] = false;
                     }
                 }
             }
         
             $scope.req_fn = false;
             $scope.req_ls = false;
             $scope.req_ln = false;
             $scope.req_fln = false;
             $scope.req_nn = false;
             $scope.req_sn = false;
             $scope.req_mb = false;
             $scope.req_ml = false;
             $scope.count =1;
             
             
             
             
             /* save the user data function */
             $scope.credit_save = function(userInfo) {
            	 
             	$rootScope.coApplicantDetails = localStorage.getItem("coApplicantDetails");
               	
            
             	 coAppId = JSON.parse($rootScope.coApplicantDetails)[0].userId;
             	
                 var sPageURL = window.location.href;
                 var sURLVariables = sPageURL.split('=');
                 if($scope.count<=1){
                     $scope.loader = true;
                 }else{
                     $scope.loader = false;
                 }
                 $scope.error = false;
                 if ($scope.error) {
                 }
                 
                 if($scope.usercreditscore.coappMobno){
                	 
                	  $('#mobile').removeAttr('style');
                      $scope.req_mb = false;
                  } else {
                	  
                      $('#mobile').css('border', '2px solid red');
                      $scope.req_mb = true;
                      $scope.error = true;
                      $scope.error_message = "All the three fields are Mandatory";
                      $scope.loader = false;
                  }
                 if($scope.usercreditscore.coappEmail){
                	 
               	  $('#mailCheck').removeAttr('style');
                     $scope.req_ml = false;
                 } else {
                	 
                     $('#mailCheck').css('border', '2px solid red');
                     $scope.req_ml = true;
                     $scope.error = true;
                     $scope.error_message = "All the three fields are Mandatory";
                     $scope.loader = false;
                 }
                /* if ($scope.usercreditscore.myaadharCard) {
                     $('#firstName').removeAttr('style');
                     $scope.req_fn = false;
                 } else {
                	 
                     $('#firstName').css('border', '2px solid red');
                     $scope.req_fn = true;
                     $scope.error = true;
                     $scope.error_message = "All the three fields are Mandatory";
                     $scope.loader = false;
                 } */
                  
                 if ($scope.selectedName) {
                     $('#select1').removeAttr('style');
                     $scope.req_nn = false;
                 } else if($("#select1").val() == "")
					{
                     $('#select1').css('border', '2px solid red');
                     $scope.req_nn = true;
                     $scope.error = true;

                  //   $scope.error_message = "Kindly Select Anyone  ";
                     $scope.loader = false;
                 }
                 if ($scope.usercreditscore.myPAN || $scope.usercreditscore.myvoterId || $scope.usercreditscore.mypassport || $scope.usercreditscore.myrationCard || $scope.usercreditscore.myDL || $scope.usercreditscore.myUID) {
                     $('#lastName').removeAttr('style');
                     $scope.req_ls = false;
                 } else {
                     $('#lastName').css('border', '2px solid red');
                     $scope.req_ls = true;
                     $scope.error = true;
                     $scope.error_message = "All the three fields are Mandatory";
                     $scope.loader = false;
                 }
                 if ($scope.usercreditscore.myfatherfirstname || $scope.usercreditscore.mySpousefirstname) {
                     $('#fName').removeAttr('style');
                     $scope.req_ln = false;
                 } else {
                     $('#fName').css('border', '2px solid red');
                     $scope.req_ln = true;
                     $scope.error = true;
                     $scope.error_message = "All the three fields are Mandatory";
                     $scope.loader = false;
                 }
                 if ($scope.selectnm) {
                     $('#select2').removeAttr('style');
                     $scope.req_sn = false;
                 } else if($("#select2").val() == "")
					{
                     $('#select2').css('border', '2px solid red');
                     $scope.req_sn = true;
                     $scope.error = true;

               //      $scope.error_message = "Kindly Select Anyone ";
                     $scope.loader = false;
                 }
                 if ($scope.usercreditscore.myfatherlastname || $scope.usercreditscore.mySpouselastname) {
                     $('#lName').removeAttr('style');
                     $scope.req_fln = false;
                 } else {
                     $('#lName').css('border', '2px solid red');
                     $scope.req_fln = true;
                     $scope.error = true;
                     $scope.error_message = "All the three fields are Mandatory";
                     $scope.loader = false;
                 }
                 
                 if($scope.req_fn == true
                	
							|| $scope.req_ls == true
							|| $scope.req_ln == true
							|| $scope.req_fln == true
							|| $scope.req_nn == true
							|| $scope.req_sn == true
							|| $scope.req_mb == true
							|| $scope.req_ml == true
							)
					{
                	 
						$scope.req_chk=false;
						$scope.error = true;
						$scope.error_message = "All the fields are mandatory";
						$scope.loader = false;
					}
                // 
               
                if ($scope.req_fn == false && $scope.req_ls == false && $scope.req_ln == false && $scope.req_fln == false && $scope.req_nn == false  && $scope.req_sn == false
                		&& $scope.req_mb == false && $scope.req_ml == false	) 
                {
                	
                	if ($scope.accept == undefined || $scope.accept == false){
                		   $('#check').css('outline-color', 'red');
                		   $('#check').css('outline-style', 'solid');
                		   $('#check').css('outline-width', '2px');
                		$scope.error = true;
						$scope.error_message = "Please select the checkbox";
						$scope.loader = false;
					}
                else {
                	$('#check').removeAttr('style');
                 var userData = localStorage.getItem("UserInfo");
                 userData = JSON.parse(userData);
                 var dob = (userData.dateofBirth).split("/");
                 userData.dateofBirth = dob[1] + "-" + dob[0] + "-" + dob[2];                        
                 var questionData = "" ;    
                 questionData = (($scope.questionData != "" || $scope.questionData != undefined) ? $scope.questionData : ""); 
                 var userAns = "" ;                   
                 userAns = (($scope.userAns != "" || $scope.userAns != undefined) ? $scope.userAns : "");
                  if(questionData == undefined) {
                     questionData = "";
                 }
                 if(userAns == undefined) {
                     userAns = "";
                 }
                 var userId = 0;
                 if($location.search().id != undefined) {
                     userId = $location.search().id
                 }
                 
                 var coApplicantData = JSON.parse($rootScope.coApplicantDetails);
                 if(coApplicantData != null) {
                     var dob = (coApplicantData[0].dateofBirth).split("/");                        
                     coApplicantData[0].dateofBirth = dob[1] + "-" + dob[0] + "-" + dob[2]; 
                 }
               if (sURLVariables)  {
                     var Data = {
                     "myuserId":  parseInt(coAppId),
                     "myaadharCard": "",
                     "myPAN": (userInfo.myPAN == undefined || userInfo.myPAN == null ? "" : userInfo.myPAN),
                     "myfatherFirstName": (userInfo.myfatherfirstname == undefined || userInfo.myfatherfirstname == null ? "" : userInfo.myfatherfirstname),
                     "myspouseFirstName": (userInfo.mySpousefirstname == undefined || userInfo.mySpousefirstname == null ? "" : userInfo.mySpousefirstname),
                     "myfatherLastName": (userInfo.myfatherlastname == undefined || userInfo.myfatherlastname == null ? "" : userInfo.myfatherlastname),
                     "myspouseLastName": (userInfo.mySpouselastname == undefined || userInfo.mySpouselastname == null ? "" : userInfo.mySpouselastname),
                     "myvoterId": (userInfo.myvoterId == undefined || userInfo.myvoterId == null ? "" : userInfo.myvoterId),
                     "mypassport": (userInfo.mypassport == undefined || userInfo.mypassport == null ? "" : userInfo.mypassport),
                     "myotherIdName1": (userInfo.myotherIdName1 == undefined || userInfo.myotherIdName1 == null ? "" : userInfo.myotherIdName1),
                     "myotherIDName2": (userInfo.myotherIDName2 == undefined || userInfo.myotherIDName2 == null ? "" : userInfo.myotherIDName2),
                     "otherIdValue1": (userInfo.otherIdValue1 == undefined || userInfo.otherIdValue1 == null ? "" : userInfo.otherIdValue1),
                     "myotherIdValue2": (userInfo.myotherIdValue2 == undefined || userInfo.myotherIdValue2 == null ? "" : userInfo.myotherIdValue2),
                     "myactiveStatus": 1,
                     "userMail": (userInfo.coappEmail == undefined || userInfo.coappEmail == null ? "" : userInfo.coappEmail),
                     "userFirstName": coApplicantData[0].firstName,
                     "userLastName": coApplicantData[0].lastName,
                     "userDOB": coApplicantData[0].dateofBirth,
                     "gender": coApplicantData[0].gender,
                     "mobiNo": (userInfo.coappMobno == undefined || userInfo.coappMobno == null ? "" : userInfo.coappMobno),
                     "address": coApplicantData[0].address1 + "," + coApplicantData[0].address2,
                     "village": coApplicantData[0].city,
                     "city": coApplicantData[0].city,
                     "state": coApplicantData[0].state,
                     "pin": coApplicantData[0].postalZip,
                     "country": coApplicantData[0].country                
                      
                 };
                 }
                 else {                       
                     $scope.error = true;
                     $scope.success = false;
                     $scope.error_message = "All the fields are Mandatory";
                     $scope.loader = false;
                 }
                 /*test for the binding data*/
               $scope.gotoBottom();
                  
                 $scope.quesloader = true;
                 $scope.count +=$scope.count;       
                 var userId  = parseInt(coAppId);
				financialService.insertUserDetailsForCreditScore(Data,questionData,userAns,userId).then(
                     function successCallback(response) {
                    	 localStorage.setItem("mint", 600000);
                    	 $rootScope.SessionTime = 600000;
                         var check = JSON.stringify(response.data);
                         if(check != "{}"){
                             if (response.data.Result == 'Success') {
                                 $('#myquestion').modal('hide');
                         		 
                                 $scope.success = true;
								 $scope.success_message = "Your report is succesfully Generated";
                                 $scope.hideButton = true;
                                 $(".hidecreditbtn,.acptheck,#select1,#select2").attr('disabled','disabled');
                                 $('input').css('background','#eee');
                                 $scope.coappMobnoisDisabled = true;
 								$scope.coappEmailisDisabled = true;
 								$scope.firstNameisDisabled = true;
 								$scope.lastNameisDisabled = true;
 								$scope.fNameisDisabled = true;
 								$scope.lNameisDisabled = true;
                                 if(response.data.creditScore==0 ) {
                                 $scope.creditScore_message = "No credit history found.";
                                 } else if (response.data.creditScore>0 && response.data.creditScore < 300 ) {
                                 $scope.creditScore_message = "Credit report not scored by credit bureau.";
                                 } else if (response.data.creditScore>=300 && response.data.creditScore < 600 ) {
                                 $scope.creditScore_message = "Your Credit Score range is 300-599.";
                                 } else if (response.data.creditScore>=600 && response.data.creditScore < 750 ) {
                                 $scope.creditScore_message = "Your Credit Score range is 600-749";
                                 } else if (response.data.creditScore>=750 && response.data.creditScore <= 900 ) {
                                 $scope.creditScore_message = "Your Credit Score range is 750-900";
                             	} else if (response.data.creditScore = -99) {
									$scope.creditScoreValue = "-99";
									$scope.creditScore_message = "Credit Report not retrieved. Please check details and try again.";
								}
                                
                                 $scope.error = false;
                                 $scope.Personalform.$setPristine(true);
                                 $scope.loader = false;
                                 $scope.count =1;
                             } else if(response.data.Result == 'question') {
                                 $scope.loader = false;
                                 $scope.quesloader = false;
								 $('#myquestion').modal('show');           
                                 $scope.questionData = response.data.questions;
                                 questionData = ($scope.questionData).split("|");
                                 $scope.ansType = questionData[5];
                                 $scope.question = questionData[3];
                                 var ans = questionData[4].split("~");
                                 $scope.ans = ans;                    
                                                 
                             } else {
                            	 
                                 $scope.count =1;
                                 $scope.quesloader = false;
                                 $('#myquestion').modal('hide');                              
                                 $scope.success = false;
                                 $scope.error = true; 
                                 $scope.error_message = response.data.Result;
								 $scope.creditScore_message = "Credit Report not retrieved. Please check details and try again.";
								
								$scope.questionData = ""
								$scope.userAns = ""
				                
                              /*   $("#savebtnn").hide();
								$("#savebttn").hide();
								$(".hidecreditbtn,.acptheck,#select1,#select2").attr('disabled','disabled');
								$('input').css('background','#eee');
								$scope.coappMobnoisDisabled = true;
								$scope.coappEmailisDisabled = true;
								$scope.firstNameisDisabled = true;
								$scope.lastNameisDisabled = true;
								$scope.fNameisDisabled = true;
								$scope.lNameisDisabled = true; */
                                $scope.Personalform.$setPristine(true);
                                $scope.loader = false;
								 
                             }
                         }else{
                        	 
                             $scope.count =1;
                             $scope.quesloader = false;  
                             $('#myquestion').modal('hide');     
                             $scope.success = false;
                             $scope.error = true; 
							 $scope.error_message = "Unable to generate credit report";
							 $scope.questionData = ""
							 $scope.userAns = ""
                     /*        $("#savebtnn").hide();
							$("#savebttn").hide();
							$(".hidecreditbtn,.acptheck,#select1,#select2").attr('disabled','disabled');
							$('input').css('background','#eee');
							$scope.coappMobnoisDisabled = true;
							$scope.coappEmailisDisabled = true;
							$scope.firstNameisDisabled = true;
							$scope.lastNameisDisabled = true;
							$scope.fNameisDisabled = true;
							$scope.lNameisDisabled = true;*/
                           	$scope.creditScore_message = "Credit Report not retrieved. Please check details and try again.";
							$scope.Personalform.$setPristine(true);
                            $scope.loader = false;
                         }
                     },function errorCallback(response) {
                    	     $scope.count =1;
                             $scope.quesloader = false;  
                             $('#myquestion').modal('hide');     
                             $scope.success = false;
                             $scope.error = true; 
							 $scope.questionData = ""
							 $scope.userAns = ""
							 $scope.error_message = "Unable to generate credit report";
                             $scope.creditScore_message = "Credit Report not retrieved. Please check details and try again.";
                        /*     $("#savebtnn").hide();
							 $("#savebttn").hide();
							 $(".hidecreditbtn,.acptheck,#select1,#select2").attr('disabled','disabled');
							 $('input').css('background','#eee');
							 $scope.coappMobnoisDisabled = true;
							 $scope.coappEmailisDisabled = true;
							 $scope.firstNameisDisabled = true;
							 $scope.lastNameisDisabled = true;
							 $scope.fNameisDisabled = true;
							 $scope.lNameisDisabled = true;*/
                             $scope.Personalform.$setPristine(true);
                             $scope.loader = false;
                     }
                 );
                }
                 } else {

                 }
             }
             
             /*set the selected value*/
             $scope.selectedAns = function(data){
                 $scope.userAns =  data.trim();
             }    
             
             
             function checkCreditDetails(creditDetails){
            	 
            	 $scope.loader1=false;
             	var creditDetails = creditDetails[0];
             	var mycreditScore =creditDetails.mycreditScore;
             if(creditDetails){
             	var dataObj={};
             	if(creditDetails.mobiNo != undefined && creditDetails.mobiNo != ""){
					$scope.usercreditscore.coappMobno = creditDetails.mobiNo;
					if (mycreditScore >= 0) {
					$scope.coappMobnoisDisabled = true;
					$('#savebtnn').hide();
					$('#savebttn').hide();
					}
				}
             	
             	if(creditDetails.userMail != undefined && creditDetails.userMail != ""){
					$scope.usercreditscore.coappEmail = creditDetails.userMail;
					if (mycreditScore >= 0) {
					$scope.coappEmailisDisabled = true;
					$('#savebtnn').hide();
					$('#savebttn').hide();
					}
				}
             	
             	/* if(creditDetails.myaadharCard != undefined && creditDetails.myaadharCard != ""){
					$scope.usercreditscore.myaadharCard = creditDetails.myaadharCard;
					if (mycreditScore >= 0) {
					$scope.firstNameisDisabled = true;
					$('#savebtnn').hide();
					$('#savebttn').hide();
					}
				} */
				if(creditDetails.myPAN != undefined && creditDetails.myPAN != ""){
					
					$("#select1").val("object:6");
					dataObj.o_name="PAN";
					$scope.selected_field_id(dataObj);
					$scope.usercreditscore.myPAN = creditDetails.myPAN;
					if (mycreditScore >= 0) {
					$("#select1").attr('disabled','disabled');
					$scope.lastNameisDisabled = true;
					}
				}
				if(creditDetails.myvoterId != undefined && creditDetails.myvoterId != "" ){
				
					$("#select1").val("object:7");
					dataObj.o_name="voterId";
					$scope.selected_field_id(dataObj);
					$scope.usercreditscore.myvoterId = creditDetails.myvoterId;
					if (mycreditScore >= 0) {
					$("#select1").attr('disabled','disabled');
					$scope.lastNameisDisabled = true;
					}
				}
				if(creditDetails.mypassport != undefined && creditDetails.mypassport != "" ){
					$("#select1").val("object:8");
					dataObj.o_name="passport";
					$scope.selected_field_id(dataObj);
					$scope.usercreditscore.mypassport = creditDetails.mypassport;
					if (mycreditScore >= 0) {
					$("#select1").attr('disabled','disabled');
					$scope.lastNameisDisabled = true;
					}
				}
				if(creditDetails.myfatherFirstName !=undefined && creditDetails.myfatherFirstName !="" ){
					$("#select2").val("object:9");
					dataObj.o_name="fatherName";
					$scope.usercreditscore.myfatherfirstname = creditDetails.myfatherFirstName;
					$scope.usercreditscore.myfatherlastname = creditDetails.myfatherLastName;
					if (mycreditScore >= 0) {
					$("#select2").attr('disabled','disabled');
					$scope.fNameisDisabled = true;
					$scope.lNameisDisabled = true;
					}
				}
				
				if(creditDetails.myspouseFirstName !=undefined && creditDetails.myspouseFirstName != ""){
					$("#select2").val("object:10");
					dataObj.o_name="spouseName";
					$scope.selected_field_name(dataObj);
					$scope.usercreditscore.mySpousefirstname = creditDetails.myspouseFirstName ;
					$scope.usercreditscore.mySpouselastname = creditDetails.myspouseLastName;
					if (mycreditScore >= 0) {
					$("#select2").attr('disabled','disabled');
					$scope.lNameisDisabled = true;
					$scope.fNameisDisabled = true;
					}
				}
				
             				
             }else{
             	
             }
             }  
             $scope.gotoBottom = function() {
                 // set the location.hash to the id of
                 // the element you wish to scroll to.
                 $location.hash('bottom');
                 // call $anchorScroll()
                 $anchorScroll();
               };
             
        }
        ]);
})();