// eslint-disable-next-line
var Ps = Ps || {};

(function() {
    'use strict';

    angular.module('coApplicant')
        .controller('coApplicantController', ['$state', '$http', '$scope', 'getcokkies', 'config', 'calculateAge', '$rootScope', '$timeout','dropDown','getCoApplicantService',
            function($state, $http, $scope, getcokkies, config, calculateAge, $rootScope, $timeout,dropDown,getCoApplicantService) {
        	var zipIdd;
                dropDown.updateFinancialDropdown();
				
				$scope.family =[];
                $scope.help = true;
                $rootScope.username = localStorage.getItem("user_name");
                $rootScope.assetShow = parseInt(localStorage.getItem("assetShow"));
                $rootScope.coApplicant = parseInt(localStorage.getItem("coApplicant"));
                $rootScope.coApplicantslength = parseInt(localStorage.getItem("coApplicantslength"));
                $scope.omitData = [];
                $scope.loader = true;
                
                var coAPPNav=parseInt(localStorage.getItem('PAGE_COMPLETED'));
                $rootScope.PAGE_COMPLETED = coAPPNav;
                $scope.PAGE_COMPLETED = coAPPNav;
				if(coAPPNav >= 3){
					$('.coAPPNav').css('pointer-events', 'all');				
				}
				else{
					$('.coAPPNav').css('pointer-events', 'none');
				}
                
                $scope.coApplicants = [];
                if($rootScope.coApplicantslength==0){
                	 getCoApplicantValue();
                }else{
                	 setDropdownValue();
                }
                angular.element(document).ready(function () {
                  $('#selector3').trigger('click');
                  $(selector).removeClass('active');
                  $('#selector1').addClass('active');
                  
                  
                  var marStatus =$rootScope.maritalStatusId;
                 var userInfo2=localStorage.getItem("UserInfo");
                  var ss=JSON.parse(userInfo2);
                  var maritalStatusIdLocal=ss.maritalStatusId;

				  
				$scope.countries = 
								[ 
											{ name: 'India', id: 0 },
											{ name: 'Australia', id: 1 },
											{ name: 'Bahrain', id: 17 },
											{ name: 'Canada', id: 2 },
											{ name: 'Hong Kong', id: 3 },
											{ name: 'Indonesia', id: 20 },
											{ name: 'Kuwait', id: 4},
											{ name: 'Malaysia', id: 5 },
											{ name: 'Mexico', id: 6 },
											{ name: 'New Zealand', id: 7 },
											{ name: 'Oman', id: 8 },
											{ name: 'Philippines', id: 9 },
											{ name: 'Qatar', id: 10 },
											{ name: 'Singapore', id: 11 },
											{ name: 'Saudi Arabia', id: 18 },
											{ name: 'South Africa', id: 12 },
											{ name: 'Thailand', id: 13 },
											{ name: 'UAE', id: 14 },
											{ name: 'UK', id: 15 },
											{ name: 'USA', id: 16 },
											{ name: 'Vietnam', id: 19 },
											{ name: 'Others', id: 21 }
								]
								$scope.residentStatuses = 
								[ 
								{'id' : 0,'name' : "Resident Indian"},
								{'id' : 1,'name' : "NRI (Non-Resident Indian)"},
								{'id' : 2,'name' : "OCI (Overseas Citizen of India)"}
								]
								
								if ($scope.userInfo.country == null ||$scope.userInfo.country == ""||$scope.userInfo.country == undefined ) 
								{
									$scope.userInfo.country = $scope.countries[0].name;
									
								}
								
								if ($scope.userInfo.address3 == null ||$scope.userInfo.address3 == ""||$scope.userInfo.address3 == undefined ) {
									$scope.userInfo.address3 = $scope.residentStatuses[0].name;
									
								}
  				if(maritalStatusIdLocal==2){
  					$scope.family.push({"relationshipID": 7, "activeStatus": 1, "relationship": "Spouse"},
  				    {"relationshipID": 1, "activeStatus": 1, "relationship": "Father", "$$hashKey": "object:15"},
  					{"relationshipID": 2, "activeStatus": 1, "relationship": "Mother", "$$hashKey": "object:16"},
  					{"relationshipID": 3, "activeStatus": 1, "relationship": "Son", "$$hashKey": "object:17"},
  					{"relationshipID": 4, "activeStatus": 1, "relationship": "Daughter"," $$hashKey": "object:18"},
  					{"relationshipID": 5, "activeStatus": 1, "relationship": "Brother", "$$hashKey": "object:19"},
  					{"relationshipID": 6, "activeStatus": 1, "relationship": "Sister", "$$hashKey": "object:20"}
  					);
  				   $scope.familys = JSON.parse(localStorage.getItem('relationShip'));
              		$('#Relationship').val('number:7');
              		$('#Relationship').prop("disabled", true);
              		$("#Relationship option[value='number:7']").show();
              		
              	}
              	else if(maritalStatusIdLocal==1){
              		$('select #Relationship').prop("disabled", false);
              		$("#Relationship option[value='number:7']").hide();
              		$scope.family.push(
          				    {"relationshipID": 1, "activeStatus": 1, "relationship": "Father", "$$hashKey": "object:15"},
          					{"relationshipID": 2, "activeStatus": 1, "relationship": "Mother", "$$hashKey": "object:16"},
          					{"relationshipID": 3, "activeStatus": 1, "relationship": "Son", "$$hashKey": "object:17"},
          					{"relationshipID": 4, "activeStatus": 1, "relationship": "Daughter"," $$hashKey": "object:18"},
          					{"relationshipID": 5, "activeStatus": 1, "relationship": "Brother", "$$hashKey": "object:19"},
          					{"relationshipID": 6, "activeStatus": 1, "relationship": "Sister", "$$hashKey": "object:20"}
          					);
              	   $scope.familys = JSON.parse(localStorage.getItem('relationShip'));
              	}
              	else if(maritalStatusIdLocal==3){
              		$('#Relationship').prop("disabled", false);
              		$("#Relationship option[value='number:7']").hide();
              		$scope.family.push(
          				    {"relationshipID": 1, "activeStatus": 1, "relationship": "Father", "$$hashKey": "object:15"},
          					{"relationshipID": 2, "activeStatus": 1, "relationship": "Mother", "$$hashKey": "object:16"},
          					{"relationshipID": 3, "activeStatus": 1, "relationship": "Son", "$$hashKey": "object:17"},
          					{"relationshipID": 4, "activeStatus": 1, "relationship": "Daughter"," $$hashKey": "object:18"},
          					{"relationshipID": 5, "activeStatus": 1, "relationship": "Brother", "$$hashKey": "object:19"},
          					{"relationshipID": 6, "activeStatus": 1, "relationship": "Sister", "$$hashKey": "object:20"}
          					);
              	   $scope.familys = JSON.parse(localStorage.getItem('relationShip'));
              	}
              	else if(maritalStatusIdLocal==13){
              		$('#Relationship').prop("disabled", false);
              		$("#Relationship option[value='number:7']").hide();
              		$scope.family.push(
          				    {"relationshipID": 1, "activeStatus": 1, "relationship": "Father", "$$hashKey": "object:15"},
          					{"relationshipID": 2, "activeStatus": 1, "relationship": "Mother", "$$hashKey": "object:16"},
          					{"relationshipID": 3, "activeStatus": 1, "relationship": "Son", "$$hashKey": "object:17"},
          					{"relationshipID": 4, "activeStatus": 1, "relationship": "Daughter"," $$hashKey": "object:18"},
          					{"relationshipID": 5, "activeStatus": 1, "relationship": "Brother", "$$hashKey": "object:19"},
          					{"relationshipID": 6, "activeStatus": 1, "relationship": "Sister", "$$hashKey": "object:20"}
          					);
              	   $scope.familys = JSON.parse(localStorage.getItem('relationShip'));
              	}
              	else if(maritalStatusIdLocal==14){
              		$('#Relationship').prop("disabled", false);
              		$("#Relationship option[value='number:7']").hide();
              		$scope.family.push(
          				    {"relationshipID": 1, "activeStatus": 1, "relationship": "Father", "$$hashKey": "object:15"},
          					{"relationshipID": 2, "activeStatus": 1, "relationship": "Mother", "$$hashKey": "object:16"},
          					{"relationshipID": 3, "activeStatus": 1, "relationship": "Son", "$$hashKey": "object:17"},
          					{"relationshipID": 4, "activeStatus": 1, "relationship": "Daughter"," $$hashKey": "object:18"},
          					{"relationshipID": 5, "activeStatus": 1, "relationship": "Brother", "$$hashKey": "object:19"},
          					{"relationshipID": 6, "activeStatus": 1, "relationship": "Sister", "$$hashKey": "object:20"}
          					);
              	   $scope.familys = JSON.parse(localStorage.getItem('relationShip'));
              	}
              	else{
              		$scope.family.push(
          				    {"relationshipID": 1, "activeStatus": 1, "relationship": "Father", "$$hashKey": "object:15"},
          					{"relationshipID": 2, "activeStatus": 1, "relationship": "Mother", "$$hashKey": "object:16"},
          					{"relationshipID": 3, "activeStatus": 1, "relationship": "Son", "$$hashKey": "object:17"},
          					{"relationshipID": 4, "activeStatus": 1, "relationship": "Daughter"," $$hashKey": "object:18"},
          					{"relationshipID": 5, "activeStatus": 1, "relationship": "Brother", "$$hashKey": "object:19"},
          					{"relationshipID": 6, "activeStatus": 1, "relationship": "Sister", "$$hashKey": "object:20"}
          					);
              	   $scope.familys = JSON.parse(localStorage.getItem('relationShip'));
              	}
                 });
                
                $scope.reset = function() {
                    $scope.loader = true;
                    setDropdownValue();
                    $scope.loader = false;
                    $scope.success = true;
                    $scope.error = false;
                    $scope.coApplicantform.$setPristine(true);
                    $scope.true_reset = false;
                    $scope.success_message = "Your changes have been Succesfully Reset";
                };
                $scope.add = function() {
                    $scope.personalData = {
                        "userInfoId":"0",
                        "updatedBy": "",
                        "updatedOn": "",
                        "address1": "",
                        "address2": "",
                        "address3": $scope.residentStatuses[0].name,
                        "city": "",
                        "dateofBirth": "",
                        "firstName": "",
                        "lastName": "",
                        "state": "",
                        "createdBy": "",
                        "createdOn": "",
                        "country": $scope.countries[0].name,
                        "genderId": "",
                        "refAgeId": "",
                        "maritalStatusId": "",
                        "educationId": "",
                        "refResidenceCategoryId": "",
                        "relationshipId": "",
                        "education": "",
                        "gender": "",
                        "maritalStatus": "",
                        "residenceCategory": "",
                        "educationDetail": "",
                        "zipId": "0",
                        "age": "",
                        "userId":""
                    };
                    $scope.coApplicants.push($scope.personalData);
                    $scope.true_reset = true;
                };
                $scope.save = function() {
					$('select.ng-dirty').removeClass('redcolorinput');
                    $('input.ng-dirty').removeClass('redcolorinput');
                    if (!$scope.coApplicantform.$valid) {
                        $scope.error = true;
                        $scope.error_message = "Kindly fill all the mandatory fields correctly";
                        $('input.ng-invalid').addClass('redcolorinput');
                        $('select.ng-invalid').addClass('redcolorinput');
                        $scope.success = false;
                    }else if($scope.coApplicants.length < parseInt(localStorage.getItem('coApplicantslength'))){
                        $scope.error = true;
                        $scope.error_message = "you have removed some coApplicants";
                        $scope.true_reset = true;
                        $scope.success = false;
                        $scope.help = true;
                 /*   } else if($scope.errorAge.length > 0){
                        angular.forEach($scope.errorAge, function(value, key) {
                           $('#coApplicantage' + value).addClass('redcolorinput');
                        });
                        $scope.error = true;
                        $scope.error_message="Age should be between 21 to 64";
                        $scope.help = false; */
				 }
                    else if ($scope.coApplicants[0].city == "" || $scope.coApplicants[0].city == null || $scope.coApplicants[0].city == undefined ) {
                    	$('#City0').css('border','2px solid red');
                    	 $scope.error = true;
                         $scope.error_message="Please select anyone Location/Area";
                         $scope.help = false;
                    }
                    else {
						$scope.coApplicants[0].refAgeId = $scope.coApplicants[0].age // dirty fix trial for ref age id bug
                        $scope.loader = true;
                        var data = $.param({
                                'sessionId': parseInt(getcokkies.getsessionId()),
                                'mulUserCoAppDetails': JSON.stringify($scope.coApplicants, function(key, val) {
                                    if (key == '$$hashKey') {
                                        return undefined;
                                    }
                                    if (key == 'citys') {
                                        return undefined;
                                    }
                                    if (key == 'educationDetails_show') {
                                        return undefined;
                                    }
                                    if (key == 'educationInstitutions_show') {
                                        return undefined;
                                    }
                                    if(key == 'person_maritalStatus')
                                    {
                                        return undefined;
                                    }
                                     if(key == 'opened')
                                    {
                                        return undefined;
                                    }
                                    return val;
                                }),
                                'userId': parseInt(getcokkies.getUserId())
                            });
                        getCoApplicantService.insertMultipleUserCoApplicantwithLogin(data).then(function successCallback(response) {
                        	localStorage.setItem("mint", 600000);
                        	$rootScope.SessionTime = 600000;
             				if(response.data.Page >= 3){
             					$('.coAPPNav').css('pointer-events', 'all');
             					localStorage.setItem('PAGE_COMPLETED',response.data.Page);
             				}
             				else{
             					$('.coAPPNav').css('pointer-events', 'none');
             				}
             				$(".navbar a")[3].style =( 'cursor', 'pointer' );
							$(".navbar a")[3].title =""
							$(".navbar a")[3].href = "#/index/Financial"
                            localStorage.setItem("coApplicantslength",$scope.coApplicants.length);
                            var coapplicantDetails = $scope.coApplicants;
                            getCoApplicantValue();
                            localStorage.setItem("coApplicantName",coapplicantDetails[0].firstName +" "+ coapplicantDetails[0].lastName);                                    
                        for (var i = 0; i < $scope.coApplicants.length; i++) {
                            $scope.coApplicants[i].dateofBirth = $scope.coApplicants[i].dateofBirth == null ? $scope.coApplicants[i].dateofBirth = " " : moment($scope.coApplicants[i].dateofBirth).format('MM/DD/YYYY');
                            $scope.coApplicants[i].address1 = $scope.coApplicants[i].address1;
                            $scope.coApplicants[i].address2 = $scope.coApplicants[i].address2;
                        }
                        $scope.loader = false;
                        $scope.success = true;
                        $scope.success_message = "Your changes have been saved succesfully";
                        $scope.error = false;
                        $scope.coApplicantform.$setPristine(true);
                        $scope.removeError();
                        $scope.true_reset = false;
                        }, function errorCallback(response) {
                        	
                        });
                       
                    }

                };
                $scope.calculateAge = function(age) {
                    return calculateAge.age(age);
                };
                $scope.changePostZip = changePostZip;
                $scope.zipSet = zipSet;
                function setDropdownValue() {
                	
                	$scope.userInfo = JSON.parse(localStorage.getItem("UserInfo"));
                    $scope.genders = JSON.parse(localStorage.getItem('gender'));
                    $scope.maritals = JSON.parse(localStorage.getItem('maritals'));
                    $scope.Residences = JSON.parse(localStorage.getItem('Residences'));
                    $scope.educations = JSON.parse(localStorage.getItem('educations'));
                    $scope.marStatus=parseInt(localStorage.getItem("maritalStatusId"));
                    $scope.nonspouse = _.without($scope.familys, _.findWhere($scope.familys, { 'relationshipID': 3 }));
                    $scope.person_maritalStatus = $scope.userInfo.maritalStatusId;
                 getCoApplicantValue();
                };
                function getCoApplicantValue() {
                    getCoApplicantService.getCoApplicantId().then(
                        function successCallback(response) {
                        	localStorage.setItem("mint", 600000);
                        	$rootScope.SessionTime = 600000;
                        $scope.updatecount = JSON.parse(response.data.result)['#update-count-1'];
                        if( $scope.updatecount!=0){
                        	
                        }
                        $scope.result = JSON.parse(response.data.result)['#result-set-1'];
                        if ( $scope.result.length == 0 )
                        {
                            $scope.personalData = {
                            "userInfoId":"0",
                            "updatedBy": "",
                            "updatedOn": "",
                            "address1": "",
                            "address2": "",
                            "address3": $scope.residentStatuses[0].name,
                            "city": "",
                            "dateofBirth": "",
                            "firstName": "",
                            "lastName": "",
                            "postalZip": "",
                            "state": "",
                            "createdBy": "",
                            "createdOn": "",
                            "country": $scope.countries[0].name,
                            "genderId": "",
                            "refAgeId": "",
                            "maritalStatusId": "",
                            "educationId": "",
                            "refResidenceCategoryId": "",
                            "relationshipId": "",
                            "education": "",
                            "gender": "",
                            "maritalStatus": "",
                            "residenceCategory": "",
                            "educationDetail": "",
                            "zipId": "0",
                            "age": "",
                            "userId":""
                            };
                            
                            if($scope.coApplicants.length == 0){
                            $scope.coApplicants.push($scope.personalData);
                            }
                            $scope.loader = false;
                        }
                        else
                        {
                            var  data = $.param({ 'listOfUserId': JSON.stringify($scope.result)});
                            getCoApplicantService.getCoApplicantDetailsUsingListOfUserId(data).then(
                                function successCallback(coApplicantsresponse) {
                                	localStorage.setItem("mint", 600000);
                                	$rootScope.SessionTime = 600000;
                                    $scope.coApplicants = JSON.parse(coApplicantsresponse.data.Result);
                                    localStorage.setItem("coApplicantDetails",coApplicantsresponse.data.Result);
                                    var coapplicantDetails = $scope.coApplicants;
							
                                    localStorage.setItem("coApplicantName",coapplicantDetails[0].firstName+" "+ coapplicantDetails[0].lastName);                                    
                                    localStorage.setItem("coApplicantslength",$scope.coApplicants.length);
                                    angular.forEach($scope.coApplicants, function(value, key) {
                                    if($scope.coApplicants[key].maritalStatusId == 1){
                                    $scope.coApplicants[key].person_maritalStatus = 1;
                                    }
                                    else{
                                    $scope.coApplicants[key].person_maritalStatus = $scope.person_maritalStatus;
                                    }
                                    $scope.loader = false;
                                    });
                                }
                            );
                        }
                       
                        }
                    );
                };
                function changePostZip (val, i) {
                    var post =  $.param({
                                    'sessionId': parseInt(getcokkies.getsessionId()),
                                    'zipCode': val
                                });
                    getCoApplicantService.getZipInfo(post).then(
                        function successCallback(response) {
                        	localStorage.setItem("mint", 600000);
                        	$rootScope.SessionTime = 600000;
                            $scope.coApplicants[i].citys = JSON.parse(response.data.Result);
                            
                            
                            if($scope.coApplicants[i].citys.length == 0){
								
							}else if ($scope.coApplicants[i].citys.length > 1)
                            {
                            	 $scope.coApplicants[i].state = $scope.coApplicants[i].citys[0].state;
                                //$("#City" + i).attr();
                            }
                            else
                            {
                                $("#City" + i).removeAttr("multiple");
                                $scope.coApplicants[i].state = $scope.coApplicants[i].citys[0].state;
                                $scope.coApplicants[i].zipId = $scope.coApplicants[i].citys[0].zipId;
                            }
                        }
                    );
                };
                function zipSet (c, i) {
                    var objectSegment = _.findWhere($scope.coApplicants[i].citys, { city: c });
                    $scope.coApplicants[i].zipId = objectSegment.zipId;
                    $("#City" + i).removeAttr("multiple");
                };
                
                $scope.nextPage = function(val) {
                	
                	if ($scope.coApplicantform.$dirty) {
						var r = confirm("Current page has unsaved data. Are you sure you want to proceed?");

						if (r == true) {
							$state.go('index.financial');

						} else {
							$scope.dirty = true;
							dirty.set();
						}

					} else {
							$state.go('index.financial');
					}
                	
                     }         
                
                $scope.next = function(val) {
                	
                    if (!$scope.coApplicantform.$valid) {
                        $scope.error = true;
                        $scope.error_message = "Kindly fill all the mandatory fields correctly";
                        $('input.ng-invalid').addClass('redcolorinput');
                        $('select.ng-invalid').addClass('redcolorinput');
                        $scope.success = false;
                    }else if($scope.coApplicants.length < parseInt(localStorage.getItem('coApplicantslength'))){
                        $scope.error = true;
                        $scope.error_message = "you have removed some coApplicants";
                        $scope.true_reset = true;
                        $scope.success = false;
                        $scope.help = true;
					} else if ($scope.coApplicants[0].age <21 || $scope.coApplicants[0].age > 65) {
                    	$('#coApplicantage0').addClass('redcolorinput');
                    	 $scope.error = true;
                         $scope.error_message="Co-Applicant age should be between 21 to 65";
                         $scope.help = false;
						 $scope.success = false;
                    }
                    else {
                        $('select.ng-dirty').removeClass('redcolorinput');
                        $('input.ng-dirty').removeClass('redcolorinput');
                     
                        $scope.save();
                        $state.go('index.financial');
                    }
                };
                
                $scope.back = function(val) {
                	
					if ($scope.coApplicantform.$dirty)  {
						var r = confirm("Current page has unsaved data. Are you sure you want to proceed?");
						if (r == true) {
							$state.go('index.customerPersonal');
						}
						$scope.error_message = "Highlighted Field values have been modified";
						$('input.ng-dirty').addClass(
								'redcolorinput');
						$('select.ng-dirty').addClass(
								'redcolorinput');
						$scope.success = false;
						
					} else {
						$state.go('index.customerPersonal');
					}
                };
                $scope.$watch('coApplicantform.$dirty', function(neeval, oldval) {
                    if (neeval == true) {
                        $scope.true_reset = true;
                        $scope.success = false;
                        $scope.error = false;
                    } else {
                        $scope.true_reset = false;
                    }
                }, true);
                $scope.remove = function(removeObject) {
                    $scope.coApplicants = _.without($scope.coApplicants, removeObject);
                    $scope.true_reset = true;
                };
                $scope.ageValidation = function(coApplicants){
                    $scope.removeError();
                    $scope.errorAge = [];
                    angular.forEach(coApplicants, function(value, key) {
                        if(value.age > 65 || value.age < 21){
                            $scope.errorAge.push(key);
                        }
                    });
                };
                $scope.removeError= function(){
                    angular.forEach($scope.errorAge, function(value, key) {
                        $('#coApplicantage'+value).removeClass('redcolorinput');
                    });
                };
                $scope.linkNext = function(){
                    $state.go('index.financial');
                };
                $scope.pAddr = function(addrVal){
					if(addrVal == 1){
						var data = $.param({
							'userId' : parseInt(getcokkies.getUserId()),
						});
						
						getCoApplicantService.fetchPrimaryaddress(data).then(
										function successCallback(response) {
											
											var res = JSON.parse(response.data.Result);
											$scope.coApplicants[0].refResidenceCategoryId = "";
											$scope.coApplicants[0].address1= "";
											$scope.coApplicants[0].address2="";
											$scope.coApplicants[0].city = "";
											$scope.coApplicants[0].postalZip = "";
											$scope.coApplicants[0].refResidenceCategoryId = res[0].refResidenceCategoryId;
											$scope.coApplicants[0].address1=res[0].address1;
											$scope.coApplicants[0].address2=res[0].address2;
											$scope.coApplicants[0].city = res[0].city;
											$scope.coApplicants[0].postalZip = res[0].zip;
											$scope.coApplicants[0].state = res[0].state;
											$scope.coApplicants[0].zipId = res[0].zipid;
											$rootScope.zipId = res[0].zipid; 
										});
						
					}else{
						$scope.coApplicants[0].refResidenceCategoryId = "";
						$scope.coApplicants[0].address1= "";
						$scope.coApplicants[0].address2="";
						$scope.coApplicants[0].city = "";
						$scope.coApplicants[0].postalZip = "";
						$scope.coApplicants[0].state = "";
					}
					
				}
                
                $scope.changeMarialtoRelationship=function(mStatus){
                	if(mStatus==1){
                		$("#Relationship option[value='number:7']").hide();
                	}
                	else if(mStatus==2){
                		$("#Relationship option[value='number:7']").show();
                	}
                	else if(mStatus==3){
                		$("#Relationship option[value='number:7']").hide();
                	}
                	else if(mStatus==13){
                		$("#Relationship option[value='number:7']").hide();
                	}
                	else if(mStatus==14){
                		$("#Relationship option[value='number:7']").hide();
                	}
                }
                
                $scope.relationApplicant=function(relationshipId){
                	$('#Marital').val('');
                	if(relationshipId==7){
                		$scope.coApplicants[0].maritalStatusId=2;
                		$('#Marital').prop("disabled", true);
                	}
                	else if(relationshipId==1){
                		$scope.coApplicants[0].maritalStatusId= "";
                		$('#Marital').prop("disabled", false);
                	}
                	else if(relationshipId==2){
                		$scope.coApplicants[0].maritalStatusId= "";
                		$('#Marital').prop("disabled", false);
                	}
                	else if(relationshipId==3){
                		$scope.coApplicants[0].maritalStatusId= "";
                		$('#Marital').prop("disabled", false);
                	}
                	else if(relationshipId==4){
                		$scope.coApplicants[0].maritalStatusId= "";
                		$('#Marital').prop("disabled", false);
                	}
                	else if(relationshipId==5){
                		$scope.coApplicants[0].maritalStatusId= "";
                		$('#Marital').prop("disabled", false);
                	}
                	else if(relationshipId==6){
                		$scope.coApplicants[0].maritalStatusId= "";
                		$('#Marital').prop("disabled", false);
                	}
                }
              
            }
        ]);
})();