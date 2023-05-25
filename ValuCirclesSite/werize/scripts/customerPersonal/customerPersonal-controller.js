var Ps = Ps || {};

(function() {
	'use strict';
	angular
			.module('customerPersonal')
			.controller(
					'customerPersonalController',
					[
							'$state',
							'$http',
							'$scope',
							'$rootScope',
							'getcokkies',
							'config',
							'$filter',
							'dropDown',
							'getPersonalData',
							'vJson',
							'dirty',
							'getPersonalService',
							function($state, $http, $scope, $rootScope,
									getcokkies, config, $filter, dropDown,
									getPersonalData, vJson, dirty,
									getPersonalService) {
								dropDown.updateFinancialDropdown(); // check and
																	// update
																	// dropdown
								var page
								$scope.loader = true;
								$scope.error = false;
								$rootScope.username = localStorage.getItem("user_name");
								setUserData(); // set personal data from
												// setInstitution
								$scope.getPersonalDetailsDropdown = dropDown.getDropdownPersonal(); // DropDown
																									// for
																									// personal
																									// data
								$scope.removeSpecialChar = removeSpecialChar; // remove
																				// special
																				// char
																				// save
																				// customer
																				// personal
																				// required
																				// field
								var personalNav = parseInt(localStorage.getItem('PAGE_COMPLETED'));	
								$rootScope.PAGE_COMPLETED = personalNav;
								$scope.PAGE_COMPLETED = personalNav;
								if(personalNav >= 2 && $scope.userInfo.coApplicantId == 1 || personalNav >= 2 && $scope.userInfo.coApplicantId == 0){
									$('#linkchng').css('pointer-events', 'all');
								}
								else{
									$('#linkchng').css('pointer-events', 'none');
								}
								angular.element(document).ready(function() {
									$('#selector1').trigger('click');
								});
								
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
								$scope.req_fn = true;
								$scope.req_ls = true;
								$scope.req_zip = true;
								$scope.userSelection = true;
								$scope.save = function(user,e) {
									$scope.error = false;
									if ($scope.userInfo.refResidenceCategoryId == 0
											|| $scope.userInfo.genderId == 0
											|| $scope.userInfo.maritalStatusId == 0
											|| $scope.userInfo.educationId == 0) {
										if ($scope.userInfo.refResidenceCategoryId == 0) {
											$('#Residence').css('border',
													'2px solid red');
										}else{
											$('#Residence').removeAttr('style');
											$scope.req_fn = false;
										}
										if ($scope.userInfo.genderId == 0) {
											$('#Gender').css('border',
													'2px solid red');
										}else{
											$('#Gender').removeAttr('style');
											$scope.req_fn = false;
										}
										if ($scope.userInfo.maritalStatusId == 0) {
											$('#Marital').css('border',
													'2px solid red');
										}else{
											$('#Marital').removeAttr('style');
											$scope.req_fn = false;
										}
										if ($scope.userInfo.educationId == 0) {
											$('#Education').css('border',
													'2px solid red');
										}else{
											$('#Education').removeAttr('style');
											$scope.req_fn = false;
										}
										$scope.error = true;
									}
									
									if ($scope.userInfo.firstName) {
										$('#firstName').removeAttr('style');
										$scope.req_fn = false;
									} else {
										$('#firstName').css('border',
												'2px solid red');
										$scope.req_fn = true;
										$scope.error = true;
									}
									if ($scope.userInfo.lastName) {
										$('#lastName').removeAttr('style');
										$scope.req_ls = false;
									} else {
										$('#lastName').css('border',
												'2px solid red');
										$scope.req_ls = true;
										$scope.error = true;
									}
									if ($scope.userInfo.postalZip) {
										$('#postalZip').removeAttr('style');
										$scope.req_zip = false;
									} else {
										$('#postalZip').css('border',
												'2px solid red');
										$scope.req_zip = true;
										$scope.error = true;
									}
									if ($scope.userInfo.city) {
										$('#City').removeAttr('style');
										$scope.req_city = false;
									} else {
										$('#City').css('border','2px solid red');
										$scope.req_city = true;
										$scope.error = true;
									}
									
									if (!$scope.Personalform.dob.$valid) {
										$scope.error = true;
										$scope.error_message = "Please enter DOB in MM/DD/YYYY.";
										$('#DateofBirth').css('border','2px solid red');
										$scope.success = false;
										$(".age-limit").show();
									} else if (user.age < 21 || user.age > 64){
										$scope.error = true;
										$scope.error_message = "Age must be between 21 and 64.";
										$('#DateofBirth').css('border','2px solid red');
										$scope.success = false;
										$(".age-limit").show();
									} else if (user.age){
										$('#DateofBirth').removeAttr('style');
										$scope.req_fn = false;
									} else if ($scope.citys.length == 0) {
										$scope.error = true;
										$scope.error_message = "No city available in this zipcode"
										$scope.sucess = false;
									}if ($scope.error) {
										$scope.error_message = "Kindly fill all the mandatory fields correctly"
										return false;
									} else {
										$scope.loader = true;
										$scope.error = false;
										var objectsegment;
										var personalPostData = {
											"updatedBy" : "",
											"updatedOn" : "",
											"userInfoId" : $scope.userInfo.userInfoId,
											"address1" : $scope.userInfo.address1 == null ? ""
													: btoa($scope.userInfo.address1),
											"address2" : $scope.userInfo.address2 == null ? ""
													: btoa($scope.userInfo.address2),
											"address3" : $scope.userInfo.address3,
											"postalZip" : $scope.userInfo.postalZipid > 0 ? $scope.userInfo.postalZipid
													: $scope.userInfo.zipId,
											"dateofBirth" : moment($scope.userInfo.dateofBirth).format('MM/DD/YYYY'),
											"firstName" : $scope.userInfo.firstName,
											"lastName" : $scope.userInfo.lastName,
											"state" : $scope.userInfo.state,
											"subsciptionId" : "1",
											"createdBy" : "",
											"createdOn" : "",
											"country" : $scope.userInfo.country,
											"genderId" : $scope.userInfo.genderId,
											"refAgeId" : $scope.userInfo.age,
											"maritalStatusId" : $scope.userInfo.maritalStatusId,
											"educationId" : $scope.userInfo.educationId,
											"refResidenceCategoryId" : $scope.userInfo.refResidenceCategoryId,
											"compareaddrId" : $scope.userInfo.compareaddrId,
											"coApplicantId" : $scope.userInfo.coApplicantId,
											"propertyIdentifierId" : $scope.userInfo.propertyIdentifierId,
											"helpWithProperty" : $scope.userInfo.helpWithProperty
										};

										savePersonal(personalPostData,e);

									}
								};
								$scope.savenext = function(userInfo,e){
									$scope.save(userInfo,e);
								}
								// dirty customer personal
								$scope.nextPages = function(user) {
									if ($scope.Personalform.$dirty) {
										// $scope.dirty = true;
										// dirty.set();
										var r = confirm("Current page has unsaved data. Are you sure you want to proceed?");

										if (r == true) {
											if ($scope.userInfo.coApplicantId == 1) {
												
												$state.go('index.coApplicant');
											} else {
												$state.go('index.financial');
											}
										} else {
											$scope.dirty = true;
										}

									} else {

										if ($scope.userInfo.coApplicantId == 1) {

											$state.go('index.coApplicant');
										} else {

											$state.go('index.financial');
										}
									}
								};
								$scope.back = function() {

									var check = $scope.Personalform.$dirty; 
									if ($scope.Personalform.$dirty)  {
										var r = confirm("Current page has unsaved data. Are you sure you want to proceed?");
										if (r == true) {
											$state.go('index.assets');
										}
										$scope.error_message = "Highlighted Field values have been modified";
										$('input.ng-dirty').addClass(
												'redcolorinput');
										$('select.ng-dirty').addClass(
												'redcolorinput');
										$scope.sucess = false;
										
									} else {
										$state.go('index.assets');
									}
									
								}
								
							
								// changeZip customer personal
								$scope.changePostZip = function(val) {
							//	var val = vall == undefined || vall == null  ? vall = undefined : vall;
									if (val != undefined || val != null) {
										if (val.length == 6) {
											$('#pincodeAlert').css("display","none");
											var data = $
													.param({
														'sessionId' : parseInt(getcokkies
																.getsessionId()),
														'zipCode' : val
													});
											getPersonalService
													.getZipInfo(data)
													.then(
															function successCallback(
																	response) {
																localStorage.setItem("mint", 600000);
																$rootScope.SessionTime = 600000;
																$scope.citys = JSON.parse(response.data.Result);
																if($scope.citys.length == 0){
																	$('#pincodeAlert').css("display","none");
																	$('#pincodeAlert1').html("Please enter your nearest Zipcode");
																	$('#pincodeAlert1').css("display","block");
																	
																}else if ($scope.citys.length > 1) {																
																	$scope.userInfo.state = $scope.citys[0].state;
//																	$("#City").attr();																	
																	$scope.error = false;
																} else {
																	$("#City").removeAttr( "multiple");
																	$scope.userInfo.postalZipid = $scope.citys[0].zipId;
																	$scope.userInfo.city = $scope.citys[0].city;
																	$scope.userInfo.state = $scope.citys[0].state;
																	$scope.error = false;
																}
															

															},
															function errorCallback(response) {
															});
										} else {
											$('#pincodeAlert1').css("display","none");
											$('#pincodeAlert').css("display","block");
											
										}
									} else {
										$('#pincodeAlert1').css("display","none");
										$('#pincodeAlert').css("display","block");
									}
								};
								// watch customer personal
								$scope.$watch('userInfo.city', function(
										citynew, oldcity) {
									if (citynew) {
										$("#City").removeAttr("multiple");
									}
								}, true);
								$scope.$watch('Personalform.$dirty', function(
										neeval, oldval) {
									if (neeval == true) {
										$scope.true_reset = true;
										$scope.success = false;
									} else {
										$scope.true_reset = false;
									}
								}, true);
								// Reset customer personal
								$scope.reset = function() {
									$scope.loader = true;
									$scope.error = false;
									setUserData();
									$scope.dirty = false;
									$scope.Personalform.$setPristine(true);
									dirty.remove();
									$scope.success = true;

									if ($scope.userInfo.country == null ||$scope.userInfo.country == ""||$scope.userInfo.country == undefined ) 
									{
									$scope.userInfo.country = $scope.countries[0].name;
									}
								
									if ($scope.userInfo.address3 == null ||$scope.userInfo.address3 == ""||$scope.userInfo.address3 == undefined ) {
									$scope.userInfo.address3 = $scope.residentStatuses[0].name;
									}
									$scope.success_message = "Your changes have been successfully reset !!!";
									$scope.loader = false;
									
								};
								// CalaculateAge customer personal
								$scope.calculateAge = function(birthday) { // pass
																			// in
																			// player.dateOfBirth
									var dob = new Date(birthday);
									var today = new Date();
									$scope.userInfo.age = (today.getFullYear() - dob
											.getFullYear());
									if($scope.userInfo.age<=20){
										$(".age-limit").show();
									}else if($scope.userInfo.age>64){
										$(".age-limit").show();
									}else {
										$(".age-limit").hide();
									}
									
								};
								// Zipset customer personal
								$scope.zipset = function(c) {
									var objectsegment = _.findWhere(
											$scope.citys, {
												city : c
											});

									if (objectsegment != "" && objectsegment != null && objectsegment != undefined) {
										$scope.userInfo.postalZipid = objectsegment.zipId;
									}else{
									}
								};

								// Methods

								// get localstorage from user data
								function setUserData() {
									
									$scope.userInfo = getPersonalData.personalData();
									$scope.userInfo.dateofBirth = $scope.userInfo.dateofBirth == null ? "" : moment($scope.userInfo.dateofBirth).format('MM/DD/YYYY');
									$scope.userInfo.country = $scope.userInfo.country;
									$scope.userInfo.address3 = $scope.userInfo.address3;
									$scope.postalZipid = $scope.userInfo.zipId;
									localStorage .setItem( "assetShow",
									$scope.userInfo.propertyIdentifierId);
									localStorage.setItem("coApplicant",
											$scope.userInfo.coApplicantId);
									localStorage.setItem("compareaddrId",
											$scope.userInfo.compareaddrId);
									$rootScope.assetShow = parseInt(localStorage
											.getItem("assetShow"));
									$rootScope.coApplicant = parseInt(localStorage
											.getItem("coApplicant"));
									$rootScope.compareaddrId = parseInt(localStorage
											.getItem("compareaddrId"));
									getZipInfo();
									
								};
								// get zipinfo
								function getZipInfo() {
									var data = $.param({
										'sessionId' : parseInt(getcokkies
												.getsessionId()),
										'zipCode' : $scope.userInfo.postalZip
									});
									getPersonalService
											.getZipInfo(data)
											.then(
													function successCallback(
															response) {
														localStorage.setItem("mint", 600000);
														$rootScope.SessionTime = 600000;
														$scope.citys = JSON
																.parse(response.data.Result);
														$scope.loader = false;
													},
													function errorCallback(
															response) {
													});
								} ;


								// getSummaryDetails
								function getSummaryDetails() {
									getPersonalService
											.getSummaryDetails()
											.then(
													function(response) {
														// console*.log(response);
														// console*.log(response.UserInfo)
														localStorage
																.setItem(
																		"UserInfo",
																		response.UserInfo);
														setUserData();
													}, function(err) {
													});
								} ;
								// removeSpecialChar
								function removeSpecialChar(str) {
									return str.replace(/[^a-zA-Z ]/g, "");
								} ;
								// save personal
								function savePersonal(personalPostData,e) {
									var data = $.param({
										'userId' : parseInt(getcokkies
												.getUserId()),
										'userDetails' : JSON
												.stringify(personalPostData)
									});
									getPersonalService
											.savePersonal(data)
											.then(
													function successCallback(
															response) {
														localStorage.setItem("mint", 600000);
														$rootScope.SessionTime = 600000;
														$scope.success_message = "Your changes have been saved successfully";
														$scope.success = true;
														$scope.loader = false;
														$scope.dirty = false;
														if(response.data.Page >= 2 && $scope.userInfo.coApplicantId == 1 || response.data.Page >= 2 && $scope.userInfo.coApplicantId == 0){
															$('#linkchng').css('pointer-events', 'all');
															localStorage.setItem('PAGE_COMPLETED',response.data.Page);
														}
														else{
															localStorage.setItem('PAGE_COMPLETED',response.data.Page);

															$('#linkchng').css('pointer-events', 'none');
														}
														if ($scope.userInfo.coApplicantId == 1) {
															$('#linkchng') .html(
																			'Co-Applicant<i style="padding: 0 1%;font-size: 16px;" class="fa fa-angle-double-right"></i>');
														} else {
															$('#linkchng') .html(
																			'Financial<i style="padding: 0 1%;font-size: 16px;" class="fa fa-angle-double-right"></i>');
															if(localStorage.getItem('coApplicantName')){
																localStorage.removeItem('coApplicantName');
															}
															$(".navbar a")[3].style =( 'cursor', 'pointer' );
															$(".navbar a")[3].title =""
															$(".navbar a")[3].href = "#/index/Financial"
														}
														 
														$rootScope.username = JSON .parse(response.data.UserInfo).firstName;
														$rootScope.test = "TEST";
														$rootScope.maritalStatusId = JSON
														.parse(response.data.UserInfo).maritalStatusId;
														localStorage.setItem("UserInfo",response.data.UserInfo);
														localStorage.setItem("user_name",$rootScope.username);
														if(e.target.className == 'btn vcirclebtn pull-right nxtbtn'){
															
															if($scope.userInfo.coApplicantId == 1){
															$state.go('index.coApplicant');
															}else{
																$state.go('index.financial');
															}
														}
														setUserData();
														
													},
													function errorCallback(response) {
														$scope.loader = false;
														$scope.dirty = false;
														alert("something went Wrong Please Try again after sometime");
													}
													
											);
								
							
									$scope.Personalform.$setPristine(true);
								} ;
								// author i
								$scope.checklink = function() {
									if ($scope.userInfo.coApplicantId == 1) {
										$('#linkchng').html('Co-Applicant<i style="padding: 0 1%;font-size: 16px;" class="fa fa-angle-double-right"></i>');
									} else {
										$('#linkchng').html('Financial<i style="padding: 0 1%;font-size: 16px;" class="fa fa-angle-double-right"></i>');
									}
								}

								function removeDOBError() {
								}

								$scope.$watch('userInfo.educationInstitutionId',
												function(citynew, oldcity) {
													if (citynew) {
														$("#EducationInstitution").removeAttr("multiple");
													}
												}, true);

								$scope.valispace = function(value) {
									
								}
								$scope.disabled = function() {
									
									  if($scope.addInviteesDisabled) { return true;}
									}
							} ]);
})();