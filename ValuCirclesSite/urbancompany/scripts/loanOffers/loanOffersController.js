// eslint-disable-next-line
var Ps = Ps || {};

(function() {
	'use strict';

	angular
			.module('loanOffers')
			.controller(
					'loanOffersController',
					[
							'$state',
							'$http',
							'$scope',
							'getcokkies',
							'config',
							'$location',
							'$rootScope',
							'getLpiService',
							'$window',
							function($state, $http, $scope, getcokkies, config,
									$location, $rootScope, getLpiService,
									$window) {
								angular.element(document).ready(function() {

									$('#selector15').trigger('click');
								});
								var e = localStorage.getItem('userLpiStatus');
			                	if(e != 1){
			                		$scope.checkbtn = true;
			                	
			                	}else{
			                		$scope.checkbtn = false;
			                		
			                	}

								$scope.loader = true;
								$scope.error = false;
								$rootScope.coAppname = localStorage
										.getItem("coApplicantName");
								if ($rootScope.coAppname == ""
										|| $rootScope.coAppname == null
										|| $rootScope.coAppname == undefined) {
									$rootScope.coAppnamedata = "Not Added";
								} else {
									$rootScope.coAppnamedata = localStorage
											.getItem("coApplicantName");
								}

								$rootScope.username = localStorage
										.getItem("user_name");
								$rootScope.assetShow = parseInt(localStorage
										.getItem("assetShow"));
								$rootScope.coApplicant = parseInt(localStorage
										.getItem("coApplicant"));
								$scope.userInfochecklpi = localStorage
										.getItem("UserInfo");
								$scope.userEmploymentchecklpi = JSON
										.parse(localStorage
												.getItem("UserEmployment"));
								$scope.userassetfinancingchecklpi = JSON
										.parse(localStorage
												.getItem("assetFinancing"));
								localStorage.getItem("userLpiStatus") == "1" ? $scope.userLpiStatus = true
										: $scope.userLpiStatus = false;
								lpiRecalculate(0);

								function lpiRecalculate(ans) {
									$scope.loader = true;
									if ($scope.userInfochecklpi.userInfoId == 0
											|| $scope.userEmploymentchecklpi.userEmploymentId == 0
											|| $scope.userassetfinancingchecklpi.assetFinancingId == 0) {
										$scope.checkallfield = false;
										$scope.loader = false;
										$scope.userinfolpiid = $scope.userInfochecklpi.userInfoId == 0 ? false
												: true;
										$scope.useremploymentlpiid = $scope.userEmploymentchecklpi.userEmploymentId == 0 ? false
												: true;
										$scope.userfinancinglpiid = $scope.userassetfinancingchecklpi.assetFinancingId == 0 ? false
												: true;
									} else {
										$scope.checkallfield = true;
										if ($location.search().status == 'success') {
											var data = $.param({
												'userId' : parseInt(getcokkies
														.getUserId()),
												'paymentId' : 1
											});
											getLpiService
													.insertUserSubcription(data)
													.then(
															function successCallback(
																	response) {
																localStorage
																		.setItem(
																				"mint",
																				600000);
																$rootScope.SessionTime = 600000;
																getLpiService
																		.getLpiPageListApi()
																		.then(
																				function successCallback(
																						response) {
																					localStorage
																							.setItem(
																									"mint",
																									600000);
																					$rootScope.SessionTime = 600000;
																					if (response.data.userInfo == undefined) {
																						$scope.loader = true;
																					} else {
																						$scope.userInfo = JSON
																								.parse(response.data.userInfo);
																						$scope.userEmployee = JSON
																								.parse(response.data.userEmployee);
																						$scope.userIncome = JSON
																								.parse(response.data.userFinancial);
																						$scope.loanTerm = JSON
																								.parse(response.data.userFinancial).loanTerm;
																						$scope.coApplicantIncome = response.data.coApplicantIncome;
																						
																						$scope.error = false;
																						var data = $
																								.param({
																									'sessionId' : parseInt(getcokkies
																											.getsessionId()),
																									'userId' : parseInt(getcokkies
																											.getUserId()),
																									'debug' : 0,
																									'yesNo' : 1
																								});
																						getLpiService
																								.getUserLenderLpiScore(
																										data)
																								.then(
																										function successCallback(
																												lenderresponse) {
																											localStorage
																													.setItem(
																															"mint",
																															600000);
																											$rootScope.SessionTime = 600000;
																											$location
																													.search().status = null;
																											var count = [];
																											if (ans != 0) {
																												$scope.lenders = JSON
																														.parse(lenderresponse.data.result);
																												$scope.lpi = JSON
																														.parse(lenderresponse.data.VCScore);
																												count = JSON
																														.parse(lenderresponse.data.VCScore);
																												
																											} else {
																												$scope.lenders = JSON
																														.parse(lenderresponse.data.result);
																												
																												$scope.lpi = JSON
																														.parse(lenderresponse.data.VCScore);
																												count = JSON
																														.parse(lenderresponse.data.VCScore);
																											}
																											if (count.length != 0) {
																												$scope.remainingCount = 5 - count[0].LPiCount;
																											} else {
																												$scope.remainingCount = 5;
																											}
																											//$scope.loader = false;
																										},
																										function errorCallback(
																												response) {
																										});
																					}
																				},
																				function errorCallback(
																						response) {
																				});

																var getSubscriptionKey = $
																		.param({
																			'sessionId' : parseInt(getcokkies
																					.getsessionId()),
																			'userId' : parseInt(getcokkies
																					.getUserId())
																		});
																getLpiService
																		.getSubcriptionKey(
																				getSubscriptionKey)
																		.then(
																				function successCallback(
																						response) {
																					localStorage
																							.setItem(
																									"mint",
																									600000);
																					$rootScope.SessionTime = 600000;
																					var check = JSON
																							.stringify(response.data);
																					if (response.data.Result == 'Fail'
																							|| check == "{}") {
																						$scope.subcription = true;
																					} else {
																						$scope.subcription = false;
																					}
																				},
																				function errorCallback(
																						response) {
																					$scope.loader = false;
																				});
															},
															function errorCallback(
																	response) {
															});
										} else {
											getLpiService
													.getLpiPageListApi()
													.then(
															function successCallback(
																	response) {
																localStorage
																		.setItem(
																				"mint",
																				600000);
																$rootScope.SessionTime = 600000;
																if (response.data.userInfo == undefined) {
																	$scope.loader = true;
																} else {
																	$scope.userInfo = JSON
																			.parse(response.data.userInfo);
																	$scope.userEmployee = JSON
																			.parse(response.data.userEmployee);
																	$scope.userIncome = JSON
																			.parse(response.data.userFinancial);
																	$scope.loanTerm = JSON
																			.parse(response.data.userFinancial).loanTerm;
																	$scope.coApplicantIncome = parseInt(response.data.coApplicantIncome);
																	//$scope.loader = false;
																	$scope.error = false;
																	var data = $
																			.param({
																				'sessionId' : parseInt(getcokkies
																						.getsessionId()),
																				'userId' : parseInt(getcokkies
																						.getUserId()),
																				'debug' : 0,
																				'yesNo' : ans
																			});
																	getLpiService
																			.getUserLenderLpiScore(
																					data)
																			.then(
																					function successCallback(
																							lenderresponse) {
																						localStorage
																								.setItem(
																										"mint",
																										600000);
																						$rootScope.SessionTime = 600000;
																						var count = [];
																						if (ans != 0) {
																							$scope.lenders = JSON
																									.parse(lenderresponse.data.result);
																							
																							$scope.lpi = JSON
																									.parse(lenderresponse.data.VCScore);
																							/*$scope.lender_logos = JSON
																									.parse(lenderresponse.data.lender_logo);*/
																							$scope.list = JSON.parse(lenderresponse.data.list);
																							count = JSON
																									.parse(lenderresponse.data.VCScore);
																						} else {
																							$scope.lenders = JSON
																									.parse(lenderresponse.data.result);
																							$scope.lpi = JSON
																									.parse(lenderresponse.data.VCScore);
																							/*$scope.lender_logos = JSON
																									.parse(lenderresponse.data.lender_logo);*/
																							$scope.list = JSON.parse(lenderresponse.data.list);
																							$scope.props = [];
																							$scope.propname = [];
																							//$scope.propVal = [];
																							
																							angular.forEach($scope.lenders,function(value1, key1) {
																								//alert("inside for each lender loop "+"key1="+key1);
																								angular.forEach($scope.list,function(value, key) {
																									//alert("inside for each list loop "+"key="+key);
																									if(value.lenderId == value1.lenderId){
																										//alert("inside lender=lender "+"value.lenderId="+value.lenderId+" value1.lenderId="+value1.lenderId);
																										if(key1 == 0){																																																			
																										$scope.propname.push(value.propsName);
																										// alert("inside key1==0 loop "+"key="+key+" key1="+key1);
																										
																										}
																										var obj = {
																												"lenderId" :value1.lenderId,
																												"propsName":value.propsName,
																												"propValue": value.propsValue
																												}
																												$scope.props.push(obj)	
																									}
																																															
																								});
																							
																							});
																							$scope.lenderProp = $scope.propname; 
																							count = JSON.parse(lenderresponse.data.VCScore);
																						}
																						if (count.length != 0) {

																							$scope.remainingCount = 5 - count[0].LPiCount;
																						} else {
																							$scope.remainingCount = 5;
																						}
																						$scope.loader = false;
																					},
																					function errorCallback(
																							response) {
																						$scope.loader = false;
																					});
																}
															},
															function errorCallback(
																	response) {
															});
											var getSubscriptionKey = $
													.param({
														'sessionId' : parseInt(getcokkies
																.getsessionId()),
														'userId' : parseInt(getcokkies
																.getUserId())
													});
											getLpiService
													.getSubcriptionKey(
															getSubscriptionKey)
													.then(
															function successCallback(
																	response) {
																localStorage
																		.setItem(
																				"mint",
																				600000);
																$rootScope.SessionTime = 600000;
																var check = JSON
																		.stringify(response.data);
																if (response.data.Result == 'Fail'
																		|| check == "{}") {
																	$scope.subcription = true;
																} else {
																	$scope.subcription = false;
																}
															},
															function errorCallback(response) {
															});
										}
									}
									$scope.checkLenderSelected = function() {
										alert("check atleast 1 one lender");
									}
										
									$scope.updatelpistatus = function() {
										if (localStorage.getItem("userLpiStatus") == "1") {
											    var data = [];
											    angular.forEach($scope.lenders, function(lender){
											      if (lender.selected){
											    	
											    	  data.push({ 
											    		  	"userId" : parseInt(getcokkies.getUserId()),
															"lenderId" : lender.lenderId,
															"userLenderId" : ""
															})
											    }
											    });
											    if(data.length != 0){
											    var dataParam = $.param({
					                                'lenders': JSON.stringify(data)
					                            });} else{
											    	alert("Please select atleast one lender");
											    	return false;
											    }
											getLpiService.updateLoginUserLpiStatus()
													.then(
															function successCallback(response) {
																localStorage.setItem("mint",600000);
																$rootScope.SessionTime = 600000;
																if (response.data.Result == 'Success') {
																	getLpiService.insertlenderdetails(dataParam);
																	$('#myModal').modal('hide');
																	localStorage.setItem("userLpiStatus","2");
																	$('#trackApp').css({
																						'pointer-events' : 'all',
																						'opacity' : '1px'
																					});
																	$scope.userLpiStatus = false;
																}
															},
															function errorCallback(
																	response) {
															});
										} else {
										}
									}
									  $scope.back = function() {
									  $state.go('index.lpi');
									   }
									$scope.next = function() {
										$state.go('index.assets');
									}
									// change LPI Color
									$scope.set_color = function(lender) {
										if (lender.lpi <= 20) {
											$('.back-color-' + lender.lenderId)
													.css('background-color',
															'red');
											$('.back-color-' + lender.lenderId)
													.css('color', 'red');
										} else if (lender.lpi > 20
												&& lender.lpi <= 40) {
											$('.back-color-' + lender.lenderId)
													.css('background-color',
															'orange');
											$('.back-color-' + lender.lenderId)
													.css('color', 'orange');
										} else if (lender.lpi > 40
												&& lender.lpi <= 60) {
											$(".back-color-" + lender.lenderId)
													.css('background-color',
															'yellow');
											$('.back-color-' + lender.lenderId)
													.css('color', 'yellow');
										} else if (lender.lpi > 60
												&& lender.lpi <= 80) {
											$(".back-color-" + lender.lenderId)
													.css('background-color',
															'#90EE90');
											$('.back-color-' + lender.lenderId)
													.css('color', '#90EE90');
										} else if (lender.lpi > 80
												&& lender.lpi <= 100) {
											$(".back-color-" + lender.lenderId)
													.css('background-color',
															'green');
											$('.back-color-' + lender.lenderId)
													.css('color', 'green');
										}
									}
								}

							} ]);
})();