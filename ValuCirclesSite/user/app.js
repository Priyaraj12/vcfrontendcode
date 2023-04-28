
angular
		.module(
				'vcircle',
				[ 'ui.bootstrap', 'ui.router', 'Authentication', 'common',
						'commonservices', 'customerPersonal', 'coApplicant',
						'financial', 'lpi', 'assets', 'bankverification',
						'landing', 'account', 'coApplicantFinancial', 'reset',
						'ngDialog', 'sponsor', 'ngMessages', 'commonFactory',
						'ngMessages', 'apicommon', 'personalService',
						'financialService', 'coApplicantService',
						'assetService', 'lpiService', 'accountService',
						'sponsorService', 'coApplicantFinancialService',
						'bankverificationService', 'Contact',
						'zingchart-angularjs', 'credit', 'creditCoApp',
						'loanOffers', 'trackMyRequest', 'myRequestStatus','ngSanitize'

				])
		.config(
				[
						'$stateProvider',
						'$urlRouterProvider',
						'$httpProvider',
						function($stateProvider, $urlRouterProvider,
								$httpProvider) {

							if (window.location.href.split('/')[5] == 'contact')
								$urlRouterProvider.otherwise('/contact');
							else
								$urlRouterProvider.otherwise('/login');

							if (!$httpProvider.defaults.headers.get) {
								$httpProvider.defaults.headers.get = {};
							}
							$httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
							$httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
							$httpProvider.defaults.headers.get['Expires'] = '-1';
							$httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
							$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
							delete $httpProvider.defaults.headers.common['X-Requested-With'];
							$stateProvider
									.state(
											'index',
											{
												abstract : true,
												url : '/index',
												templateUrl : 'scripts/common/content.html',
												controller : 'MainController',
												data : {
													pageTitle : 'MainController'
												},
												authenticate : false
											})
									.state(
											'maintenance',
											{
												abstract : true,
												url : '/maintenance',
												templateUrl : 'scripts/common/maintenance.html',
												controller : 'MainController',
												data : {
													pageTitle : 'MainController'
												},
												authenticate : false
											});
							$httpProvider.interceptors
									.push(function($q) {
										return {

											'response' : function(response) {
												localStorage.setItem("mint",600000);

												if (localStorage.getItem("userLpiStatus") != "1") {
													$("input").prop("disabled", true);
													$(".collapsebtn").removeAttr("disabled");
													$(".loggout").prop("disabled", false);
													$("select").prop( "disabled", true);
													$(".vcirclebtn").attr( "disabled", 'disabled');
													$('label').css('opacity', '0.5');
													$(".addIncome").attr( "disabled", 'disabled');
													$(".dropdown-toggle").attr( "disabled", false);
													$(".verifybut").attr("disabled", true);
													$(".verifybut").css({'cursor':'not-allowed','opacity':' 0.5'});
													$("#otppp").attr("disabled", false);
													if($('#loantime').prop('disabled')){
														$('#loantime+label').css('top','-58%');
													}
													
												}
												$('label').css('white-space','nowrap');
												if (response.status === 401) {
													$('#session').modal('show');
												}
												return response
														|| $q.when(response);
											},
											'responseError' : function(
													rejection) {
												if (rejection.status === 401) {

													$('#session').modal('show');

												} else if (rejection.status == -1) {
													window.location.href = '#/maintenance';
												}
												return $q.reject(rejection);
											}
										};
									});
						} ])
		.filter('startFrom', function() {
			return function(input, start) {
				start = +start; // parse to int
				return input.slice(start);
			}
		})
		.run(
				[
						'$rootScope',
						'$state',
						'getcokkies',
						'$templateCache',
						'$location',
						'ngDialog',
						function($rootScope, $state, getcokkies,
								$templateCache, $location, ngDialog) {

							if ($location.search().emailId
									|| $location.search().emailId) {
							} else if (window.location.href.split('/')[5] == 'contact') {
								window.location.href = '#/contact';
							} else if (window.location.hash.indexOf("Register")>=0) {	
								window.location.href = '#/Register';
						//04/07/2019 :Geetha- Adding if condition to check for email verification message
							} else if (window.location.hash.indexOf("verified=1")>=0) {									
								window.location.href = '#/login?verified=true';		
						// Changes completed

							} else if (parseInt(getcokkies.getUserId()) == 0) {
								window.location.href = '#/login';
							}
							$rootScope.$on('$stateChangeStart', function(event,
									toState, toParams, fromState, fromParams) {
								document.title = "ValuCircles - "
										+ toState.data.pageTitle
							});
						} ])
		.constant('config', {
		//apiUrl: 'http://3.111.159.93/StagingService',
//LOCAL			 
		apiUrl: 'http://localhost:8081/StagingService',
//Production		apiUrl: 'https://valucircles.com/StagingService',
//Dev			apiUrl: 'http://13.127.114.89/StagingService',
			baseUrl : '/',
			enableDebug : true
		})

		.constant('session', {
			sessionTime : 600000

		})

		.directive(
				'vdatepicker',
				function($timeout) {
					var linker = function(scope, element, attrs, ngModelCtrl,
							$scope) {
						$timeout(function() {
							$('#' + element[0].id)
									.datepicker(
											{
												dateFormat : 'mm/dd/yy',
												minDate : new Date(1910, 0, 1),
												yearRange : '1910:+0',
												changeMonth : true,
												changeYear : true,
												onSelect : function(date, ui) {

													var dob = new Date(
															ui.selectedYear);
													var today = new Date();
													var age = (today
															.getFullYear() - ui.selectedYear);
													if (this.id == 'DateofBirth') {
														$('#Age').val(age);
														scope.$parent.$parent.userInfo.age = age;
														scope.$parent.$parent.userInfo.dateofBirth = date;
														scope.$parent.$parent.Personalform.$dirty = true;
														scope.$apply()
													} else {
														var text = scope.$parent.$index;
														var text = 'applicants'
																+ text;
														scope.$parent.coApplicant.age = age;
														scope.$parent.coApplicant.dateofBirth = date;
														scope.$parent.$parent.coApplicantform.$dirty = true;
														scope.$apply();
													}
												}
											});
						});
					};

					return {
						restrict : 'A',
						require : 'ngModel',
						transclude : true,
						link : linker,
						scope : {
							value : '='
						}
					};
				});
