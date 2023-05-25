// eslint-disable-next-line
var Ps = Ps || {};

(function() {
	'use strict';

	angular
			.module('lpi')
			.controller(
					'lpiController',
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

								$scope.refreshPage = function() {
									$('#remainModal').modal('hide');
									
									lpiRecalculate(1);
								}
								getCoApplicantValue();
								var lpiNav = parseInt(localStorage
										.getItem('PAGE_COMPLETED'));
								$rootScope.PAGE_COMPLETED = lpiNav;
								$scope.PAGE_COMPLETED = lpiNav;
								if (lpiNav >= 3) {
									$('.lpinav').css('pointer-events', 'all');
								} else {
									$('.lpinav').css('pointer-events', 'none');
								}
								angular.element(document).ready(function() {
									$('#selector7').trigger('click');
								});
								$scope.loader = true;
								$scope.error = false;
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
								$scope.lenderofferexists=0;
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
																						$scope.propertyValue = $scope.userIncome.assetValue.toLocaleString('en-IN').replace(/\B(?=(\d{3})+(?!\d))/g,",");
																						$scope.requestedloanValue = $scope.userIncome.loanValue.toLocaleString('en-IN').replace(/\B(?=(\d{3})+(?!\d))/g,",");
																						$scope.loanTerm = JSON
																								.parse(response.data.userFinancial).loanTerm;
																						$scope.coApplicantIncome = response.data.coApplicantIncome;
																						$scope.loader = false;
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
																											$scope.loader = false;
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
																	$scope.propertyValue = $scope.userIncome.assetValue.toLocaleString('en-IN').replace(/\B(?=(\d{3})+(?!\d))/g,",");
																	$scope.requestedloanValue = $scope.userIncome.loanValue.toLocaleString('en-IN').replace(/\B(?=(\d{3})+(?!\d))/g,",");
																	$scope.loanTerm = JSON
																			.parse(response.data.userFinancial).loanTerm;
																	$scope.coApplicantIncome = parseInt(response.data.coApplicantIncome);
																	$scope.loader = false;
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
																	getLpiService.getUserLenderLpiScore(data) .then(
																					function successCallback(lenderresponse) {
																						localStorage
																								.setItem(
																										"mint",
																										600000);
																						$rootScope.SessionTime = 600000;
																						var count = [];
																						if (ans != 0) {
																							$scope.lenders = JSON
																									.parse(lenderresponse.data.result);
																							if ($scope.lenders.length == 0) {
																								$(
																										".view-offers-btn")
																										.hide();
																								$(
																										"#selector15")
																										.hide();
																								$(
																										"#lpinav")
																										.hide();
																							} else {
																								$(
																										".view-offers-btn")
																										.show();
																								$(
																										"#selector15")
																										.show();
																								$(
																										"#lpinav")
																										.show();
																								$scope.lendercount = JSON
																										.parse(lenderresponse.data.result).length;
																							}
																							$scope.lpi = JSON
																									.parse(lenderresponse.data.VCScore);
																							$scope.lpiValue = $scope.lpi[0].lpi;
																						
																							$scope.eligilbleLoanValue = $scope.lpi[0].eligilbleLoanAmount.toLocaleString('en-IN').replace(/\B(?=(\d{3})+(?!\d))/g,",");
																							$scope.loanshortfall=$scope.userIncome.loanValue-$scope.lpi[0].eligilbleLoanAmount;
																							$scope.owncontribution=$scope.userIncome.assetValue-$scope.lpi[0].eligilbleLoanAmount;
																							$scope.owncontribution = $scope.owncontribution.toLocaleString('en-IN').replace(/\B(?=(\d{3})+(?!\d))/g,",");
																							$scope.loanshortfall = $scope.loanshortfall.toLocaleString('en-IN').replace(/\B(?=(\d{3})+(?!\d))/g,",");
																							$scope.lpiVal = Math.round($scope.lpiValue);
																							count = JSON
																									.parse(lenderresponse.data.VCScore);
																						} else {
																							$scope.lenders = JSON
																									.parse(lenderresponse.data.result);
																							$scope.lpi = JSON
																									.parse(lenderresponse.data.VCScore);
																							if ($scope.lenders.length == 0) {
																								$(
																										".view-offers-btn")
																										.hide();
																								$(
																										"#selector15")
																										.hide();
																								$(
																										"#lpinav")
																										.hide();
																							} else {
																								$(
																										".view-offers-btn")
																										.show();
																								$(
																										"#selector15")
																										.show();
																								$(
																										"#lpinav")
																										.show();
																								$scope.lendercount = JSON
																										.parse(lenderresponse.data.result).length;
																							}
																							$scope.lpiValue = $scope.lpi[0].lpi;
																							$scope.eligilbleLoanValue = $scope.lpi[0].eligilbleLoanAmount.toLocaleString('en-IN').replace(/\B(?=(\d{3})+(?!\d))/g,",");
																							$scope.loanshortfall=$scope.userIncome.loanValue-$scope.lpi[0].eligilbleLoanAmount;
																							$scope.owncontribution=$scope.userIncome.assetValue-$scope.lpi[0].eligilbleLoanAmount;
																							$scope.owncontribution = $scope.owncontribution.toLocaleString('en-IN').replace(/\B(?=(\d{3})+(?!\d))/g,",");
																							$scope.loanshortfall = $scope.loanshortfall.toLocaleString('en-IN').replace(/\B(?=(\d{3})+(?!\d))/g,",");
																							$scope.lpiVal = Math.round($scope.lpiValue);
																							count = JSON
																									.parse(lenderresponse.data.VCScore);
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
															function errorCallback(
																	response) {
															});
										}
									}
									$scope.updatelpistatus = function() {
										if (localStorage
												.getItem("userLpiStatus") == "1") {
											getLpiService
													.updateLoginUserLpiStatus()
													.then(
															function successCallback(
																	response) {
																localStorage
																		.setItem(
																				"mint",
																				600000);
																$rootScope.SessionTime = 600000;
																if (response.data.Result == 'Success') {
																	$(
																			'#myModal')
																			.modal(
																					'hide');
																	localStorage
																			.setItem(
																					"userLpiStatus",
																					"2");
																	$scope.userLpiStatus = false;
																}
															},
															function errorCallback(
																	response) {
															});
										} else {
										}
									}
									$scope.next = function() {
										$state.go('index.loanOffers');
									}
								}
								$scope.backpage = function() {
									var info = localStorage.getItem("UserInfo");
									$rootScope.coApplicant = JSON.parse(info)['coApplicantId'];
									if ($rootScope.coApplicant == 1) {
										$state.go('index.creditCoApp');
									} else {
										$state.go('index.credit');
									}
								}

								$scope.viewOffers = function() {
									$state.go("index.loanOffers");
								}
								$scope.goLoanOffers = function() {
									$state.go("index.loanOffers");
								}

								// loan offers

								$scope.offmsg = function(lender) {
									if (lender != undefined) {
										var reqLoanAmount = $scope.userIncome.loanValue;
										var eliLoan = $scope.lpi[0].eligilbleLoanAmount;
									} else {
									}
									if ( $scope.lenders == undefined || $scope.lenders == null || $scope.lenders.length == 0) {
										$scope.overallstatus=1;
										$scope.lenderofferexists=1;
										if (reqLoanAmount > eliLoan && lender <= 40) {

											$scope.lpiStatus = '<p class="mrgbot3">We have evaluated your profile and loan request:</p>'
												+'<p class="mrgbot1" ><span class="paraDisp" style="line-height: 2.5;">Loan Eligibility: You do not appear to be eligible for the loan amount requested. You are more likely to be eligible for the amount mentioned.</span></p>'
												+'<p class="mrgbot1" ><span class="paraDisp" style="line-height: 2.5;">LPi: The LPi (Loan probabilty Index) for the loan amount you are eligible for is also poor. This indicates a low likelihood of securing a loan</span></p>'
												
												+'<p class="mrgbot3">We do not have any offers for you currently, but suggest that you review your information and do the following:</p>'
												+'<p class="mrgbot1" ><span class="paraDisp" style="line-height: 2.5;">Boost your loan eligibility by adding an earning co-applicant, ensuring you have included all income sources and also closing any existing loans you can.</span></p>'
												+'<p class="mrgbot1" ><span class="paraDisp" style="line-height: 2.5;">Add property information if not provided already and check your credit report as these may help improve your LPi and get offers.</span></p>'
											
											$scope.lpiStatusmsg = '<p class="mrgbot1" ><span class="paraDisp" style="line-height: 2.5;">LPi: The LPi (Loan probabilty Index) for the loan amount you are eligible for is also poor. This indicates a low likelihood of securing a loan</span></p>'
											$scope.eligibiliStatusmsg = '<p class="mrgbot1" ><span class="paraDisp" style="line-height: 2.5;">Loan Eligibility: You do not appear to be eligible for the loan amount requested. You are more likely to be eligible for the amount mentioned.</span></p>'+'<p class="mrgbot1" ><span class="paraDisp" style="line-height: 2.5;">Boost your loan eligibility by adding an earning co-applicant, ensuring you have included all income sources and also closing any existing loans you can.</span></p>'											
											$scope.overallstatus=0	
																

										} else if (reqLoanAmount > eliLoan && lender >= 41 && lender <= 60) {

											$scope.lpiStatus = '<p class="mrgbot3">We have evaluated your profile and loan request:</p>'
												+'<p class="mrgbot1" ><span class="paraDisp" style="line-height: 2.5;">Loan Eligibility: You do not appear to be eligible for the loan amount requested. You are more likely to be eligible for the amount mentioned.</span></p>'
												+'<p class="mrgbot1" ><span class="paraDisp" style="line-height: 2.5;">LPi: The LPi (Loan probabilty Index) for the loan amount you are eligible for is moderate. This indicates the likelihood of securing a loan.</span></p>'
												
												+'<p class="mrgbot3">We do not have any instant offers for you, but our loan advisor will reach out to you to discuss options.</p>'
												
												$scope.lpiStatusmsg = '<p class="mrgbot3">LPI MEssage</p>'			
											$scope.eligibiliStatusmsg = '<p class="mrgbot3">Eligibility MEssage</p>'
											$scope.overallstatus=1
											
										} else if (reqLoanAmount > eliLoan && lender >= 61) {

											$scope.lpiStatus = '<p class="mrgbot3">We have evaluated your profile and loan request:</p>'
												+'<p class="mrgbot1" ><span class="paraDisp" style="line-height: 2.5;">Loan Eligibility: You do not appear to be eligible for the loan amount requested. You are more likely to be eligible for the amount mentioned.</span></p>'
												+'<p class="mrgbot1" ><span class="paraDisp" style="line-height: 2.5;">LPi: The LPi (Loan probabilty Index) for the loan amount you are eligible for is high. This indicates a high chance that your home loan will be approved for the eligible amount.</span></p>'
												
												+'<p class="mrgbot3">We do not have any instant offers for you, but our loan advisor will reach out to you to discuss options.</p>'
												
												$scope.lpiStatusmsg = '<p class="mrgbot3">LPI MEssage</p>'			
											$scope.eligibiliStatusmsg = '<p class="mrgbot3">Eligibility MEssage</p>'
											$scope.overallstatus=1
											
										} else if (reqLoanAmount == eliLoan && lender <= 40) {

											$scope.lpiStatus = '<p class="mrgbot3">We have evaluated your profile and loan request:</p>'
												+'<p class="mrgbot1" ><span class="paraDisp" style="line-height: 2.5;">Loan Eligibility: You appear to be eligible for the loan amount requested. </span></p>'
												+'<p class="mrgbot1" ><span class="paraDisp" style="line-height: 2.5;">LPi: The LPi (Loan probabilty Index) for the loan amount you are eligible for is poor. This indicates a low likelihood of securing a loan.</span></p>'
												
												+'<p class="mrgbot3">We do not have any offers for you currently, but suggest that you review your information and do the following:</p>'
												+'<p class="mrgbot1" ><span class="paraDisp" style="line-height: 2.5;"> Add property information if not provided already and check your credit report as these may help improve your LPi and get offers.</span></p>'
												
												$scope.lpiStatusmsg = '<p class="mrgbot3">LPI MEssage</p>'			
											$scope.eligibiliStatusmsg = '<p class="mrgbot3">Eligibility MEssage</p>'
											$scope.overallstatus=0
											
										} else if (reqLoanAmount == eliLoan && lender >= 41 && lender <= 60) {

											$scope.lpiStatus = '<p class="mrgbot3">We have evaluated your profile and loan request:</p>'
												+'<p class="mrgbot1" ><span class="paraDisp" style="line-height: 2.5;"> Loan Eligibility: You appear to be eligible for the loan amount requested.</span></p>'
												+'<p class="mrgbot1" ><span class="paraDisp" style="line-height: 2.5;">LPi: The LPi (Loan probabilty Index) for the loan amount you are eligible for is moderate. This  indicates the likelihood of securing a loan.</span></p>'
												
												+'<p class="mrgbot3">We do not have any instant offers for you, but our loan advisor will reach out to you to discuss options.</p>'
												
												$scope.lpiStatusmsg = '<p class="mrgbot3">LPI MEssage</p>'			
											$scope.eligibiliStatusmsg = '<p class="mrgbot3">Eligibility MEssage</p>'
											$scope.overallstatus=1
											
											
										} else if (reqLoanAmount == eliLoan && lender >= 61) {
											
											$scope.lpiStatus = '<p class="mrgbot3">We have evaluated your profile and loan request:</p>'
												+'<p class="mrgbot1" ><span class="paraDisp" style="line-height: 2.5;">Loan Eligibility: You appear to be eligible for the loan amount requested. You are more likely to be eligible for the amount mentioned.</span></p>'
												+'<p class="mrgbot1" ><span class="paraDisp" style="line-height: 2.5;"> LPi: The LPi (Loan probabilty Index) for the loan amount you are eligible for is high. This indicates a high chance that your home loan will be approved for the eligible amount.</span></p>'
												
												+'<p class="mrgbot3">We do not have any instant offers for you, but our loan advisor will reach out to you to discuss options.</p>'
												
												$scope.lpiStatusmsg = '<p class="mrgbot3">LPI MEssage</p>'			
											$scope.eligibiliStatusmsg = '<p class="mrgbot3">Eligibility MEssage</p>'
											$scope.overallstatus=2
											
											
										}
									} else {
										
										$scope.lenderofferexists=0;
										if (reqLoanAmount > eliLoan && lender >= 41 && lender <= 60) {
											$scope.lpiStatus = '<p class="mrgbot3">We have evaluated your profile and loan request:</p>'
												+'<p class="mrgbot1" ><span class="paraDisp" style="line-height: 2.5;">Loan Eligibility: You do not appear to be eligible for the loan amount requested. You are more likely to be eligible for the amount mentioned.</span></p>'
												+'<p class="mrgbot1" ><span class="paraDisp" style="line-height: 2.5;"> LPi: The LPi (Loan probabilty Index) for the loan amount you are eligible for is moderate. This indicates the likelihood of securing a loan.</span></p>'
												
												+'<p class="mrgbot3">We do have some offers for you from our partner banks. You can view the offers and proceed to initiate the loan request. Our loan advisor will also reach out to you do discuss your options and suggest best lender.</p>'
												
											$scope.lpiStatusmsg = '<p class="mrgbot1" ><span class="paraDisp" style="line-height: 2.5;"> LPi: The LPi (Loan probabilty Index) for the loan amount you are eligible for is moderate. This indicates the likelihood of securing a loan.</span></p>'		
											$scope.eligibiliStatusmsg = '<p class="mrgbot1" ><span class="paraDisp" style="line-height: 2.5;">Loan Eligibility: You do not appear to be eligible for the loan amount requested. You are more likely to be eligible for the amount mentioned.</span></p>'
											$scope.overallstatus=1
											
											
										} else if (reqLoanAmount > eliLoan && lender >= 61) {
											$scope.lpiStatus = '<p class="mrgbot3">We have evaluated your profile and loan request:</p>'
												+'<p class="mrgbot1" ><span class="paraDisp" style="line-height: 2.5;"> Loan Eligibility: You do not appear to be eligible for the loan amount requested. You are more likely to be eligible for the amount mentioned.</span></p>'
												+'<p class="mrgbot1" ><span class="paraDisp" style="line-height: 2.5;">LPi: The LPi (Loan probabilty Index) for the loan amount you are eligible for is high. This indicates a high chance that your home loan will be approved for the eligible amount.</span></p>'
												
												+'<p class="mrgbot3">We do have some offers for you from our partner banks. You can view the offers and proceed to initiate the loan request. Our loan advisor will also reach out to you do discuss your options and suggest best lender.</p>'
												
												$scope.lpiStatusmsg = '<p class="mrgbot3">LPI MEssage</p>'			
											$scope.eligibiliStatusmsg = '<p class="mrgbot3">Eligibility MEssage</p>'
											$scope.overallstatus=1
											
										} else if (reqLoanAmount == eliLoan && lender >= 41 && lender <= 60) {
											
											$scope.lpiStatus = '<p class="mrgbot3">We have evaluated your profile and loan request:</p>'
												+'<p class="mrgbot1" ><span class="paraDisp" style="line-height: 2.5;"> Loan Eligibility: You appear to be eligible for the loan amount requested.</span></p>'
												+'<p class="mrgbot1" ><span class="paraDisp" style="line-height: 2.5;"> LPi: The LPi (Loan probabilty Index) for the loan amount you are eligible for is moderate. This indicates a medium chance that your home loan will be approved for the eligible amount.</span></p>'
												
												+'<p class="mrgbot3">We do have some offers for you from our partner banks. You can view the offers and proceed to initiate the loan request. Our loan advisor will also reach out to you do discuss your options and suggest best lender.</p>'
												
												$scope.lpiStatusmsg = '<p class="mrgbot3">LPI MEssage</p>'			
											$scope.eligibiliStatusmsg = '<p class="mrgbot3">Eligibility MEssage</p>'
											$scope.overallstatus=1

										} else if (reqLoanAmount == eliLoan && lender >= 61) {
											
											$scope.lpiStatus = '<p class="mrgbot3">We have evaluated your profile and loan request:</p>'
												+'<p class="mrgbot1" ><span class="paraDisp" style="line-height: 2.5;">Loan Eligibility: You appear to be eligible for the loan amount requested. </span></p>'
												+'<p class="mrgbot1" ><span class="paraDisp" style="line-height: 2.5;"> LPi: The LPi (Loan probabilty Index) for the loan amount you are eligible for is high. This indicates a high chance that your home loan will be approved for the eligible amount.</span></p>'
												
												+'<p class="mrgbot3">We do have some offers for you from our partner banks. You can view the offers and proceed to initiate the loan request. Our loan advisor will also reach out to you do discuss your options and suggest best lender.</p>'
												
												$scope.lpiStatusmsg = '<p class="mrgbot3">LPI MEssage</p>'			
												$scope.eligibiliStatusmsg = '<p class="mrgbot3">Eligibility MEssage</p>'
												$scope.overallstatus=2
											
										} else if (reqLoanAmount > eliLoan && lender <= 40) {
											
											$scope.lpiStatus = '<p class="mrgbot3">We have evaluated your profile and loan request:</p>'
												+'<p class="mrgbot1" ><span class="paraDisp" style="line-height: 2.5;">Loan Eligibility: You do not appear to be eligible for the loan amount requested. You are more likely to be eligible for the amount mentioned. </span></p>'
												+'<p class="mrgbot1" ><span class="paraDisp" style="line-height: 2.5;">LPi: The LPi (Loan probabilty Index) for the loan amount you are eligible for is also poor. This indicates that your chances of getting your home loan approved are low.</span></p>'
												
												+'<p class="mrgbot3">We do have offers for you, but suggest that you review your information and do the following and recalculate LPi to get the best offers. Alternatively, you can proceed to view current offers and initiate loan with lenders of your choice.</p>'
												+'<p class="mrgbot1" ><span class="paraDisp" style="line-height: 2.5;">Boost your loan eligibility by adding an earning co-applicant, ensuring you have included all income sources and also closing any existing loans you can.  </span></p>'
												+'<p class="mrgbot1" ><span class="paraDisp" style="line-height: 2.5;"> Add property information if not provided already and check your credit report as these may help improve your LPi and get offers.</span></p>'
												
												$scope.lpiStatusmsg = '<p class="mrgbot3">LPI MEssage</p>'			
											$scope.eligibiliStatusmsg = '<p class="mrgbot3">Eligibility MEssage</p>'
												$scope.overallstatus=0
											
										} else if (reqLoanAmount == eliLoan && lender <= 40) {
											
											$scope.lpiStatus = '<p class="mrgbot3">We have evaluated your profile and loan request:</p>'
												+'<p class="mrgbot1" ><span class="paraDisp" style="line-height: 2.5;">Loan Eligibility: You appear to be eligible for the loan amount requested.</span></p>'
												+'<p class="mrgbot1" ><span class="paraDisp" style="line-height: 2.5;"> LPi: However, the LPi (Loan probabilty Index) for the loan amount you are eligible for is poor. This indicates that your chances of getting your home loan approved are low.</span></p>'
												
												+'<p class="mrgbot3">We do have offers for you, but suggest that you review your information and do the following and recalculate LPi to get the best offers. Alternatively, you can proceed to view current offers and initiate loan with lenders of your choice.</p>'
												+'<p class="mrgbot1" ><span class="paraDisp" style="line-height: 2.5;">Add property information if not provided already and check your credit report as these may help improve your LPi and get offers.</span></p>'
												
												$scope.lpiStatusmsg = '<p class="mrgbot3">LPI MEssage</p>'			
												$scope.eligibiliStatusmsg = '<p class="mrgbot3">Eligibility MEssage</p>'
												$scope.overallstatus=0
										}
									}
								}

								// change LPI Color
								$scope.set_color = function(lender) {
									if (lender <= 20) {
										$('.back-color-' + lender.lenderId)
												.css('background-color', 'red');
										$scope.lpiStatus = "Very Poor";
									} else if (lender > 20 && lender <= 40) {
										$('.back-color-' + lender.lenderId)
												.css('background-color', 'orange');
										$scope.lpiStatus = "Poor";
									} else if (lender > 40 && lender <= 60) {
										$(".back-color-" + lender.lenderId)
												.css('background-color','yellow');
										$scope.lpiStatus = "Moderate";
									} else if (lender > 60 && lender <= 80) {
										$(".back-color-" + lender.lenderId)
												.css('background-color','#90EE90');
										$scope.lpiStatus = "Good";
									} else if (lender > 80 && lender <= 100) {
										$(".back-color-" + lender.lenderId)
												.css('background-color','green');
										$scope.lpiStatus = "Excellent";
									} else {
										$scope.lpiStatus = "No Lpi";
									}
								}

								function getCoApplicantValue() {
									getLpiService
											.getCoApplicantId()
											.then(
													function successCallback(
															response) {
														localStorage.setItem(
																"mint", 600000);
														$rootScope.SessionTime = 600000;
														$scope.result = JSON
																.parse(response.data.result)['#result-set-1'];
														
														var coappliID = $scope.result[0] == "" || $scope.result[0] == null || $scope.result[0] == undefined ? "" : $scope.result[0].userid ;
														
														var data = $
																.param({
																	'listOfUserId' : JSON
																			.stringify($scope.result)
																});
														getLpiService
																.getCoApplicantDetailsUsingListOfUserId(
																		data)
																.then(
																		function successCallback(
																				coApplicantsresponse) {
																			localStorage
																					.setItem(
																							"mint",
																							600000);
																			$rootScope.SessionTime = 600000;
																			$scope.coApplicants = JSON
																					.parse(coApplicantsresponse.data.Result);
																			localStorage.setItem("coApplicantDetails",coApplicantsresponse.data.Result);
																			
																			var coappfname = $scope.coApplicants[0] == undefined || $scope.coApplicants[0] == null || $scope.coApplicants[0] == "" ? "Not Added" : $scope.coApplicants[0].firstName;
																			var coapplname = $scope.coApplicants[0] == undefined || $scope.coApplicants[0] == null || $scope.coApplicants[0] == "" ? "" : $scope.coApplicants[0].lastName ; 
																			$rootScope.coAppnamedata = coappfname + " " + coapplname;
																		});
													});
								};
								
								$scope.linkfin = function() {

									var info = localStorage.getItem("UserInfo");
									var linc = JSON.parse(info)['coApplicantId'];
									if (linc != 0) {
										$('#linkchng').html(
														'<i style="padding: 0 1%;font-size: 16px;" class="fa fa-angle-double-left"></i>Credit CoApp');

									} else {
										$('#linkchng').html(
														'<i style="padding: 0 1%;font-size: 16px;" class="fa fa-angle-double-left"></i>Credit');
									}
								}

							} ]);
})();