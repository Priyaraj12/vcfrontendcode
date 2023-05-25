var Ps = Ps || {};

(function() {
	'use strict';
	angular
			.module('financial')

			.controller(
					'financialController',
					[
							'$state',
							'$http',
							'$scope',
							'getcokkies',
							'config',
							'$rootScope',
							'dropDown',
							'vJson',
							'financialService',
							'regex',
							'$location',
							function($state, $http, $scope, getcokkies, config,
									$rootScope, dropDown, vJson,
									financialService, regex, $location) {
								dropDown.updateFinancialDropdown();
								$rootScope.username = localStorage
										.getItem("user_name");
								$rootScope.assetShow = parseInt(localStorage
										.getItem("assetShow"));
								$rootScope.coApplicant = parseInt(localStorage
										.getItem("coApplicant"));
								$rootScope.coApplicantDetails = localStorage
										.getItem("coApplicantDetails");
								$scope.omitdata = [];
								$scope.loader = true;
								$scope.success = false;
								$scope.disableScore = false;
								$scope.companiesData;
								var finNav = parseInt(localStorage
										.getItem('PAGE_COMPLETED'));
								$rootScope.PAGE_COMPLETED = finNav;
								$scope.PAGE_COMPLETED = finNav;
								if (finNav >= 4) {
									$('#linknxt').css('pointer-events', 'auto');
								} else {
									$('#linknxt').css('pointer-events', 'none');
								}
								angular.element(document).ready(function() {
									$('#selector2').trigger('click');
								
									
								});
								financialService.getCoApplicantId().then(function successCallback(response) {
					             	localStorage.setItem("mint", 600000);
					            	$rootScope.SessionTime = 600000;
					                $scope.result = JSON.parse(response.data.result)['#result-set-1'];               
					               var coappliID = $scope.result[0] == "" || $scope.result[0] == null || $scope.result[0] == undefined ? "" : $scope.result[0].userid;
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


							
								financialService.getCreditScoreValue()
										.then(
												function successCallback(response) {
													localStorage.setItem("mint", 600000);
													$rootScope.SessionTime = 600000;
													var t = JSON.parse(response.data.userInfo);
													$scope.loader = false;
													if (t.mycreditScore != null) {
														if (t.mycreditScore >= 0
																&& t.mycreditScore <= 300) {
															$scope.creditScoreValue = "0-300";
														} else if (t.mycreditScore > 300
																&& t.mycreditScore <= 500) {
															$scope.creditScoreValue = "301-500";
														} else if (t.mycreditScore > 500
																&& t.mycreditScore <= 800) {
															$scope.creditScoreValue = "501-800";
														} else if (t.mycreditScore > 800
																&& t.mycreditScore <= 1000) {
															$scope.creditScoreValue = "801-1000";
														}
														$scope.disableScore = true;
													}
												});
						

/* Commented out by Priyaraj on Feb 15, 2023 as https://api.probe42.in/probe_lite/companies API throwing forbidden error */
/* Reusing this place but calling financialService.getorganizationlistusingemployernameandcategory instead of financialService.getcompanylistusingprobe
on 23-02-2023 by Priyaraj */
/*financialService.getcompanylistusingprobe(val)
											.then(
													function successCallback(
															response) {
														var resData=response.data.Page;
														var orgNameArray = JSON.parse(resData);
														$scope.orgNameCUN= orgNameArray.data.companies;
														
														localStorage.setItem('companiesData',response.data.Page);
														var ss = JSON.parse(localStorage.getItem('companiesData'));
														$scope.companyList=ss.data.companies;
													});
													*/
								 $scope.orgType = function(employerName,categoryId) {									 
									 var occupationType = document.getElementById("occupationType").value;
									 occupationType = occupationType.charAt(occupationType.length-1);
									 //alert("occupationType.." + occupationType);
									 var data = $.param({
												'employerName' : employerName,
												'categoryId' : parseInt(occupationType),
											});
									 //alert("data.." + data);
									if($('#OrganisationName').val().length >= 3){					
									
									financialService.getorganizationlistusingemployernameandcategory(data)
											.then(
													
													function successCallback(
															response) {
														var resData=response.data.Result;
														//alert(resData);
														
														$scope.orgNameArray = JSON.parse(resData);
														//alert("orgNameArray.." + $scope.orgNameArray);
														/*$scope.orgNameCUN= orgNameArray.data.companies;
														
														localStorage.setItem('companiesData',response.data.Page);
														var ss = JSON.parse(localStorage.getItem('companiesData'));*/
														//$scope.companyList=ss.data.companies;
														$scope.destArray = _.uniq($scope.orgNameArray, function(x) {
											                    });
														$scope.loader = false;
														//$scope.companyList = $scope.orgNameArray;
													},
													function errorCallback(
																response) {
													}
												);
								} else{
									
								}
								} 


								/*$scope.change = function(legalName) {
									financialService.getcompanylistusingcin(
											legalName.cin).then(
											function successCallback(response) {
												localStorage.setItem('overallCompanyDetails',response.data.Page);
											});
								}*/
/* Commented out by Priyaraj on Feb 15, 2023 as https://api.probe42.in/probe_lite/companies API throwing forbidden error */
								$scope.incomeChnge = function(e, index) {
									$('#freqIncome-' + index).val('');
									if (e == 1 || e == 2 || e == 4) {
										$('#freqIncome-' + index).val('number:1');
										$('#freqIncome-' + index).attr('disabled', 'disabled');
									} else {
										$('#freqIncome-' + index).val('');
										$('#freqIncome-' + index).removeAttr('disabled');
									}
								}
								setFinancialDropdown();
								setFinancialValue();
								$scope.incomeClone = incomeClone;
								$scope.loanClone = loanClone;
								$scope.salaryClone = salaryClone;
								$scope.removeIncome = removeIncome;
								$scope.removeLoan = removeLoan;
								$scope.removeSalary = removeSalary;
								$scope.numericOnly = numericOnly;
								$scope.setSegment = setSegment;
								$scope.removeText = removeText;
								$scope.removeTextTerm = removeTextTerm;
								$scope.reset = reset;
								$scope.removeAllError = removeAllError;
							//	$scope.setCreditScore = setCreditScore;
								$scope.linkNext = linkNext;
								$scope.convertNumberToWords = convertNumberToWords;
																
								/**
								* on change function OccupationType
								*/
								$scope.selectedOccupationType = function(id) {
									/*if(id == 0){
										id = 1;
									}*/
									$scope.skipValues = function(value, index,array) {
										if (id == 4) {
											$(".orgName").addClass('addTop');
											$scope.userInfo.employerName = "";
											$scope.userInfo.yearsofServiceinIndustry = "";
											$scope.userInfo.yearsofServicewithEmployer = "";
											var list = [];
											$scope.IT = $scope.IncomeType;
											$scope.IncomeType = _
													.without(
															$scope.IncomeType,
															_
																	.findWhere(
																			$scope.IncomeType,
																			{
																				refIncomeTypeId : 0
																			}));
											return $scope.IncomeType;
									/*	}else if(id == 1){
											$scope.userInfo.occupationcategoryid = "";
												$scope.userInfo.categorydetail = "";
												$(".orgName").removeClass('addTop');
												return $scope.IncomeType; */
										}else{
											/*$scope.userInfo.employerName = "";*/
											$(".orgName").removeClass('addTop');
											return $scope.IncomeType;
										}
									};
									
									
									var occId = $.param({
										"OccupationtypeId":id	
									});
									
									
									financialService.getListOfOccupationCategory(occId).then(function successCallback(response){
										$scope.occCatyId = JSON.parse(response.data.Result);
									});
									$scope.incomes = [];
									$scope.loanDatas = [];
									$scope.salaryDatas = [];
									$scope.UserSalary = [];
									$scope.UserLoan = [];
									$scope.userIncome = [];
									incomeClone();
									//loanClone();
									
									
									$scope.userInfo.annualSales = 0;
									$scope.userInfo.annualProfit = 0;
									$scope.userInfo.ownershipShare = 99;
									$scope.userInfo.employeeCount = 0;
									$scope.userInfo.annualSalesPY = 0;
									$scope.userInfo.annualProfitPY = 0;
									$scope.userInfo.officeType = 0;
									$scope.userInfo.businessConstitution = 0;
									
								}
								
								/**
								 * on change function IT Filed
								 */
								$scope.selectedITFiled = function() {
									
									$scope.userInfo.annualSales = 0;
									$scope.userInfo.annualProfit = 0;
									$scope.userInfo.annualSalesPY = 0;
									$scope.userInfo.annualProfitPY = 0;
									
								}

								$scope.removetextexp = function(val) {
									return val.replace(/[^0-9\/]+/g, "");
								}

								$scope.numericOnly = function(event, val) {
									// skip for arrow keys
									if (event.which >= 37 && event.which <= 40) {
										event.preventDefault();
									}
									var $this = $(this);
									var num = val.replace(/,/gi, "").split("")
											.reverse().join("");

									var num2 = RemoveRougeChar(num.replace(
											/[^0-9]+/g, '').replace(/(.{3})/g,
											"$1,").split("").reverse().join(""));
									return num2;
								};
								// start of function to replace commas in amount 
								String.prototype.replaceAll = function(search,
										replacement) {
									var target = this;
									return target.replace(new RegExp(search,
											'g'), replacement);
								};

								$scope.commaSeparatedNumeric = function(event,val) {
									
									if (val != undefined) {
										var input = val.replaceAll(',', '');
										if (input.length < 1) {
											$(this).val('0.00');
										} else {
											var val = parseFloat(input);
											var formatted = inrFormat(input);
											if (formatted.indexOf('.') > 0) {
												var split = formatted
														.split('.');
												formatted = split[0]
														+ '.'
														+ split[1].substring(0,2);
											}
											return formatted;
										}
									}
									return val;
								};

								function inrFormat(val) {
									var x = val;
									x = x.toString();
									var afterPoint = '';
									if (x.indexOf('.') > 0)
										afterPoint = x.substring(
												x.indexOf('.'), x.length);
									x = Math.floor(x);
									x = x.toString();
									var lastThree = x.substring(x.length - 3);
									var otherNumbers = x.substring(0,
											x.length - 3);
									if (otherNumbers != '')
										lastThree = ',' + lastThree;
									var res = otherNumbers.replace(
											/\B(?=(\d{2})+(?!\d))/g, ",")
											+ lastThree + afterPoint;
									return res;
								}
								// end of function to replace commas in amount

								$scope.convertNumberToWords = function(amount) {
									var words = new Array();
									words[0] = '';
									words[1] = 'One';
									words[2] = 'Two';
									words[3] = 'Three';
									words[4] = 'Four';
									words[5] = 'Five';
									words[6] = 'Six';
									words[7] = 'Seven';
									words[8] = 'Eight';
									words[9] = 'Nine';
									words[10] = 'Ten';
									words[11] = 'Eleven';
									words[12] = 'Twelve';
									words[13] = 'Thirteen';
									words[14] = 'Fourteen';
									words[15] = 'Fifteen';
									words[16] = 'Sixteen';
									words[17] = 'Seventeen';
									words[18] = 'Eighteen';
									words[19] = 'Nineteen';
									words[20] = 'Twenty';
									words[30] = 'Thirty';
									words[40] = 'Forty';
									words[50] = 'Fifty';
									words[60] = 'Sixty';
									words[70] = 'Seventy';
									words[80] = 'Eighty';
									words[90] = 'Ninety';
									amount = amount.toString();
									var atemp = amount.split(".");
									var number = atemp[0].split(",").join("");
									var n_length = number.length;
									var words_string = "";
									if (n_length <= 9) {
										var n_array = new Array(0, 0, 0, 0, 0,
												0, 0, 0, 0);
										var received_n_array = new Array();
										for (var i = 0; i < n_length; i++) {
											received_n_array[i] = number
													.substr(i, 1);
										}
										for (var i = 9 - n_length, j = 0; i < 9; i++, j++) {
											n_array[i] = received_n_array[j];
										}
										for (var i = 0, j = 1; i < 9; i++, j++) {
											if (i == 0 || i == 2 || i == 4
													|| i == 7) {
												if (n_array[i] == 1) {
													n_array[j] = 10 + parseInt(n_array[j]);
													n_array[i] = 0;
												}
											}
										}
										var value = "";
										for (var i = 0; i < 9; i++) {
											if (i == 0 || i == 2 || i == 4
													|| i == 7) {
												value = n_array[i] * 10;
											} else {
												value = n_array[i];
											}
											if (value != 0) {
												words_string += words[value]
														+ " ";
											}
											if ((i == 1 && value != 0)
													|| (i == 0 && value != 0 && n_array[i + 1] == 0)) {
												words_string += "Crores ";
											}
											if ((i == 3 && value != 0)
													|| (i == 2 && value != 0 && n_array[i + 1] == 0)) {
												words_string += "Lakhs ";
											}
											if ((i == 5 && value != 0)
													|| (i == 4 && value != 0 && n_array[i + 1] == 0)) {
												words_string += "Thousand ";
											}
											if (i == 6
													&& value != 0
													&& (n_array[i + 1] != 0 && n_array[i + 2] != 0)) {
												words_string += "Hundred and ";
											} else if (i == 6 && value != 0) {
												words_string += "Hundred ";
											}
										}
										words_string = words_string.split("  ")
												.join(" ");
									}
									return words_string;
								}
								/* Methods */
								
								/**
								 * function to set page values to each fields 
								 */
								function setFinancialDropdown() {
									$scope.dropdown = JSON.parse(localStorage.getItem('dropdown'));
									var ee = JSON.parse($scope.dropdown.OccupationType);
									$scope.occupationTypes = [];
									$scope.occupationTypes.push(ee[0]);
									$scope.occupationTypes.push(ee[1]);
									$scope.occupationTypes.push(ee[2]);
									console.log("ty",$scope.occupationTypes);
									//$scope.userInfo.occupationTypeId == 1;
									$scope.ListOfCreditScore = JSON.parse($scope.dropdown.CreditScore);
									$scope.IncomeType = JSON.parse($scope.dropdown.IncomeType);
									$scope.frequencyType = JSON.parse($scope.dropdown.frequencyType);
									$scope.LoanLenderType = JSON.parse($scope.dropdown.LoanLenderType);
									$scope.LoanType = JSON.parse($scope.dropdown.LoanType);
									$scope.IndustrySector = JSON.parse($scope.dropdown.IndustrySector);
									$scope.EmployerName = JSON.parse($scope.dropdown.EmployerName);
									$scope.SalaryDeduction = JSON.parse($scope.dropdown.SalaryDeduction);
									$scope.businessConstitutionList =
										[ 
											{ name: 'Proprietorship', id: 1 },  
											{ name: 'Pvt. Ltd.', id: 2 },  
											{ name: 'Partnership', id: 3 },
											{ name: 'One Person Company', id: 4 },
											{ name: 'Limited Company', id: 5 },
											{ name: 'Limited Liability Partnership (LLP)', id: 6 },
											{ name: 'Other', id: 7 },
											{ name: 'Not Registered', id: 8 },
                    	{ name: 'Government', id: 9 },
											{ name: 'Public Sector Undertaking(PSU)', id: 10 },
											{ name: 'Not for profit', id: 11 },
										];
									$scope.employeeCountList =
										[ 
											{ name: '1-10', id: 1 },  
											{ name: '11-50', id: 2 },  
											{ name: '51 - 100', id: 3 },
											{ name: '101 - 1000', id: 4 },
											{ name: '1001 - 5000', id: 5 },
											{ name: 'More than 5000', id: 6 }
										];
									$scope.annualSalesList =
										[ 
											{ name: '0 - 3 Lacs', id: 1 },  
											{ name: '3 - 10 Lacs', id: 2 },  
											{ name: '10 - 25 Lacs', id: 3 },
											{ name: '25 - 50 Lacs', id: 4 },
											{ name: '50 Lacs - 1 Crore', id: 5 },
											{ name: '1 - 10 Crore', id: 6 },
											{ name: 'More than 10 Crore', id: 7 }
										];
									$scope.annualProfitList =
										[ 
											{ name: 'No Profit - Net Loss', id: 1 },  
											{ name: 'Less than 3 Lacs', id: 2 },  
											{ name: '3 - 10 Lacs', id: 3 },  
											{ name: '10 - 25 Lacs', id: 4 },
											{ name: '25 - 50 Lacs', id: 5 },
											{ name: '50 Lacs - 1 Crore', id: 6 },
											{ name: '1 - 10 Crore', id: 7 },
											{ name: 'More than 10 Crore', id: 8 }
										];
									$scope.officeTypeList =
										[ 
											{ name: 'Owned', id: 1 },  
											{ name: 'Rented / Leased', id: 2 },  
											{ name: 'Shared / Co-Workspace', id: 3 },  
											{ name: 'Work from Home', id: 4 },
  											{ name: 'No Office Needed', id: 5 } 											
										];
//Added additional banks as per latest business requirement by Priyaraj on 28-03-2023
									$scope.primaryBankList =
										[ 
										{ name: 'I don’t have a bank account', id: 999},
										{ name: 'AB Bank Ltd.', id: 308},
{ name: 'Abu Dhabi Commercial Bank PJSC', id: 309},
{ name: 'Abu Dhabi Commercial Bank', id: 197},
{ name: 'Airtel Payments Bank', id: 256},
{ name: 'Allahabad Bank', id: 148},
{ name: 'American Express Banking Corporation', id: 310},
{ name: 'Andhra Bank', id: 149},
{ name: 'Andhra Pradesh Grameena Vikas Bank', id: 267},
{ name: 'Andhra Pragathi Grameena Bank', id: 268},
{ name: 'Arunachal Pradesh Rural Bank', id: 269},
{ name: 'Aryavart Bank', id: 270},
{ name: 'Assam Gramin Vikash Bank', id: 266},
{ name: 'Au Small Finance Bank', id: 244},
{ name: 'Australia and New Zealand Banking Group Ltd.', id: 311},
{ name: 'Axis Bank', id: 180},
{ name: 'Bandan Bank', id: 196},
{ name: 'Bandhan Bank', id: 238},
{ name: 'Bangiya Gramin Vikash Bank Bank', id: 271},
{ name: 'Bank of America', id: 313},
{ name: 'Bank of Bahrain & Kuwait B.S.C.', id: 314},
{ name: 'Bank of Baroda', id: 150},
{ name: 'Bank of Ceylon', id: 315},
{ name: 'Bank of China', id: 316},
{ name: 'Bank of India', id: 151},
{ name: 'Bank of Maharashtra', id: 152},
{ name: 'Bank of Nova Scotia', id: 317},
{ name: 'Barclays Bank Plc.', id: 312},
{ name: 'Barclays Bank', id: 187},
{ name: 'Baroda Gujarat Gramin Bank', id: 272},
{ name: 'Baroda Rajasthan Kshetriya Grami Bank', id: 273},
{ name: 'Baroda UP Bank', id: 274},
{ name: 'BNP Paribas', id: 318},
{ name: 'Canara Bank', id: 153},
{ name: 'Capital Small Finance Bank', id: 245},
{ name: 'Catholic Syrian Bank', id: 168},
{ name: 'Central Bank of India', id: 154},
{ name: 'Chaitanya Godavari GB Bank', id: 275},
{ name: 'Chhattisgarh Rajya Gramin Bank', id: 276},
{ name: 'Citibank N.A.', id: 319},
{ name: 'Citibank', id: 189},
{ name: 'City Union Bank', id: 169},
{ name: 'Coastal Local Area Bank', id: 242},
{ name: 'Cooperatieve Rabobank U.A./ Coöperatieve Centrale Raiffeisen-Boerenleenbank B.A.', id: 320},
{ name: 'Corporation Bank', id: 155},
{ name: 'Credit Agricole Corporate & Investment Bank', id: 321},
{ name: 'Credit Suisse AG', id: 322},
{ name: 'CSB Bank', id: 239},
{ name: 'CTBC Bank Co., Ltd.', id: 323},
{ name: 'Dakshin Bihar Gramin Bank', id: 277},
{ name: 'DBS Bank India Limited', id: 324},
{ name: 'DBS Bank', id: 190},
{ name: 'DCB Bank', id: 240},
{ name: 'Dena Bank', id: 156},
{ name: 'Deutsche Bank A.G.', id: 325},
{ name: 'Deutsche Bank', id: 191},
{ name: 'Development Credit Bank', id: 181},
{ name: 'Dhanlaxmi Bank', id: 170},
{ name: 'Dhanlaxmi Bank', id: 241},
{ name: 'Doha Bank Q.P.S.C', id: 326},
{ name: 'Ellaquai Dehati Bank', id: 278},
{ name: 'Emirates NBD Bank PJSC', id: 327},
{ name: 'Equitas Bank', id: 236},
{ name: 'Equitas Small Finance Bank', id: 247},
{ name: 'ESAF Small Finance Bank', id: 248},
{ name: 'Export-Import Bank of India', id: 263},
{ name: 'Federal Bank', id: 171},
{ name: 'Fin Growth Co-Op bank Ltd', id: 199},
{ name: 'Fincare Small Finance Bank', id: 246},
{ name: 'FINO Payments Bank', id: 258},
{ name: 'First Abu Dhabi Bank PJSC', id: 328},
{ name: 'FirstRand Bank Limited', id: 329},
{ name: 'HDFC Bank', id: 182},
{ name: 'Himachal Pradesh Gramin Bank', id: 279},
{ name: 'Hong Kong and Shanghai Banking Corporation Limited', id: 330},
{ name: 'HSBC', id: 192},
{ name: 'ICICI Bank', id: 183},
{ name: 'IDBI Bank Ltd.', id: 157},
{ name: 'IDFC Bank', id: 195},
{ name: 'India Post Payments Bank', id: 257},
{ name: 'Indian Bank', id: 158},
{ name: 'Indian Overseas Bank', id: 159},
{ name: 'IndusInd Bank', id: 184},
{ name: 'Industrial & Commercial Bank of China Ltd.', id: 331},
{ name: 'Industrial Bank of Korea', id: 332},
{ name: 'J&K Grameen Bank', id: 280},
{ name: 'J.P. Morgan Chase Bank N.A.', id: 333},
{ name: 'Jammu & Kashmir Bank', id: 172},
{ name: 'Jana Small Finance Bank', id: 253},
{ name: 'Jharkhand Rajya Gramin Bank', id: 353},
{ name: 'Jio Payments Bank', id: 260},
{ name: 'JSC VTB Bank', id: 334},
{ name: 'Karnataka Bank', id: 173},
{ name: 'Karnataka Gramin Bank', id: 281},
{ name: 'Karnataka Vikas Gramin Bank', id: 282},
{ name: 'Karur Vysya Bank', id: 174},
{ name: 'KEB Hana Bank', id: 335},
{ name: 'Kerala Gramin Bank', id: 283},
{ name: 'Kookmin Bank', id: 336},
{ name: 'Kotak Mahindra Bank', id: 185},
{ name: 'Krishna Bhima Samruddhi Bank', id: 243},
{ name: 'Krung Thai Bank Public Co. Ltd. $', id: 337},
{ name: 'Lakshmi Vilas Bank', id: 175},
{ name: 'Madhya Pradesh Gramin Bank', id: 284},
{ name: 'Madhyanchal Gramin Bank', id: 285},
{ name: 'Maharashtra Gramin Bank', id: 286},
{ name: 'Manipur Rural Bank', id: 287},
{ name: 'Mashreq bank PSC', id: 338},
{ name: 'Meghalaya Rural Bank', id: 288},
{ name: 'Mizoram Rural Bank', id: 289},
{ name: 'Mizuho Bank Ltd.', id: 339},
{ name: 'MUFG Bank, Ltd.', id: 340},
{ name: 'Nagaland Rural Bank', id: 290},
{ name: 'Nainital Bank', id: 176},
{ name: 'National Bank for Agriculture and Rural Development Bank', id: 262},
{ name: 'National Housing Bank', id: 264},
{ name: 'NatWest Markets Plc', id: 341},
{ name: 'North East Small finance Bank', id: 252},
{ name: 'NSDL Payments Bank', id: 261},
{ name: 'Odisha Gramya Bank', id: 291},
{ name: 'Oriental Bank of Commerce', id: 160},
{ name: 'Paschim Banga Gramin Bank', id: 292},
{ name: 'Paytm Payments Bank', id: 259},
{ name: 'Prathama U.P. Gramin Bank', id: 293},
{ name: 'PT Bank Maybank Indonesia TBK', id: 342},
{ name: 'Puduvai Bharathiar Grama Bank', id: 294},
{ name: 'Punjab and Sind Bank', id: 161},
{ name: 'Punjab Gramin Bank', id: 295},
{ name: 'Punjab National Bank', id: 162},
{ name: 'Qatar National Bank (Q.P.S.C.)', id: 343},
{ name: 'Rajasthan Marudhara Gramin Bank', id: 296},
{ name: 'Ratnakar Bank', id: 177},
{ name: 'RBL Bank', id: 237},
{ name: 'Royal Bank of Scotland', id: 193},
{ name: 'Saptagiri Grameena Bank', id: 297},
{ name: 'Saraswat Bank', id: 200},
{ name: 'Sarva Haryana Gramin Bank', id: 298},
{ name: 'Saurashtra Gramin Bank', id: 299},
{ name: 'Sberbank', id: 344},
{ name: 'SBM Bank (India) Limited', id: 345},
{ name: 'Shinhan Bank', id: 346},
{ name: 'Shivalik Small Finance Bank', id: 254},
{ name: 'Small Industries Development Bank of India', id: 265},
{ name: 'Societe Generale India', id: 347},
{ name: 'Sonali Bank Ltd. %', id: 348},
{ name: 'South Indian Bank', id: 178},
{ name: 'Standard Chartered Bank', id: 194},
{ name: 'Standard Chartered Bank', id: 349},
{ name: 'State Bank of Bikaner & Jaipur', id: 143},
{ name: 'State Bank of Hyderabad', id: 144},
{ name: 'State Bank of India', id: 142},
{ name: 'State Bank of Mysore', id: 145},
{ name: 'State Bank of Patiala', id: 146},
{ name: 'State Bank of Travancore', id: 147},
{ name: 'Sumitomo Mitsui Banking Corporation', id: 350},
{ name: 'Suryoday Small Finance Bank', id: 249},
{ name: 'Syndicate Bank', id: 163},
{ name: 'Tamil Nadu Grama Bank', id: 300},
{ name: 'Tamilnad Mercantile Bank', id: 179},
{ name: 'Telangana Grameena Bank', id: 301},
{ name: 'Tripura Gramin Bank', id: 302},
{ name: 'UCO Bank', id: 164},
{ name: 'Ujjivan Small Finance Bank', id: 250},
{ name: 'Union Bank of India', id: 165},
{ name: 'United Bank of India', id: 166},
{ name: 'United Overseas Bank Limited', id: 351},
{ name: 'Unity Small Finance Bank', id: 255},
{ name: 'Utkal Grameen Bank', id: 304},
{ name: 'Utkarsh Small Finance Bank', id: 251},
{ name: 'Uttar Bihar Gramin Bank', id: 303},
{ name: 'Uttarakhand Gramin Bank', id: 307},
{ name: 'Uttarbanga Kshetriya Gramin Bank', id: 305},
{ name: 'Vidharbha Konkan Gramin Bank', id: 306},
{ name: 'Vijaya Bank', id: 167},
{ name: 'Woori Bank', id: 352},
{ name: 'Yes Bank', id: 186},
{ name: 'Others', id: 235}

											];	
									
									$scope.destArray = _.uniq(
											$scope.EmployerName, function(x) {
											});
									angular.forEach(
													$scope.IncomeType,
													function(value, key) {
														$scope.IncomeType[key].disabled = false;
													});
									
//									$scope.selectedOccupationType();
								};

								/**
								 * function to set saved values 
								 */
								function setFinancialValue() {
									
									$scope.incomes = [];
									$scope.loanDatas = [];
									$scope.salaryDatas = [];
									$scope.UserSalary = [];
									$scope.UserLoan = [];
									$scope.userIncome = [];
									$scope.personalInfo = JSON.parse(localStorage.getItem("UserInfo"));
									$scope.userInfo = JSON.parse(localStorage.getItem("UserEmployment"));
									
									$scope.userInfo.assetValue = $scope.userInfo.assetValue.toLocaleString('en-IN').replace(/\B(?=(\d{3})+(?!\d))/g,",");
									$scope.userInfo.loanValue = $scope.userInfo.loanValue.toLocaleString('en-IN').replace(/\B(?=(\d{3})+(?!\d))/g,",");
									$scope.userIncome = JSON.parse(localStorage.getItem("UserIncome"));
									$scope.UserLoan = JSON.parse(localStorage.getItem("UserLoan"));
									$scope.UserSalary = JSON.parse(localStorage.getItem("UserSalary"));
									$scope.checkassets = JSON.parse(localStorage.getItem("UserInfo")).propertyIdentifierId;
									$scope.checkcoApplicant = JSON.parse(localStorage.getItem("UserInfo")).coApplicantId;
									$scope.userInfo.refCreditScoreId = $scope.userInfo.refCreditScoreId ? $scope.userInfo.refCreditScoreId : 1;
									
									$scope.userInfo.itfiled = $scope.userInfo.itfiled ? $scope.userInfo.itfiled : 0;
									$scope.userInfo.primaryBank = $scope.userInfo.primaryBank == null || $scope.userInfo.primaryBank == undefined ? 0 : $scope.userInfo.primaryBank;
									
									
									if($scope.userInfo.occupationTypeId == 0 )
									{
										$scope.userInfo.occupationTypeId = 1;
																				
									}
								/*	
									if($scope.userInfo.occupationTypeId == 3 )
									{ */
									$scope.userInfo.annualSales = $scope.userInfo.annualSales == null || $scope.userInfo.annualSales == undefined ? 0 : $scope.userInfo.annualSales;
									$scope.userInfo.annualProfit = $scope.userInfo.annualProfit == null || $scope.userInfo.annualProfit == undefined ? 0 : $scope.userInfo.annualProfit;
									$scope.userInfo.ownershipShare = $scope.userInfo.ownershipShare == null || $scope.userInfo.ownershipShare == undefined ? 99 : $scope.userInfo.ownershipShare;
									$scope.userInfo.employeeCount = $scope.userInfo.employeeCount == null || $scope.userInfo.employeeCount == undefined ? 0 : $scope.userInfo.employeeCount;
									$scope.userInfo.annualSalesPY = $scope.userInfo.annualSalesPY == null || $scope.userInfo.annualSalesPY == undefined ? 0 : $scope.userInfo.annualSalesPY;
									$scope.userInfo.annualProfitPY = $scope.userInfo.annualProfitPY == null || $scope.userInfo.annualProfitPY == undefined ? 0 : $scope.userInfo.annualProfitPY;
									$scope.userInfo.officeType = $scope.userInfo.officeType == null || $scope.userInfo.officeType == undefined ? 0 : $scope.userInfo.officeType;
									$scope.userInfo.businessConstitution = $scope.userInfo.businessConstitution == null || $scope.userInfo.businessConstitution == undefined ? 0 : $scope.userInfo.businessConstitution;
								/*	}
									
									if($scope.userInfo.occupationTypeId == 1)
									{
									$scope.userInfo.annualSales = 0;
									$scope.userInfo.annualProfit = 0;
									$scope.userInfo.ownershipShare = 99;
									$scope.userInfo.employeeCount = 0;
									$scope.userInfo.annualSalesPY = 0;
									$scope.userInfo.annualProfitPY = 0;
									$scope.userInfo.officeType = 0;
									$scope.userInfo.businessConstitution = 0;
									}
									*/
									
									var catId = $scope.userInfo.occupationcategoryid;
									
									var occId = $.param({
										"OccupationtypeId":$scope.userInfo.occupationTypeId
									});
									financialService.getListOfOccupationCategory(occId).then(function successCallback(response){
										$scope.occCatyId = JSON.parse(response.data.Result);
										getCatLabel(catId,"");
									});
								
									
									console.log("asd",$scope.incomes);
									 if($scope.userInfo.occupationTypeId == 1 ){
										 $scope.incomeTypefltr = [];
										 
										 for(var id in $scope.IncomeType){
												if($scope.IncomeType[id].occupationTypeId == 1){
													$scope.incomeTypefltr.push($scope.IncomeType[id]);
												}
											}
									 	}
									 else if($scope.userInfo.occupationTypeId == 2 ){
										 $scope.incomeTypefltr = [];
										 
										 console.log($scope.IncomeType);
										 for(var id in $scope.IncomeType){
												//if($scope.IncomeType[id].occupationTypeId == 2 && $scope.IncomeType[id].occupation_CategoryId == 0 || $scope.IncomeType[id].occupation_CategoryId == 1 || $scope.IncomeType[id].occupation_CategoryId == 2 || $scope.IncomeType[id].occupation_CategoryId == 3 || $scope.IncomeType[id].occupation_CategoryId == 4 || $scope.IncomeType[id].occupation_CategoryId == 5 || $scope.IncomeType[id].occupation_CategoryId == 6 || $scope.IncomeType[id].occupation_CategoryId == 7 || $scope.IncomeType[id].occupation_CategoryId == 8){
											 if(($scope.IncomeType[id].occupationTypeId == 2 || $scope.IncomeType[id].occupationTypeId == 1 )
												&& ($scope.IncomeType[id].refIncomeTypeId == 8 ||
													$scope.IncomeType[id].refIncomeTypeId == 9 ||
													$scope.IncomeType[id].refIncomeTypeId == 1 ||
													$scope.IncomeType[id].refIncomeTypeId == 2 ||
													$scope.IncomeType[id].refIncomeTypeId == 3 ||
													$scope.IncomeType[id].refIncomeTypeId == 4 ||
													$scope.IncomeType[id].refIncomeTypeId == 5 )){

														$scope.incomeTypefltr.push($scope.IncomeType[id]);

												}
											}
									 }else if($scope.userInfo.occupationTypeId == 3){
										$scope.incomeTypefltr = [];

								//		$scope.incomeTypefltr.push($scope.IncomeType[10]);
								//		$scope.incomeTypefltr.push($scope.IncomeType[9]);
								//		$scope.incomeTypefltr.push($scope.IncomeType[11]);
								//		$scope.incomeTypefltr.push($scope.IncomeType[12]);
										$scope.incomeTypefltr.push($scope.IncomeType[0]);
										$scope.incomeTypefltr.push($scope.IncomeType[1]);
										$scope.incomeTypefltr.push($scope.IncomeType[2]);
										$scope.incomeTypefltr.push($scope.IncomeType[3]);
										$scope.incomeTypefltr.push($scope.IncomeType[4]);
										$scope.incomeTypefltr.push($scope.IncomeType[6]);
								//		$scope.incomeTypefltr.push($scope.IncomeType[14]);
								//		$scope.incomeTypefltr.push($scope.IncomeType[13]);
									 }
									 var tempIncome = [];
									 var temp;
									if ($scope.userIncome.length > 0) {
										for (var i = 0; i < $scope.userIncome.length; i++) {
											if(tempIncome.length != 0){
												$scope.incomeTypefltr = tempIncome;
											}
											for(var x in $scope.incomeTypefltr){												
												if($scope.userIncome[i]['incomeTypedesc'] == $scope.incomeTypefltr[x]['incomeTypedesc']){
													temp = $scope.incomeTypefltr[x];
													tempIncome = [];
													for(var y in $scope.incomeTypefltr){
														if(temp['incomeTypedesc'] !== $scope.incomeTypefltr[y]['incomeTypedesc']){
															tempIncome.push($scope.incomeTypefltr[y]);
														}														
													}												
												}
											}
											var incomeData = {
												"userIncomeId" : $scope.userIncome[i].userIncomeId ? $scope.userIncome[i].userIncomeId : 0,
												"activeStatus" : "",
												"createdBy" : "",
												"createdOn" : "",
												"updatedBy" : "",
												"updatedOn" : "",
												"userGrossIncome" : 0,
												"userNetIncome" : $scope.userIncome[i].userNetIncome == null ? 0 : $scope.userIncome[i].userNetIncome.toLocaleString('en-IN'),
												"frequencyType" : $scope.userIncome[i].frequencyType == null ? 0: $scope.userIncome[i].frequencyType,
												"userMonthlySavings" : 0,
												"refIncomeTypeId" : $scope.userIncome[i].refIncomeTypeId ? $scope.userIncome[i].refIncomeTypeId: 1,
												"IncomeType" : $scope.incomeTypefltr
											};
											;
											$scope.incomes.push(incomeData);
										}
										$scope.incomes_length = $scope.incomes.length;
									};
									if ($scope.UserLoan.length > 0) {
										for (var i = 0; i < $scope.UserLoan.length; i++) {
											var loanData = {
												"userLoansId" : $scope.UserLoan[i].userLoansId ? $scope.UserLoan[i].userLoansId: 0,
												"activeStatus" : "",
												"createdBy" : "",
												"createdOn" : "",
												"loanTypeId" : $scope.UserLoan[i].loanTypeId,
												"manualEntry" : "",
												"updatedBy" : "",
												"updatedOn" : "",
												"userId" : "",
												"userLenderName" : $scope.UserLoan[i].userLenderName,
												"userLoanOutstandingPrincipal" : $scope.UserLoan[i].userLoanOutstandingPrincipal,
												"userLoanPaymentAmount" : $scope.UserLoan[i].userLoanPaymentAmount.toLocaleString('en-IN'),
												"userLoanPeriod" : "",
												"userLoanRemainingTenure" : $scope.UserLoan[i].userLoanRemainingTenure
											};
											$scope.loanDatas.push(loanData);
										}
										$scope.userloan_length = $scope.loanDatas.length;
									} ;
									if ($scope.loanDatas.length == 0) {
										$scope.currentObligation = 0;
									} else {
										$scope.currentObligation = 1;
									}
									if ($scope.UserSalary.length > 0) {
										for (var i = 0; i < $scope.UserSalary.length; i++) {
											var salaryData = {
												"usersaldednsId" : $scope.UserSalary[i].usersaldednsId ? $scope.UserSalary[i].usersaldednsId: 8,
												"activeStatus"  : "",
												"createdBy" 	: "",
												"createdOn" 	: "",
												"updatedBy" 	: "",
												"updatedOn" 	: "",
												"amount" 		: $scope.UserSalary[i].amount.toLocaleString(),
												"salaryDednTypeId" : $scope.UserSalary[i].salaryDednTypeId ? $scope.UserSalary[i].salaryDednTypeId: 8,
											};
											$scope.salaryDatas.push(salaryData);
										}
										$scope.salaryDatas_length = $scope.salaryDatas.length;
									};
									
									

									
								};

								function setSegment(segment) {
									var objectSegment = _.findWhere(
											$scope.EmployerName, {
												employerName : segment
											});
									if (segment == null) {
										$("#organvalid").show();
									}
								} ;
								$scope.validOrNotValidBlur = function(val) {
									if (val == undefined || val == 0) {
										$(".totalExpValid").show();
									}
								}
								$scope.validOrNotValidBlur1 = function(val) {
									if (val == undefined || val == 0) {
										$(".totalExpValid1").show();
									}
								}
								$scope.$watch('financialformditry.$dirty',
										function(neeval, oldval) {
											if (neeval == true) {
												$scope.true_reset = true;
												$scope.success = false;
												$scope.error = false;
											} else {
												$scope.true_reset = false;
											}
										}, true);

								function reset() {
									$scope.loader = true;
									$scope.success_message = "Your changes have been successfully reset";
									$scope.removeAllError();
									$scope.financialformditry
											.$setPristine(true);
									$scope.success = true;
									$scope.error = false;
									setFinancialValue();
									$scope.loader = false;
									$scope.true_reset = false;
								};

								function removeAllError() {
									_.each($scope.omitdata, function(value) {
										$('#' + value).removeClass(
												'redcolorinput');
									})
									_.each($scope.checkemptydata, function(
											value) {
										$('#' + value).removeClass(
												'redcolorinput');
									})
									_.each($scope.emptyincome, function(value) {
										$('#income' + value).removeClass(
												'redcolorinput');
									})
									_.each($scope.Tenure, function(value) {
										$('#Tenure' + value).removeClass(
												'redcolorinput');
									})
									_.each($scope.Principal, function(value) {
										$('#Principal' + value).removeClass(
												'redcolorinput');
									})
									_
											.each(
													$scope.PaymentAmount,
													function(value) {
														$(
																'#PaymentAmount'
																		+ value)
																.removeClass(
																		'redcolorinput');
													})
									$scope.checkemptydata = [];
									$scope.omitdata = [];
									$scope.emptyincome = [];
									$scope.Tenure = [];
									$scope.Principal = [];
									$scope.PaymentAmount = [];
								};
						
/* Commenting setCreditScore
									function setCreditScore(val) {
									if (val <= 550) {
										$scope.userInfo.refCreditScoreId = 4;
										$('#myModal').modal('hide');
									} else if (val >= 551 && val <= 650) {
										$scope.userInfo.refCreditScoreId = 3;
										$('#myModal').modal('hide');
									} else if (val >= 651 && val <= 750) {
										$scope.userInfo.refCreditScoreId = 2;
										$('#myModal').modal('hide');
									} else if (val >= 751 && val <= 999) {
										$scope.userInfo.refCreditScoreId = 1;
										$('#myModal').modal('hide');
									}
								};
ending comment for setCreditScore */								
								
								function linkNext() {
									if ($rootScope.coApplicant == 1) {
										$state.go('index.coApplicant');
									} else {
										$state.go('index.credit');										 
									//	$state.go('index.bankverification');
									}
								};
								/* Clone */
								function incomeClone(e,ctg) {
									console.log("$scope.IncomeType ",$scope.IncomeType );
									var plusclk; 
 									var occType = $("#occupationType option:selected").text();
									if(occType == undefined || occType == "" || occType == null && finNav == 3){
										 occType = "Salaried";
									}else{
										 occType = $("#occupationType option:selected").text();
									}
									var ee = e == undefined ? undefined : e.type; 
									if(ee == "click"){
										e = 'ctgyChange';
										ctg = $scope.userInfo.occupationcategoryid;
//										ctg = $('#occupationType').val();
										plusclk = "plusClick"
									}
									
									if (occType == "Self Employed Professional"){ //Self Employed Professional
											var dropdown = [];
											$scope.IT = [];
											dropdown.push($scope.IncomeType[7]);
											dropdown.push($scope.IncomeType[8]);
											dropdown.push($scope.IncomeType[0]);
											dropdown.push($scope.IncomeType[1]);
											dropdown.push($scope.IncomeType[2]);
											dropdown.push($scope.IncomeType[3]);
											dropdown.push($scope.IncomeType[4]);
											e = undefined;
											$scope.IT = dropdown;
									} else if (occType == "Salaried"){ //salaried
										var dropdown = [];
										$scope.IT = [];
										dropdown.push($scope.IncomeType[0]);
										$scope.refId = $scope.IncomeType[0]['refIncomeTypeId'];
										dropdown.push($scope.IncomeType[1]);
										dropdown.push($scope.IncomeType[2]);
										dropdown.push($scope.IncomeType[3]);
										dropdown.push($scope.IncomeType[4]);
										dropdown.push($scope.IncomeType[5]);
										dropdown.push($scope.IncomeType[6]);
										$scope.IT =dropdown ;
										e = undefined;
									}else if (occType == "Business Owner"){					//business owner
										var dropdown = [];
										$scope.IT = [];
										dropdown.push($scope.IncomeType[0]);
										$scope.refId = $scope.IncomeType[0]['refIncomeTypeId'];
										dropdown.push($scope.IncomeType[1]);
										dropdown.push($scope.IncomeType[2]);
										dropdown.push($scope.IncomeType[3]);
										dropdown.push($scope.IncomeType[4]);
										dropdown.push($scope.IncomeType[6]);
										$scope.IT =dropdown ;
										e = undefined;
									}
						/* Changing income for business owner - Prernna
										}else{					//business owner
										var dropdown = [];
										dropdown.push($scope.IncomeType[10]);
										$scope.refId = $scope.IncomeType[10]['refIncomeTypeId'];
										dropdown.push($scope.IncomeType[11]);
										dropdown.push($scope.IncomeType[9]);
										dropdown.push($scope.IncomeType[12]);
										dropdown.push($scope.IncomeType[0]);
										dropdown.push($scope.IncomeType[1]);
										dropdown.push($scope.IncomeType[2]);
										dropdown.push($scope.IncomeType[3]);
										dropdown.push($scope.IncomeType[4]);
										dropdown.push($scope.IncomeType[13]);
										dropdown.push($scope.IncomeType[14]);										
										$scope.IT = dropdown ;
										e = undefined;
									} */	
									console.log("First",$scope.incomes);								
									_.each($scope.incomes,function(value) {
														var ii = _.findIndex($scope.incomes,value);
//														console.log("$scope.incomes",ii);
														$scope.incomes[ii].disabled = true;
														$scope.IT = _ .without( $scope.IT, _.findWhere($scope.IT,
																						{
																							refIncomeTypeId : value.refIncomeTypeId
																						}));
														console.log("$scope.IT",$scope.IT);
													});
									if($scope.IT[0].refIncomeTypeId == 8 || $scope.IT[0].refIncomeTypeId == 9 ||$scope.IT[0].refIncomeTypeId == 10 || $scope.IT[0].refIncomeTypeId == 11 || $scope.IT[0].refIncomeTypeId == 12 || $scope.IT[0].refIncomeTypeId == 13 || $scope.IT[0].refIncomeTypeId == 14 || $scope.IT[0].refIncomeTypeId == 15 ){
										$scope.fTyp = 12;
									}else if($scope.IT[0].refIncomeTypeId == 1 || $scope.IT[0].refIncomeTypeId == 2 || $scope.IT[0].refIncomeTypeId == 4 ){
										$scope.fTyp = 1;
									}else {
										$scope.fTyp = 1;
									}

									if(e == undefined){
									
										if(occType == "Salaried"){
												
												var incomeData = {
														"userIncomeId" : 0,
														"activeStatus" : "",
														"createdBy" : "",
														"createdOn" : "",
														"updatedBy" : "",
														"updatedOn" : "",
														"userGrossIncome" : 0,
														"frequencyType" : $scope.fTyp,
														"userNetIncome" : 0,
														"userMonthlySavings" : 0,
														"refIncomeTypeId" : $scope.IT[0].refIncomeTypeId ?  $scope.IT[0].refIncomeTypeId : $scope.refId,
														"IncomeType" : $scope.IT,
														"disabled" : false
													};
												$scope.incomes.push(incomeData);												
										}else if(occType == "Self Employed Professional"){
											var plus;
											if(plusclk == 'plusClick'){
												plus = 1;
											}else{
												plus = 2
											}
											console.log("Final $scope.IT",$scope.IT);

											for(var u = 0;u<plus;u++){
												
												var incomeData = {
														"userIncomeId" : 0,
														"activeStatus" : "",
														"createdBy" : "",
														"createdOn" : "",
														"updatedBy" : "",
														"updatedOn" : "",
														"userGrossIncome" : 0,
														"frequencyType" : $scope.fTyp,
														"userNetIncome" : 0,
														"userMonthlySavings" : 0,
														"refIncomeTypeId" : $scope.IT[u].refIncomeTypeId ?  $scope.IT[u].refIncomeTypeId : $scope.refId,
														"IncomeType" : $scope.IT,
														"disabled" : false
													};
												$scope.incomes.push(incomeData);
											}
											console.log("After",$scope.incomes);
										}else{
											var plus;
											if(plusclk == 'plusClick'){
//												console.log($scope.allIncome)
												plus = 1;
//												$scope.IT = $scope.allIncome 
											}else{
							/* change business owner income					
											plus = 4 */
											plus = 1;
											}
												for(var u = 0;u<plus;u++){
													
													var incomeData = {
															"userIncomeId" : 0,
															"activeStatus" : "",
															"createdBy" : "",
															"createdOn" : "",
															"updatedBy" : "",
															"updatedOn" : "",
															"userGrossIncome" : 0,
															"frequencyType" : $scope.fTyp,
															"userNetIncome" : 0,
															"userMonthlySavings" : 0,
															"refIncomeTypeId" : $scope.IT[u].refIncomeTypeId ?  $scope.IT[u].refIncomeTypeId : $scope.refId,
															"IncomeType" : $scope.IT,
															"disabled" : false
														};
													$scope.incomes.push(incomeData);
												}
										}
									}else{
										var incomeData = {
												"userIncomeId" : 0,
												"activeStatus" : "",
												"createdBy" : "",
												"createdOn" : "",
												"updatedBy" : "",
												"updatedOn" : "",
												"userGrossIncome" : 0,
												"frequencyType" : $scope.fTyp,
												"userNetIncome" : 0,
												"userMonthlySavings" : 0,
												"refIncomeTypeId" : $scope.IT[0].refIncomeTypeId ?  $scope.IT[0].refIncomeTypeId : $scope.refId,
												"IncomeType" : $scope.IT,
												"disabled" : false
											};
										$scope.incomes.push(incomeData);
									}
									$scope.true_reset = true;
									$scope.success = false;
								};
								

								function loanClone() {
									var loanData = {
										"userLoansId" : 0,
										"activeStatus" : "",
										"createdBy" : "",
										"createdOn" : "",
										"loanTypeId" : 1,
										"manualEntry" : "",
										"updatedBy" : "",
										"updatedOn" : "",
										"userId" : "",
										"userLenderName" : 142,
										"userLoanOutstandingPrincipal" : 1,
										"userLoanPaymentAmount" : 0,
										"userLoanPeriod" : "",
										"userLoanRemainingTenure" : 0
									};
									$scope.loanDatas.push(loanData);
									$scope.true_reset = true;
									$scope.success = false;
								};
								function salaryClone() {
									var salaryData = {
										"usersaldednsId" : 0,
										"activeStatus" : "",
										"amount" : 0,
										"createdOn" : "",
										"updatedBy" : "",
										"updatedOn" : "",
										"userId" : "",
										"salaryDednTypeId" : 1
									};
									$scope.salaryDatas.push(salaryData);
									$scope.true_reset = true;
									$scope.success = false;
								};
								/* Remove */
								function removeIncome(removeObject, index) {
									if ($scope.userInfo.occupationTypeId == 1 && removeObject.refIncomeTypeId == 1)
									{ }
									else if(($scope.userInfo.occupationTypeId == 2) && (removeObject.refIncomeTypeId == 8 || removeObject.refIncomeTypeId == 9))
									{ }
									else if ($scope.userInfo.occupationTypeId == 3 && removeObject.refIncomeTypeId == 1)
									{ }
							/*	Change income for business owners	
							else if(($scope.userInfo.occupationTypeId == 3) && (removeObject.refIncomeTypeId == 10 || removeObject.refIncomeTypeId == 11 || removeObject.refIncomeTypeId == 12 || removeObject.refIncomeTypeId == 13))
									{ } */
									else{
										$scope.incomes = _.without(
										$scope.incomes, removeObject);
										$scope.true_reset = true;
										$scope.success = false;
									}
								}; // remove income
								function removeLoan(removeObject) {
								
										$scope.loanDatas = _.without(
												$scope.loanDatas, removeObject);
										$scope.true_reset = true;
										$scope.success = false;
									
								}
								; // remove loan
								function removeSalary(removeObject) {
									$scope.salaryDatas = _.without(
											$scope.salaryDatas, removeObject);
									$scope.true_reset = true;
									$scope.success = false;
								}
								; // remove salary
								function RemoveRougeChar(convertString) {
									if (convertString.substring(0, 1) == ",") {
										return convertString.substring(1,
												convertString.length);
									}
									return convertString;
								}
								;

								/* function to click the incomebtn */
								$scope.valClone = function() {
									if ($scope.incomes.length < 1) {
										incomeClone();										
									} else {

									}
								}
								function numericOnly(event, val) {
									return regex.numericOnly(event, val);
								}

								function removeText(val) {
									return regex.removeText(val);
								} ;

								function removeTextTerm(val, i) {
									$scope.loanDatas[i].userLoanRemainingTenure = val
											.replace(/[^0-9\.]+/g, "").replace(
													/[^\w\s]/gi, '');
								}

								function convertNumberToWords(amount) {
									regex.convertNumberToWords(amount);
								}
								/* ERROR */
								function dirtyError(neeval, oldval) {
									if (neeval == true) {
										$scope.true_reset = true;
										$scope.success = false;
										$scope.error = false;
									} else {
										$scope.true_reset = false;
									}
								};

						
						function validate(userinfo, incomeinfo, loaninfo, salaryDatas, getsalarytotal,
										sumOFEarnings, sumOFDeductions) {
									
									$scope.error = false;
									removeAllError();
									
									if (userinfo.occupationTypeId == 0||userinfo.occupationTypeId == "" || userinfo.occupationTypeId == null || userinfo.occupationTypeId == undefined) {
											$('#occupationType').css('border',
													'2px solid red');
											$scope.error = true;
										}else{
											$('#occupationType').removeAttr('style');
										}
									
									if (userinfo.occupationcategoryid == 0 ||userinfo.occupationcategoryid == "" || userinfo.occupationcategoryid == null || userinfo.occupationcategoryid == undefined)  {
											$('#oddCategoy').css('border',
													'2px solid red');
											$scope.error = true;
										}else{
											$('#oddCategoy').removeAttr('style');
										}
										
									if (userinfo.employerName == "" || userinfo.employerName == null || userinfo.employerName == undefined)  {
											$('#OrganisationName').css('border',
													'2px solid red');
											$scope.error = true;
										}else{
											$('#OrganisationName').removeAttr('style');
										}
									
									if (userinfo.primaryBank == 0 ||userinfo.primaryBank == "" || userinfo.primaryBank == null || userinfo.primaryBank == undefined)  {
											$('#primaryBank').css('border',
													'2px solid red');
											$scope.error = true;
										}else{
											$('#primaryBank').removeAttr('style');
										}
										
									if (userinfo.yearsofServiceinIndustry == "" || userinfo.yearsofServiceinIndustry == null || userinfo.yearsofServiceinIndustry == undefined)  {
											$('#yearsofServiceinIndustry').css('border',
													'2px solid red');
											$scope.error = true;
										}else{
											$('#yearsofServiceinIndustry').removeAttr('style');
										}
									
									if (userinfo.yearsofServicewithEmployer == "" || userinfo.yearsofServicewithEmployer == null || userinfo.yearsofServicewithEmployer == undefined)  {
											$('#yearsofServicewithEmployer').css('border',
													'2px solid red');
											$scope.error = true;
										}else{
											$('#yearsofServicewithEmployer').removeAttr('style');
										}
											
									
									if ((userinfo.businessConstitution == 0||userinfo.businessConstitution == "" || userinfo.businessConstitution == null || userinfo.businessConstitution == undefined) && (userinfo.occupationTypeId === 3||userinfo.occupationTypeId === 2)) {
											$('#businessConstitution').css('border',
													'2px solid red');
											$scope.error = true;
										}else{
											$('#businessConstitution').removeAttr('style');
										}
										
									if ((userinfo.ownershipShare == 0||userinfo.ownershipShare == "" || userinfo.ownershipShare == null || userinfo.ownershipShare == undefined) && (userinfo.occupationTypeId === 3||userinfo.occupationTypeId === 2)) {
											$('#ownershipShare').css('border',
													'2px solid red');
											$scope.error = true;
										}else{
											$('#ownershipShare').removeAttr('style');
										}
									
									if ((userinfo.employeeCount == 0||userinfo.employeeCount == "" || userinfo.employeeCount == null || userinfo.employeeCount == undefined) && (userinfo.occupationTypeId === 3||userinfo.occupationTypeId === 2)) {
											$('#employeeCount').css('border',
													'2px solid red');
											$scope.error = true;
										}else{
											$('#employeeCount').removeAttr('style');
										}
									
									if ((userinfo.officeType == 0 || userinfo.officeType == "" || userinfo.officeType == null || userinfo.officeType == undefined) && (userinfo.occupationTypeId === 3||userinfo.occupationTypeId === 2)) {
											$('#officeType').css('border',
													'2px solid red');
											$scope.error = true;
										}else{
											$('#officeType').removeAttr('style');
										}
									
									if ((userinfo.annualSales == 0 || userinfo.annualSales == "" || userinfo.annualSales == null || userinfo.annualSales == undefined) && (userinfo.occupationTypeId === 3||userinfo.occupationTypeId === 2) && (userinfo.itfiled == 1)) {
											$('#annualSales').css('border',
													'2px solid red');
											$scope.error = true;
										}else{
											$('#annualSales').removeAttr('style');
										}
										
									if ((userinfo.annualProfit == 0 ||userinfo.annualProfit == "" || userinfo.annualProfit == null || userinfo.annualProfit == undefined) && (userinfo.occupationTypeId === 3||userinfo.occupationTypeId === 2) && (userinfo.itfiled == 1)) {
											$('#annualProfit').css('border',
													'2px solid red');
											$scope.error = true;
										}else{
											$('#annualProfit').removeAttr('style');
										}
									
									if ((userinfo.annualSalesPY == 0 || userinfo.annualSalesPY == "" || userinfo.annualSalesPY == null || userinfo.annualSalesPY == undefined) && (userinfo.occupationTypeId === 3||userinfo.occupationTypeId === 2) && (userinfo.itfiled == 1)) {
											$('#annualSalesPY').css('border',
													'2px solid red');
											$scope.error = true;
										}else{
											$('#annualSalesPY').removeAttr('style');
										}
										
									if ((userinfo.annualProfitPY == 0 ||userinfo.annualProfitPY == "" || userinfo.annualProfitPY == null || userinfo.annualProfitPY == undefined) && (userinfo.occupationTypeId === 3||userinfo.occupationTypeId === 2) && (userinfo.itfiled == 1)) {
											$('#annualProfitPY').css('border',
													'2px solid red');
											$scope.error = true;
										}else{
											$('#annualProfitPY').removeAttr('style');
										}
										
									for (var i = 0; i < incomeinfo.length; i++) // empty income
										
										{	
											$('#income' + [ i ] + '').removeClass('redcolorinput');
											// added to check for null undefined and replace with 0
											incomeinfo[i].userNetIncome = incomeinfo[i].userNetIncome == "" || incomeinfo[i].userNetIncome == null || incomeinfo[i].userNetIncome == undefined ? 0 : incomeinfo[i].userNetIncome;
											// ? condition example... 	result = condition ? value1true : value2false;
											
											var am = incomeinfo[i].userNetIncome ? incomeinfo[i].userNetIncome.replace(/\,/g, '') : incomeinfo[i].userNetIncome;
										
											if(am == 0 || incomeinfo[i].userNetIncome.replace(/\,/g, '') == 0 || incomeinfo[i].userNetIncome == "" || incomeinfo[i].userNetIncome == null || incomeinfo[i].userNetIncome == undefined){
												$scope.error = true;
												$scope.success = false;
												$('#income' + [ i ] + '').addClass('redcolorinput');
											} 
										};	
										
										for (var j = 0; j < loaninfo.length; j++) // empty  loan
										{
											$('#PaymentAmount' + [ j ] + '').removeClass('redcolorinput');
											$('#Tenure' + [ j ] + '').removeClass('redcolorinput');
											
												if (loaninfo[j].userLoanRemainingTenure==0) {
												$scope.error = true;
												$scope.success = false;
												$('#Tenure' + [ j ] + '').addClass('redcolorinput');
												}
											if (loaninfo[j].userLoanPaymentAmount==0) {
												$scope.error = true;
												$scope.success = false;
												$('#PaymentAmount' + [j ] + '').addClass('redcolorinput');
												}
										}
									
									if ($scope.error) {
										$scope.error_message = "Kindly fill all the mandatory fields correctly"
										return false;
									} else {
									};
									
									$('#yearsofServiceinIndustry').removeClass('redcolorinput');
									$('#yearsofServicewithEmployer').removeClass('redcolorinput');
									
									if (parseInt(userinfo.yearsofServiceinIndustry) < parseInt(userinfo.yearsofServicewithEmployer)) {
										$('#yearsofServicewithEmployer').addClass('redcolorinput');
										$scope.error = true;
										$scope.error_message = "Current Experience cannot be more than Total Experience";
										$scope.success = false;
										return false;
									} else if ((parseInt($scope.personalInfo.age) - 18) < userinfo.yearsofServiceinIndustry) {
										$('#yearsofServiceinIndustry').addClass('redcolorinput');
										$scope.error = true;
										$scope.error_message = "Incorrect Total Experience. Only experience after 18 years of age can be considered.";
										$scope.success = false;
										return false;
									}else {
										
									};
									
									for (var i = 0; i < incomeinfo.length; i++) // empty income
										
										{	
										
											// added to check for null undefined and replace with 0
											incomeinfo[i].userNetIncome = incomeinfo[i].userNetIncome == "" || incomeinfo[i].userNetIncome == null || incomeinfo[i].userNetIncome == undefined ? 0 : incomeinfo[i].userNetIncome;
											// ? condition example... 	result = condition ? value1true : value2false;
											
											var am = incomeinfo[i].userNetIncome ? incomeinfo[i].userNetIncome.replace(/\,/g, '') : incomeinfo[i].userNetIncome;
											
											
											if((incomeinfo[i].refIncomeTypeId == 8 ||incomeinfo[i].refIncomeTypeId == 9 ||incomeinfo[i].refIncomeTypeId == 10 || incomeinfo[i].refIncomeTypeId == 11) && (am < 120000 || incomeinfo[i].userNetIncome.replace(/\,/g, '') < 120000 || incomeinfo[i].userNetIncome == "" || incomeinfo[i].userNetIncome == null || incomeinfo[i].userNetIncome == undefined)){
												$scope.error = true;
												$scope.error_message = "Amount value should be greater than 120000";
												$scope.success = false;
												$('#income' + [ i ] + '').addClass('redcolorinput');
												return false;
											} else
											if (userinfo.occupationTypeId === 1 && am < 10000 && incomeinfo[i].refIncomeTypeId == 1 ||  userinfo.occupationTypeId === 1 && incomeinfo[i].userNetIncome == undefined && incomeinfo[i].refIncomeTypeId == 1 ||  userinfo.occupationTypeId === 1 && incomeinfo[i].userNetIncome < 10000 && incomeinfo[i].refIncomeTypeId == 1 || userinfo.occupationTypeId === 1 && incomeinfo[i].userNetIncome == "" && incomeinfo[i].refIncomeTypeId == 1) {
												$scope.error = true;
												$scope.error_message = "Amount value should be greater than 10000";
												$scope.success = false;
												$('#income' + [ i ] + '').addClass('redcolorinput');
												return false;											
											} 
											// add for business owner income changes
											if (userinfo.occupationTypeId === 3 && am < 10000 && incomeinfo[i].refIncomeTypeId == 1 ||  userinfo.occupationTypeId === 3 && incomeinfo[i].userNetIncome == undefined && incomeinfo[i].refIncomeTypeId == 1 ||  userinfo.occupationTypeId === 3 && incomeinfo[i].userNetIncome < 10000 && incomeinfo[i].refIncomeTypeId == 1 || userinfo.occupationTypeId === 3 && incomeinfo[i].userNetIncome == "" && incomeinfo[i].refIncomeTypeId == 1) {
												$scope.error = true;
												$scope.error_message = "Amount value should be greater than 10000";
												$scope.success = false;
												$('#income' + [ i ] + '').addClass('redcolorinput');
												return false;											
											}
											else{
												
											}
										};
										
										for (var j = 0; j < loaninfo.length; j++) // empty  loan
										{
											$('#PaymentAmount' + [ j ] + '').removeClass('redcolorinput');
											$('#Tenure' + [ j ] + '').removeClass('redcolorinput');
											
											if (loaninfo[j].userLoanPaymentAmount==0 && loaninfo[j].userLoanRemainingTenure==0) {
												$scope.error = true;
												$scope.error_message = "Please ensure EMI and Months Remaining are entered";
												$scope.success = false;
												$('#PaymentAmount' + [ j ] + '').addClass('redcolorinput');
												$('#Tenure' + [ j ] + '').addClass('redcolorinput');
												return false;
											}
											else if (loaninfo[j].userLoanRemainingTenure==0) {
												$scope.error = true;
												$scope.error_message = "Please ensure Months Remaining is entered";
												$scope.success = false;
												$('#Tenure' + [ j ] + '').addClass('redcolorinput');
												return false;
											}
											else if (loaninfo[j].userLoanPaymentAmount==0) {
												$scope.error = true;
												$scope.error_message = "Please ensure EMI is entered";
												$scope.success = false;
												$('#PaymentAmount' + [j ] + '').addClass('redcolorinput');
												return false;
											}
											else  {
												
											}
										}

										for (var i = 0; i < salaryDatas.length; i++) // empty  salary
										{
											if (salaryDatas[i].amount == undefined) {
												$scope.emptysalary.push(i);
											}
										}
									if (loaninfo.length != 0) {
										$scope.currentObligation = 1;
									}
						
									if ($scope.error) {
										return false;
									} else {
										return true;
									}
									
									
								};
								
					
						/* Commenting out the old validate function to add good validations -- Prernna
						function validate(userinfo, incomeinfo,loaninfo, salaryDatas, getsalarytotal,
										sumOFEarnings, sumOFDeductions) {
									
									for (var i = 0; i < incomeinfo.length; i++) // empty
										// income
										{	
										
											// added to check for null undefined and replace with 0
											incomeinfo[i].userNetIncome = incomeinfo[i].userNetIncome == "" || incomeinfo[i].userNetIncome == null || incomeinfo[i].userNetIncome == undefined ? 0 : incomeinfo[i].userNetIncome;
											// ? condition example... 	result = condition ? value1true : value2false;
											
											var am = incomeinfo[i].userNetIncome ? incomeinfo[i].userNetIncome.replace(/\,/g, '') : incomeinfo[i].userNetIncome;
											
											
											if((incomeinfo[i].refIncomeTypeId == 8 ||incomeinfo[i].refIncomeTypeId == 9 ||incomeinfo[i].refIncomeTypeId == 10 || incomeinfo[i].refIncomeTypeId == 11) && (am < 120000 || incomeinfo[i].userNetIncome.replace(/\,/g, '') < 120000 || incomeinfo[i].userNetIncome == "" || incomeinfo[i].userNetIncome == null || incomeinfo[i].userNetIncome == undefined)){
												$scope.error = true;
												$scope.error_message = "Amount value should be greater than 120000";
												$scope.success = false;
												$('#income' + [ i ] + '').addClass('redcolorinput');
												return false;
											} else
											if (userinfo.occupationTypeId === 1 && am < 10000 && incomeinfo[i].refIncomeTypeId == 1 ||  userinfo.occupationTypeId === 1 && incomeinfo[i].userNetIncome == undefined && incomeinfo[i].refIncomeTypeId == 1 ||  userinfo.occupationTypeId === 1 && incomeinfo[i].userNetIncome < 10000 && incomeinfo[i].refIncomeTypeId == 1 || userinfo.occupationTypeId === 1 && incomeinfo[i].userNetIncome == "" && incomeinfo[i].refIncomeTypeId == 1) {
												$scope.error = true;
												$scope.error_message = "Amount value should be greater than 10000";
												$scope.success = false;
												$('#income' + [ i ] + '').addClass('redcolorinput');
												return false;											
											} 
											// add for business owner income changes
											if (userinfo.occupationTypeId === 3 && am < 10000 && incomeinfo[i].refIncomeTypeId == 1 ||  userinfo.occupationTypeId === 3 && incomeinfo[i].userNetIncome == undefined && incomeinfo[i].refIncomeTypeId == 1 ||  userinfo.occupationTypeId === 3 && incomeinfo[i].userNetIncome < 10000 && incomeinfo[i].refIncomeTypeId == 1 || userinfo.occupationTypeId === 3 && incomeinfo[i].userNetIncome == "" && incomeinfo[i].refIncomeTypeId == 1) {
												$scope.error = true;
												$scope.error_message = "Amount value should be greater than 10000";
												$scope.success = false;
												$('#income' + [ i ] + '').addClass('redcolorinput');
												return false;											
											}
											else{
												
											}
										};
										for (var i = 0; i < loaninfo.length; i++) // empty  loan
										{
											if (loaninfo[i].userLoanPaymentAmount != 0 && loaninfo[i].userLoanPaymentAmount < 100) {
												$scope.error = true;
												$scope.error_message = "Please Provide Proper EMI";
												$scope.success = false;
												$('#PaymentAmount' + [ i ] + '').addClass('redcolorinput');
												return false;
											}
										}
										for (var i = 0; i < salaryDatas.length; i++) // empty  salary
										{
											if (salaryDatas[i].amount == undefined) {
												$scope.emptysalary.push(i);
											}
										}
									if (loaninfo.length != 0) {
										$scope.currentObligation = 1;
									}
									if (getsalarytotal == undefined && userinfo.employerName == null  && userinfo.occupationTypeId === 1) {
										$scope.error = true;
										$scope.error_message = "Please add the Verifiable Income details and Organisation Name";
										$scope.success = false;
										$('#OrganisationName').addClass('redcolorinput');
									} else if (userinfo.employerName == "" && userinfo.occupationTypeId === 1) {
										$scope.error = true;
										$scope.error_message = "Organisation Name should not be empty";
										$scope.success = false;
										$('#OrganisationName').addClass('redcolorinput');
										return false;
									}
									else if (userinfo.occupationTypeId == "" || userinfo.occupationTypeId == undefined || userinfo.occupationTypeId == null) {
										$scope.error = true;
										$scope.error_message = "Occupation Type should not be empty";
										$scope.success = false;
										$('#occupationType').addClass('redcolorinput');
										return false;
									}
									else if (userinfo.yearsofServiceinIndustry == null && userinfo.yearsofServicewithEmployer == null) {
										$scope.error = true;
										$scope.error_message = "Total Experience and Current Experience should not be empty";
										$scope.success = false;
										$('#yearsofServicewithEmployer').addClass('redcolorinput');
										$('#yearsofServiceinIndustry').addClass('redcolorinput');
									} else if (userinfo.yearsofServicewithEmployer == null || userinfo.yearsofServicewithEmployer == 0 && userinfo.occupationTypeId == 1) {
										$scope.error = true;
										$scope.error_message = "Current Experience should not be empty";
										$('#yearsofServicewithEmployer').addClass('redcolorinput');
										$scope.success = false;
										return false;
									} else if (userinfo.yearsofServiceinIndustry == null || userinfo.yearsofServiceinIndustry == 0 && userinfo.occupationTypeId == 1) {
										$scope.error = true;
										$scope.error_message = "Total Experience should be valid years";
										$('#yearsofServiceinIndustry').addClass('redcolorinput');
										$scope.success = false;
										return false;
									} else if (parseInt(userinfo.yearsofServiceinIndustry) < parseInt(userinfo.yearsofServicewithEmployer)) {
										$('#yearsofServicewithEmployer').addClass('redcolorinput');
										$scope.error = true;
										$scope.error_message = "Current Experience must be less  than Total Experience";
										$scope.success = false;
										return false;
									} else if ((parseInt($scope.personalInfo.age) - 21) < userinfo.yearsofServiceinIndustry) {
										$('#yearsofServiceinIndustry').addClass('redcolorinput');
										$scope.error = true;
										$scope.error_message = "Incorrect Experience tenure based on Employment age";
										$scope.success = false;
										return false;
									} else if (incomeinfo.length < 1) {
										$scope.error = true;
										$scope.error_message = "UserIncome should not empty";
										$scope.success = false;
										return false;
									}else if ((userinfo.occupationcategoryid == "" || userinfo.occupationcategoryid == null || userinfo.occupationcategoryid == undefined) && (userinfo.occupationTypeId == 1 || userinfo.occupationTypeId == 2 || userinfo.occupationTypeId == 3) ) {
										$('#oddCategoy').addClass('redcolorinput');
										$scope.error = true;
										$scope.error_message = "Please select the Category Type ";
										$scope.success = false;
										return false;
							/*	}else if ((userinfo.categorydetail == "" || userinfo.categorydetail == null || userinfo.categorydetail == undefined) && (userinfo.occupationTypeId == 1 || userinfo.occupationTypeId == 2 || userinfo.occupationTypeId == 3) ) {
										$('#categorydetail').addClass('redcolorinput');
										$scope.error = true;
										$scope.error_message = "Please fill the Category Detail ";
										$scope.success = false;
										return false;  */ /*
									}else if (userinfo.userLoanRemainingTenure < 360) {
										$scope.error = true;
										$scope.error_message = "User should not empty";
										$scope.success = false;
										return false;
									}else {
										return true;
									}
									
								};
								
					Ending Comments for the Old Validation */

					/* Commenting out $scope.save as it is unused --- Prernna 23122019	
					$scope.save = function(userinfo, incomeinfo,
										loaninfo, salaryDatas, e) {


									for (var i = 0; i < incomeinfo.length; i++) {
										if (incomeinfo[i].refIncomeTypeId == 1
												|| incomeinfo[i].refIncomeTypeId == 2
												|| incomeinfo[i].refIncomeTypeId == 4) {
											incomeinfo[i].frequencyType = 1;
										} else {

										}
									}
									removeAllError();
									$scope.emptyincome = [];
									$scope.Tenure = [];
									$scope.Principal = [];
									$scope.PaymentAmount = [];
									$scope.emptysalary = [];
									if (incomeinfo.length != 0) {
										var getsalarytotal = _
												.findWhere(
														incomeinfo,
														{
															refIncomeTypeId : incomeinfo[0].refIncomeTypeId
														});
									}
									var sumOFEarnings = incomeinfo
											.reduce(
													function(s, f) {
														return parseInt(f.userNetIncome.length > 3 ? f.userNetIncome
																.replace(/,/g,
																		'')
																: f.userNetIncome)
																+ parseInt(s.length > 3 ? s
																		.replace(
																				/,/g,
																				'')
																		: s); // return the sum of the accumulator and the current time. (as the new accumulator)
													}, 0); // sum of earning
									var sumOFDeductions = salaryDatas
											.reduce(
													function(s, f) {
														return parseInt(f.amount.length > 3 ? f.amount
																.replace(/,/g,
																		'')
																: f.amount)
																+ parseInt(s.length > 3 ? s
																		.replace(
																				/,/g,
																				'')
																		: s); // return the sum of the accumulator and the current  time. (as the  new accumulator)
													}, 0); // sum of deducation

									if (loaninfo.length == 0) {
										$scope.currentObligation = 0;
									} else {
										$scope.currentObligation = 1;
									}
									if (userinfo.occupationTypeId == 4) // save
									// home maker
									{
										$scope.checkFields = {
											"occupationType" : userinfo.occupationTypeId,
											"CreditScore" : userinfo.creditScoreId
										};
										checkHomeMaker(userinfo, incomeinfo,
												loaninfo, salaryDatas,
												getsalarytotal, sumOFEarnings,
												sumOFDeductions, e);
									} else {
										alert ("Inside setting checkfields for other than homemaker");
										$scope.checkFields = {
											"occupationType" : userinfo.occupationTypeId,
											"yearsofServiceinIndustry" : userinfo.yearsofServiceinIndustry,
											"yearsofServicewithEmployer" : userinfo.yearsofServicewithEmployer,
											"OrganisationName" : userinfo.employerName,
											"CreditScore" : userinfo.creditScoreId
										};
										checkOther(userinfo, incomeinfo,
												loaninfo, salaryDatas,
												getsalarytotal, sumOFEarnings,
												sumOFDeductions, e);
									}
								};  
								Ending commenting for $scope.save */ 
								
								$scope.next = function(user, income, loan) {
									$scope.success = true;
									dirtyCheck(user, income, loan, 'next');
								}; // next button
								$scope.back = function(user, income, loan) {
									dirtyCheck(user, income, loan, 'back');
								}; // back button
								
								/* WATCH COLLECTION */
								$scope.$watch('financialformditry.$dirty',
										dirtyError, true);
								$scope.$watch(
										'financialformditry.incomes.$dirty',
										dirtyError, true);
								$scope.$watch(
										'financialformditry.loanDatas.$dirty',
										dirtyError, true);
								$scope.$watch(
												'financialformditry.salaryDatas.$dirty',
												dirtyError, true);

								function checkHomeMaker(userinfo, incomeinfo,
										loaninfo, salaryDatas, getsalarytotal,
										sumOFEarnings, sumOFDeductions, e) {
									$scope.checkFields = {
										"occupationType" : userinfo.occupationTypeId,
										"CreditScore" : userinfo.creditScoreId
									};
									EmptyField();
									if (getsalarytotal == undefined) {
										$scope.error = true;
										$scope.error_message = "Please add your Income Details.";
										$scope.success = false;
									} else if (parseInt(getsalarytotal.userNetIncome.length > 4 ? getsalarytotal.userNetIncome
											.replace(/,/g, '')
											: getsalarytotal.userNetIncome) < sumOFDeductions) {
										$scope.error = true;
										$scope.error_message = "Income should not be lesser than Deduction.";
										$scope.success = false;
									}else {
										save(userinfo, incomeinfo, loaninfo,
												salaryDatas);
									}
								}
								;
						
							/*
								function checkOther(userinfo, incomeinfo,
										loaninfo, salaryDatas, getsalarytotal,
										sumOFEarnings, sumOFDeductions, e) {
									$scope.removeAllError();
									$scope.emptyincome = [];
									$scope.Tenure = [];
									$scope.Principal = [];
									$scope.PaymentAmount = [];
									$scope.emptysalary = [];
									alert("before validate in checkother");
									var checkValidate = validate(userinfo,
											incomeinfo, loaninfo, salaryDatas,
											getsalarytotal, sumOFEarnings,
											sumOFDeductions);
									alert ("after validate "+ checkValidate + " Befire emptyField");
									var checkEmptyField = EmptyField();
									alert("after emptyField "+checkEmptyField);
									if (checkValidate && !checkEmptyField) {
										save(userinfo, incomeinfo, loaninfo,
												salaryDatas, e);
									}
								};   */

								/*
								function EmptyField() {
									$scope.checkEmptyData = [];
									_
											.every(
													_.keys($scope.checkFields),
													function(currentKey) {
														if ($scope.checkFields[currentKey] == '') {
															$scope.checkEmptyData
																	.push(currentKey);
														} else if (currentKey) {

														}
														return $scope.checkEmptyData;
													});
									if ($scope.checkEmptyData.length > 0) {
										_.each($scope.checkEmptyData, function(value) {
											$('#' + value).addClass('redcolorinput');
										});
										$scope.error = true;
										$scope.error_message = "Kindly fill the mandatory fields ";
										$scope.success = false;
									} ;
									return $scope.checkEmptyData.length > 0 ? true: false;
								}; */

								$scope.next1 = function(userinfo, incomeinfo,
										loaninfo, salaryDatas, e) {
								if (validate(userinfo, incomeinfo,
											loaninfo, salaryDatas)) { 
										save(userinfo, incomeinfo, loaninfo,
												salaryDatas, e);
									}
								
								}
								$scope.save1 = function(userinfo, incomeinfo,
										loaninfo, salaryDatas, e) {
									if (validate(userinfo, incomeinfo,
											loaninfo, salaryDatas)) { 		
										save(userinfo, incomeinfo, loaninfo,
												salaryDatas, e);
									}
								}

								function save(userinfo, incomeinfo, loaninfo,salaryDatas, e) {
									$scope.loader = true;
									var companyDetail = localStorage.getItem("overallCompanyDetails");
									var compDet = JSON.parse(companyDetail);
									var financialData = {
										"occupationcategoryid":userinfo.occupationcategoryid,
										"categorydetail":userinfo.categorydetail,
										"createdBy" : "",
										"createdOn" : "",
										"updatedBy" : "",
										"updatedOn" : "",
										"occupationTypeId" : userinfo.occupationTypeId,
										"primaryMonthlyIncome" : "",
										"secondaryMonthlyIncome" : "",
										"yearsofServiceinIndustry" : userinfo.yearsofServiceinIndustry,
										"yearsofServicewithEmployer" : userinfo.yearsofServicewithEmployer,
										"userSelfEmploymentBusinessId" : "",
										"businessName" : btoa(userinfo.businessName),
										"employerName" : btoa(userinfo.employerName),
										"cin" :  companyDetail == null || companyDetail == undefined ? "" : compDet.data.company.cin ,
										"classification" :companyDetail == null || companyDetail == undefined ? "" : compDet.data.company.classification,
										"creditScoreId" : userinfo.refCreditScoreId,
										"itfiled" : userinfo.itfiled,
										"annualSales" : userinfo.annualSales == null || userinfo.annualSales == undefined ? 0 : userinfo.annualSales,
										"annualProfit" : userinfo.annualProfit == null || userinfo.annualProfit == undefined ? 0 : userinfo.annualProfit,
										"ownershipShare" : userinfo.ownershipShare == null || userinfo.ownershipShare == undefined ? 99 : userinfo.ownershipShare,
										"employeeCount" : userinfo.employeeCount == null || userinfo.employeeCount == undefined ? 0 : userinfo.employeeCount,
										"annualSalesPY" : userinfo.annualSalesPY == null || userinfo.annualSalesPY == undefined ? 0 : userinfo.annualSalesPY,
										"annualProfitPY" : userinfo.annualProfitPY == null || userinfo.annualProfitPY == undefined ? 0 : userinfo.annualProfitPY,
										"officeType" : userinfo.officeType == null || userinfo.officeType == undefined ? 0 : userinfo.officeType,
										"businessConstitution" : userinfo.businessConstitution == null || userinfo.businessConstitution == undefined ? 0 : userinfo.businessConstitution,
										"primaryBank" : userinfo.primaryBank == null || userinfo.primaryBank == undefined ? 0 : userinfo.primaryBank,
										"yearsinIndustry" : "",
										"employerTypeId" : userinfo.employerTypeId,
										"assetValue" : parseInt(userinfo.assetValue
												.replace(/,/g, '')),
										"loanValue" : parseInt(userinfo.loanValue
												.replace(/,/g, '')),
										"preferedInterestRate" : userinfo.preferedInterestRate,
										"loanTermId" : userinfo.loanTermId,
										"yearsinBusiness" : userinfo.yearsofServicewithEmployer ? userinfo.yearsofServicewithEmployer : 0
									};
									var postData = {
										"financialDetails" : JSON.stringify(financialData),
										"loanDetails" : JSON.stringify(
														loaninfo,
														function(key, val) {
															if (key == '$$hashKey') {
																return undefined;
															}
															if (key == 'disabled') {
																return undefined;
															}
															if (key == 'word') {
																return undefined;
															}
															if (key == 'userLoanOutstandingPrincipal') {
																return parseInt(val.length > 3 ? val
																		.replace(
																				/,/g,
																				'')
																		: val);
															}

															if (key == 'userLoanPaymentAmount') {
																return parseInt(val.length > 3 ? val
																		.replace(
																				/,/g,
																				'')
																		: val);
															}
															return val;
														}),
										"incomeDetails" : JSON
												.stringify(
														incomeinfo,
														function(key, val) {
															if (key == 'IncomeType') {
																return undefined;
															}
															if (key == 'disabled') {
																return undefined;
															}
															if (key == 'word') {
																return undefined;
															}
															if (key == '$$hashKey') {
																return undefined;
															} else if (key == 'userNetIncome') {
																return parseInt(val.length > 3 ? val
																		.replace(
																				/,/g,
																				'')
																		: val);
															}
															return val;
														}),
										"salaryDeduction" : JSON
												.stringify(
														salaryDatas,
														function(key, val) {
															if (key == '$$hashKey') {
																return undefined;
															}
															if (key == 'disabled') {
																return undefined;
															}
															if (key == 'word') {
																return undefined;
															}
															if (key == 'SalaryType') {
																return undefined;
															} else if (key == 'amount') {
																return parseInt(val.length > 3 ? val
																		.replace(
																				/,/g,
																				'')
																		: val);
															}
															return val;
														})
									};
									var checkterm = false;
									for (var i = 0; i < loaninfo.length; i++) {
										if (parseInt(loaninfo[i].userLoanRemainingTenure) > 360) {
											$('#Tenure' + i).addClass(
													'redcolorinput');
											checkterm = true;
											break;
										} else {
											$('#Tenure' + i).removeClass(
													'redcolorinput');
										}
									}
									if (checkterm) {
										$scope.error = true;
										$scope.error_message = "Terms Should be less than 30 years(360 months) ";
										$scope.success = false;
										$scope.loader = false;
									} else {
										financialService
												.insertFinancialData(postData)
												.then(
														function successCallback(response) {
															if (response.data.Result == 'Success') {
																$scope.success = true;
																$scope.success_message = "Your changes have been saved successfully ";
																$scope.error = false;
																$scope.loader = false;
																if (response.data.Page >= 4) {
																	$('#linknxt').css('pointer-events','all');
																	localStorage.setItem('PAGE_COMPLETED',response.data.Page);
																} else {
																	$('#linknxt').css('pointer-events','none');
																}
																localStorage.setItem("UserEmployment",JSON.stringify(JSON.parse(response.data.UserEmployment)));
																localStorage.setItem("UserIncome",JSON.stringify(JSON.parse(response.data.UserIncome)));
																localStorage.setItem("UserLoan",JSON.stringify(JSON.parse(response.data.UserLoan)));
																localStorage.setItem("UserSalary",JSON.stringify(JSON.parse(response.data.UserSalaryDeduction)));
																$scope.financialformditry.$setPristine();
																dropDown.updateFinancialDropdown();
//																financialService.insertUserFinancial();
																//incomeClone(JSON.stringify(JSON.parse(response.data.UserIncome)));
																//setFinancialValue();
//																setFinancialDropdown();
																if (e.target.className == "btn vcirclebtn pull-right savenxt") {
																	$rootScope.coApplicant = JSON.parse(localStorage.getItem('UserInfo')).coApplicantId;
																	if ($rootScope.coApplicant == 1) {
																		$state.go('index.coApplicantfinancial');
																	} else {
																		
																				$state.go('index.credit');
				//$state.go('index.bankverification');														
																	}
																} else {
																}
															} else {
																$scope.success = false;
																$scope.error = true;
																$scope.error_message = response.data.Result;
																$scope.loader = false;
																$scope.removeallerror();
															}
														});
									}
								};

								$scope.nextPages = function(user, income, loan,action) {
									var info = localStorage.getItem("UserInfo");
									var linc = JSON.parse(info)['coApplicantId'];
									if ($scope.financialformditry.$dirty) {
										var r = confirm("Current page has unsaved data. Are you sure you want to proceed?");
										if (r == true) {
											if (linc == 1) {
												$state.go('index.coApplicantfinancial');
											} else {
												$state.go('index.credit');
											}
										} else {
											$scope.error_message = "Highlighted Field values have been modified";
											$('input.ng-dirty').addClass(
													'redcolorinput');
											$('select.ng-dirty').addClass(
													'redcolorinput');
											$scope.sucess = false;
										}
									} else {
										if (linc == 1) {
											$state.go('index.coApplicantfinancial');
										} else {
											$state.go('index.credit');
										}
									}
								}

								$scope.backpage = function() {
									if ($scope.financialformditry.$dirty) {

										var r = confirm("Current page has unsaved data. Are you sure you want to proceed?");

										if (r == true) {
											if ($rootScope.coApplicant == 1) {
												$state.go('index.coApplicant');
											} else {
												$state.go('index.customerPersonal');
											}
										} else {
											$scope.error_message = "Highlighted Field values have been modified";
											$('input.ng-dirty').addClass('redcolorinput');
											$('select.ng-dirty').addClass('redcolorinput');
											$scope.sucess = false;

										}
									} else {
										if ($rootScope.coApplicant == 1) {
											$state.go('index.coApplicant');
										} else {
											$state.go('index.customerPersonal');
										}

									}
								}

								function dirtyCheck(user, income, loan, action) {
									if ($scope.checkassets != true) {
										$scope.omitdata = [];
										var infocheck = JSON.parse(localStorage.getItem("UserEmployment"));
										var infoLoan = JSON.parse(localStorage.getItem("UserLoan"));
										var infoincome = JSON.parse(localStorage.getItem("UserIncome"));
										$scope.orignalData = {
											"occupationType" : infocheck.occupationTypeId,
											"yearsofServiceinIndustry" : infocheck.yearsofServiceinIndustry,
											"yearsofServicewithEmployer" : infocheck.yearsofServicewithEmployer,
											"OrganisationName" : infocheck.employerName,
											"CreditScore" : infocheck.refCreditScoreId,
											"itfiled" : infocheck.itfiled,
											"assetValue" : infocheck.assetValue.toLocaleString('en-IN').replace(/\B(?=(\d{3})+(?!\d))/g,","),
											"loanValue" : infocheck.loanValue.toLocaleString('en-IN').replace(/\B(?=(\d{3})+(?!\d))/g,","),
											"preferedInterestRate" : infocheck.preferedInterestRate,
											"LoanTerm" : infocheck.loanTermId,
										};
										$scope.changesvalue = {
											"occupationType" : user.occupationTypeId,
											"yearsofServiceinIndustry" : user.yearsofServiceinIndustry,
											"yearsofServicewithEmployer" : user.yearsofServicewithEmployer,
											"OrganisationName" : user.employerName,
											"assetValue" : user.assetValue,
											"loanValue" : user.loanValue,
											"preferedInterestRate" : user.preferedInterestRate,
											"LoanTerm" : user.loanTermId,
											"itfiled" : user.itfiled,
										};
										$scope.checkomitdata = _
												.every(
														_
																.keys($scope.changesvalue),
														function(currentKey) {

															if (!(_
																	.has(
																			$scope.orignalData,
																			currentKey) && _
																	.isEqual(
																			$scope.changesvalue[currentKey],
																			$scope.orignalData[currentKey]))) {
																$scope.omitdata
																		.push(currentKey);
															}
															return $scope.omitdata;
														});

										if ($scope.omitdata.length > 0) {
											var r = confirm("Current page has unsaved data. Are you sure you want to proceed?");

											if (r == true) {
												if (action == 'next') {
													if ($rootScope.coApplicant == 1) {
														save(userinfo,
																incomeinfo,
																loaninfo,
																salaryDatas);
														$state
																.go('index.coApplicantfinancial');

													} else {
														save(userinfo,
																incomeinfo,
																loaninfo,
																salaryDatas);
														$state
																.go('index.credit');
													}
												} else {
													save(userinfo, incomeinfo,
															loaninfo,
															salaryDatas);
													$state
															.go('index.financial');
												}
											}
										}

										if ($scope.omitdata.length >= 1) {
											_.each($scope.omitdata, function(
													value) {
												$('#' + value).addClass(
														'redcolorinput');
											})
											$scope.sucess = false;
											$scope.error = false;
										} else if (infoincome.length > income.length) {
											$scope.success = false;
											$scope.error = true;
											$scope.true_reset = true;
											var r = confirm("Current page has unsaved data. Are you sure you want to proceed?");
											if (r == true) {
												if (action == 'next') {

													if ($rootScope.coApplicant == 1) {
														save(userinfo,
																incomeinfo,
																loaninfo,
																salaryDatas);
														$state
																.go('index.coApplicantfinancial');
													} else {
														save(userinfo,
																incomeinfo,
																loaninfo,
																salaryDatas);
														$state
																.go('index.credit');
													}
												} else {
													if ($rootScope.coApplicant == 1) {
														save(userinfo,
																incomeinfo,
																loaninfo,
																salaryDatas);
														$state
																.go('index.coApplicant');
													} else {
														save(userinfo,
																incomeinfo,
																loaninfo,
																salaryDatas);
														$state
																.go('index.customerPersonal');
													}
												}
											}
											$scope.error_message = "Verifiable Income changed";
										} else if (infoLoan.length > loan.length) {
											$scope.success = false;
											$scope.error = true;
											$scope.true_reset = true;
											var r = confirm("Current page has unsaved data. Are you sure you want to proceed?");
											if (r == true) {
												if (action == 'next') {
													if ($rootScope.coApplicant == 1) {
														save(userinfo,incomeinfo,loaninfo,salaryDatas);
														$state.go('index.coApplicantfinancial');
													} else {
														save(userinfo,incomeinfo,loaninfo,salaryDatas);
														$state.go('index.credit');
													}
												} else {
													if ($rootScope.coApplicant == 1) {
														save(userinfo,incomeinfo,loaninfo,salaryDatas);
														$state.go('index.coApplicant');
													} else {
														save(userinfo,incomeinfo,loaninfo,salaryDatas);
														$state.go('index.customerPersonal');
													}
												}
											}
											$scope.error_message = "Loan value changed"
										} else if (infoincome.length < income.length) {
											$scope.success = false;
											$scope.error = true;
											$scope.true_reset = true;
											var r = confirm("Current page has unsaved data. Are you sure you want to proceed?");
											if (r == true) {
												if (action == 'next') {

													if ($rootScope.coApplicant == 1) {
														save(userinfo,incomeinfo,loaninfo,salaryDatas);
														$state.go('index.coApplicantfinancial');
													} else {
														save(userinfo,incomeinfo,loaninfo,salaryDatas);
														$state.go('index.credit');
													}
												} else {
													if ($rootScope.coApplicant == 1) {
														save(userinfo,incomeinfo,loaninfo,salaryDatas);
														$state.go('index.coApplicant');
													} else {
														save(userinfo,incomeinfo,loaninfo,salaryDatas);
														$state.go('index.customerPersonal');
													}
												}
											}
											$scope.error_message = "Verifiable Income changed";
										} else if (infoLoan.length < loan.length) {
											$scope.success = false;
											$scope.error = true;
											$scope.true_reset = true;
											var r = confirm("Current page has unsaved data. Are you sure you want to proceed?");

											if (r == true) {
												if (action == 'next') {

													if ($rootScope.coApplicant == 1) {
														save(userinfo,incomeinfo,loaninfo,salaryDatas);
														$state.go('index.coApplicantfinancial');
													} else {
														save(userinfo,incomeinfo,loaninfo,salaryDatas);
														$state.go('index.credit');
													}
												} else {
													if ($rootScope.coApplicant == 1) {
														save(userinfo,incomeinfo,loaninfo,salaryDatas);
														$state.go('index.coApplicant');
													} else {
														save(userinfo,incomeinfo,loaninfo,salaryDatas);
														$state.go('index.customerPersonal');
													}
												}
											}
											$scope.error_message = "Loan value changed"
										} else {

											if (action == 'next') {
												if ($rootScope.coApplicant == 1) {

													$('#linknxt').html('Co-Applicant Financial<i style="padding: 0 1%;font-size: 16px;" class="fa fa-angle-double-right"></i>');
													$state.go('index.coApplicantfinancial');

												} else {
													$('#linknxt').html('Credit Report<i style="padding: 0 1%;font-size: 16px;" class="fa fa-angle-double-right"></i>');
													$state.go('index.credit');
												}
											} else {
												if ($rootScope.coApplicant == 1) {
													save(userinfo, incomeinfo,loaninfo,salaryDatas);
													$state.go('index.coApplicant');
												} else {
													save(userinfo, incomeinfo,loaninfo,salaryDatas);
													$state.go('index.customerPersonal');
												}
											}
										}
									} else {
										$scope.omitdata = [];
										var infocheck = JSON.parse(localStorage.getItem("UserEmployment"));
										var infoLoan = JSON.parse(localStorage.getItem("UserLoan"));
										var infoincome = JSON.parse(localStorage.getItem("UserIncome"));
										$scope.orignalData = {
											"occupationType" : infocheck.occupationTypeId,
											"yearsofServiceinIndustry" : infocheck.yearsofServiceinIndustry,
											"yearsofServicewithEmployer" : infocheck.yearsofServicewithEmployer,
											"OrganisationName" : infocheck.employerName,
											"CreditScore" : infocheck.refCreditScoreId,
											"itfiled" : infocheck.itfiled,
											
										};
										$scope.changesvalue = {
											"occupationType" : user.occupationTypeId,
											"yearsofServiceinIndustry" : user.yearsofServiceinIndustry,
											"yearsofServicewithEmployer" : user.yearsofServicewithEmployer,
											"OrganisationName" : user.employerName,
											"CreditScore" : user.refCreditScoreId,
											"itfiled" : user.itfiled,
										};
										$scope.checkomitdata = _.every(_.keys($scope.changesvalue),
														function(currentKey) {

															if (!(_.has($scope.orignalData,currentKey) && _.isEqual(
																			$scope.changesvalue[currentKey],
																			$scope.orignalData[currentKey]))) {
																$scope.omitdata.push(currentKey);
															}
															return $scope.omitdata;
														});
										if (infoincome.length > income.length) {
											$scope.success = false;
											$scope.error = true;
											$scope.true_reset = true;
											var r = confirm("Current page has unsaved data. Are you sure you want to proceed?");

											if (r == true) {
												if (action == 'next') {

													if ($rootScope.coApplicant == 1) {
														$state.go('index.coApplicantfinancial');
													} else {
														$state.go('index.credit');
													}
												} else {

													if ($rootScope.coApplicant == 1) {
														$state.go('index.coApplicant');
													} else {
														$state.go('index.customerPersonal');
													}
												}
											}
											$scope.error_message = "Verifiable Income changed";
										} else if (infoLoan.length > loan.length) {
											$scope.success = false;
											$scope.error = true;
											$scope.true_reset = true;
											var r = confirm("Current page has unsaved data. Are you sure you want to proceed?");

											if (r == true) {
												if (action == 'next') {

													if ($rootScope.coApplicant == 1) {
														$state.go('index.coApplicantfinancial');
													} else {
														$state.go('index.credit');
													}
												} else {
													if ($rootScope.coApplicant == 1) {
														$state.go('index.coApplicant');
													} else {
														$state.go('index.customerPersonal');
													}
												}
											}
											$scope.error_message = "Loan value changed"
										} else if (infoincome.length < income.length) {
											$scope.success = false;
											$scope.error = true;
											$scope.true_reset = true;
											var r = confirm("Current page has unsaved data. Are you sure you want to proceed?");

											if (r == true) {
												if (action == 'next') {

													if ($rootScope.coApplicant == 1) {
														$state.go('index.coApplicantfinancial');
													} else {
														$state.go('index.credit');
													}
												} else {
													if ($rootScope.coApplicant == 1) {
														$state.go('index.coApplicant');

													} else {
														$state.go('index.customerPersonal');
													}
												}
											}
											$scope.error_message = "Verifiable Income changed";
										} else if (infoLoan.length < loan.length) {
											$scope.success = false;
											$scope.error = true;
											$scope.true_reset = true;
											var r = confirm("Current page has unsaved data. Are you sure you want to proceed?");

											if (r == true) {
												if (action == 'next') {

													if ($rootScope.coApplicant == 1) {
														$state.go('index.coApplicantfinancial');
													} else {
														$state.go('index.credit');
													}
												} else {
													if ($rootScope.coApplicant == 1) {
														$state.go('index.coApplicant');
													} else {
														$state.go('index.customerPersonal');
													}
												}
											}
											$scope.error_message = "Loan value changed"
										} else {
											if (action == 'next') {
												if ($rootScope.coApplicant == 1) {
													$state.go('index.coApplicantfinancial');
												} else {
													$state.go('index.credit');
												}
											} else {

												if ($rootScope.coApplicant == 1) {
													$state.go('index.coApplicant');
												} else {
													$state.go('index.customerPersonal');
												}
											}
										}
									}
								}

								$scope.linkfin = function() {
									var info = localStorage.getItem("UserInfo");
									var linc = JSON.parse(info)['coApplicantId'];
									if (linc != 0) {
										$('#linprev').html('<i style="padding: 0 1%;font-size: 16px;" class="fa fa-angle-double-left"></i>Co-Applicant');
										$('#linknxt').html('Co-Applicant Financial<i style="padding: 0 1%;font-size: 16px;" class="fa fa-angle-double-right"></i>');
									} else {
										$('#linprev').html('<i style="padding: 0 1%;font-size: 16px;" class="fa fa-angle-double-left"></i>Personal Info');
										$('#linknxt').html('Credit Report<i style="padding: 0 1%;font-size: 16px;" class="fa fa-angle-double-right"></i>');
									}
								}
								
								/**
								 * Setting Label according to category type
								 */
								$scope.selectedCattgoryType = function(selectCatId,event){
									getCatLabel(selectCatId,event);
									
								}
								function getCatLabel(selectCatId,event){
									console.log($scope.occCatyId);
									
									if($scope.occCatyId == undefined){
										$('#fdyLabel').text("Enter the Details ");
									}else{
									for (var idd in $scope.occCatyId){
											if(selectCatId == $scope.occCatyId[idd]['categoryid']){
												$('#fdyLabel').text($scope.occCatyId[idd]['categorytext']);
											}
										}
									}
									if(event == 'ctgyChange' && selectCatId != null ){
										$scope.incomes = [];
										incomeClone(event,selectCatId)
									}
								}
								
								/**
								 * ng-init to call service if the occupation type is 2 or 3
								 */
								$scope.occTyp = function(occType,load){
									if(occType == 3 || occType == 2 || occType == 1){
									var occId = $.param({
										"OccupationtypeId":occType
									});
									
									financialService.getListOfOccupationCategory(occId).then(function successCallback(response){
										$scope.occCatyId = JSON.parse(response.data.Result);
									});
									}
								}
							}
					]);
})();