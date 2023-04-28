var Ps = Ps || {};

angular
		.module('common', [])
		.controller(
				'MainController',
				[
						'$state',
						'$http',
						'$scope',
						'$rootScope',
						'ngDialog',
						'$location',
						'config',
						'getcokkies',
						function($state, $http, $scope, $rootScope, ngDialog,
								$location, config, getcokkies) { // currentUser
							$scope.currentUser = $rootScope.currentUser;
							
							// $scope.PAGE_COMPLETED = 0;
							 function PAGE_COMPLETED(){
								
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
														} else {
															 $scope.PAGE_COMPLETED = page[0].page_completed;
															localStorage.setItem('PAGE_COMPLETED',$scope.PAGE_COMPLETED);

														}
													});														

							} 

							$scope.time = new Date().getTime();
							// $rootScope.SessionTime = 600000;
							$rootScope.IDLE_TIMEOUT = 180; // seconds
							$rootScope.IDLE_SESSION_TIMEOUT = 360;
							$rootScope._idleSecondsCounter = 0;
							$rootScope.secondsCounter = 0;
							$rootScope.isModal = true;
							//04/07/2019 :Geetha- Adding if condition to check for email verification message
							if(window.location.hash.indexOf("verified=true")>=0){
								$scope.successemail="Email has been successfully verified. Please Login."
							}
							// Changes completed
							$scope.Logout = function() {
								document.cookie = "userId=0";
								/* location.reload(); */
								localStorage.clear();
								clearInterval($rootScope.myInterval);
								$rootScope._idleSecondsCounter = 0;
								$rootScope.secondsCounter = 0;
								$rootScope.SessionTime = 600000;
								$rootScope.tickDuration = 1000;

								if($('#session')){
									$('#session').modal('hide');
								}
								// clearInterval($rootScope.checkIdleTime);
								// clearInterval($rootScope.checkSecondTime);
								// clearInterval($rootScope.myInterval);
								window.location.href = '#/login';
								location.reload();
							}

						/*	$scope.home = function() {
								document.cookie = "userId=0";
								localStorage.clear();
								window.location.href = "../index.html";
							}*/
							$scope.login = function() {
								window.location.href = '#/login';
								location.reload();
							}
							$scope.setLocalStorage = function() {
								localStorage.setItem("count", 0);
							}

							$scope.userLPiStatus = localStorage.getItem('userLpiStatus');
							if($scope.userLPiStatus ==1){
//                        		$('#trackApp').hide();
//								$scope.lpiDisabled = true;
								$('#trackApp').css({'pointer-events':'none', 'opacity':'0.6'});
								
                        	}else{
//                        		$scope.lpiDisabled = false;
                        		$('#trackApp').css({'pointer-events':'auto', 'opacity':'1'});
                        	}
							
							
							$scope.myTimeout = function() {
								var sessionId = getcokkies.getsessionId();
								var userId = parseInt(getcokkies.getUserId());
								$http(
										{
											url : config.apiUrl
													+ '/user/refreshsession?sessionId='
													+ sessionId,
											method : "POST",
											headers : {
												'Content-Type' : 'application/json'
											},
											data : $.param({
												'userId' : userId
											})
										})
										.then(
												function successCallback(
														response) {
													$rootScope._idleSecondsCounter = 0;
													$rootScope.SessionTime = 600000;
													//$rootScope.PAGE_COMPLETED = pageNav;
													$rootScope.tickDuration = 1000;
													$rootScope.secondsCounter = 0;
													clearInterval($rootScope.myInterval);
													// clearInterval($rootScope.checkIdleTime);
													// clearInterval($rootScope.checkSecondTime);
													$rootScope.isModal = true;

												},
												function errorCallback(response) {
													$rootScope.isModal = false;
													$('#session').modal('hide');
													$('#sessionExpire').modal('show');	
													$scope.Logout();


												});
							}

							if ($location.$$url.indexOf('login') == -1) {
								if ($location.$$url.indexOf('Register') == -1 && $location.$$url.indexOf('reset') == -1) {
									$rootScope.SessionTime = localStorage.getItem('mint');
									$rootScope.tickDuration = 1000;
									$rootScope.checkSecondTime = setInterval(
											function() {
												$rootScope.secondsCounter++;
											}, 2000);

									$rootScope.checkIdleTime = setInterval(
											function() {
												$rootScope._idleSecondsCounter++;
												if ($rootScope._idleSecondsCounter >= $rootScope.IDLE_TIMEOUT) {
													if ($rootScope.isModal) {
														$rootScope.isModal = false;
														$('#session').modal( 'show');
													}
												}
											}, 2000);

									$rootScope.myInterval = setInterval(
											function() {
												$rootScope.SessionTime = $rootScope.SessionTime
														- $rootScope.tickDuration
												$scope.seconds = ($rootScope.SessionTime / 1000);
												if (($rootScope._idleSecondsCounter < $rootScope.IDLE_TIMEOUT)
														&& ($rootScope.secondsCounter > $rootScope.IDLE_SESSION_TIMEOUT)) {
													$scope.myTimeout();
												} else if ($rootScope.SessionTime < 240000
														&& $rootScope.tickDuration > 0) {
													if ($rootScope.isModal) {
														$('#session').modal( 'show');
														$rootScope.isModal = false;
														$rootScope.tickDuration = 0;
													} else {
														$('#session').modal('hide');
														$('#sessionExpire').modal('show');	

														$scope.Logout();
													}
												}
											}, 2000);
								}

								// window.setInterval(CheckIdleTime);
								// window.setInterval(SecondTime);

								// idle time
								
								$("#session").on("hidden.bs.modal", function () {
								    // put your default event here
									$scope.myTimeout();
								});

								if ($location.$$url != '/login.html' && $location.$$url.indexOf('login') == -1
										&& $location.$$url != '/login' && $location.$$url.indexOf('Register') == -1 && $location.$$url != '/Register' && $location.$$url.indexOf('reset') == -1) {
									if ($rootScope.secondsCounter <= $rootScope.IDLE_TIMEOUT) {
										if ($rootScope._idleSecondsCounter < $rootScope.secondsCounter) {
											$rootScope.secondsCounter = 0;
											$rootScope._idleSecondsCounter = 0;
										}
									}
									document.onclick = function() {
										$rootScope._idleSecondsCounter = 0;
									};
									// document.onmousemove = function() {
									// $rootScope._idleSecondsCounter = 0;
									// };
									document.onkeypress = function() {
										$rootScope._idleSecondsCounter = 0;
									};

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
													function successCallback( response) {

														var page = JSON .parse(response.data.Page);
														if (page == "") {
															$rootScope.PAGE_COMPLETED= 0;

														} else {
															$rootScope.PAGE_COMPLETED = page[0].page_completed;
															localStorage.setItem('PAGE_COMPLETED',$scope.PAGE_COMPLETED);
														var nav = $rootScope.PAGE_COMPLETED;

														$(".navbar  a") .each( function( index) {
																			if (index > nav + 1)
																				$( this).css( {
																									'cursor':'not-allowed',
																									//'pointer-events' : 'none'
																								}).attr('title','Please Fill the Current Page');
																			

																		});

													}
													},
													
													function errorCallback( response) {
														// called asynchronously
														// if
														// an error occurs
														// or server returns
														// response with an
														// error
														// status.
													});
									

								}

							}
						} ]);
