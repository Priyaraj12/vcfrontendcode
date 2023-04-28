// eslint-disable-next-line
var Ps = Ps || {};

(function() {
    'use strict';

    angular.module('bankverification')
        .controller('bankVerificationController', ['$state', '$http', '$scope', 'getcokkies', 'config', '$location', '$rootScope',
            function($state, $http, $scope, getcokkies, config, $location, $rootScope) {
                $scope.userId = parseInt(getcokkies.getUserId());
                $scope.sessionId = getcokkies.getsessionId();
                $scope.dropdown = JSON.parse(localStorage.getItem('dropdown'));
                $scope.infoSuccess = false;
                $scope.ListOfCreditScore = JSON.parse($scope.dropdown.CreditScore);

                var bankNav = parseInt(localStorage.getItem('PAGE_COMPLETED')); 
                
                $rootScope.PAGE_COMPLETED = bankNav;
                $scope.PAGE_COMPLETED = bankNav;
                
                
                
                angular.element(document).ready(function () {
                	$('#selector5').trigger('click');
                	var e = localStorage.getItem('userLpiStatus');
                	if(e != 1){
                		$scope.linkbankbtn = true;
                		$scope.savebtn = true;
                		$scope.skipbtn = true;
                	}else{
                		$scope.linkbankbtn = false;
                		$scope.savebtn = false;
                		$scope.skipbtn = false;
                	}
                  
                 });

                $scope.setAction = function() {
                    document.myForm.action = config.apiUrl +"/yodlee/getPerfiosLink";
                    $scope.siteValue = "user/#/index/bankVerify";
                }

                $scope.setStatementAction = function() {
                        document.statementForm.action = config.apiUrl + "/yodlee/getPerfiosStatementLink";
                        $scope.siteStatement = "user/#/index/bankVerify";
                }

                $scope.opentrue = function() {
                    $scope.sucess = false;
                    $scope.checkList = [];
                    _.each($scope.statementIncomes, function(val) {
                        if (val.selectedIndicator == true || val.selectedIndicator == 1) {
                            val.selectedIndicator = 1;
                        } else {
                            val.selectedIndicator = 0;
                        }
                    });
                    _.each($scope.statementLoans, function(val) {
                        if (val.selectedIndicator == true || val.selectedIndicator == 1) {
                            val.selectedIndicator = 1;
                        } else {
                            val.selectedIndicator = 0;
                        }
                    });
                    var incomes = _.where($scope.statementIncomes, { selectedIndicator: 1 });
                    var loans = _.where($scope.statementLoans, { selectedIndicator: 1 });

                    if ($scope.open) {
                        if (incomes.length == 0 && loans.length == 0) {
                            $scope.sucess = true;                            
                            $scope.message = "Your income and loan verification is incomplete.";             
                        }
                        $scope.open = false;

                    } else {
                        $scope.open = true;
                    }
                }


                $rootScope.username = localStorage.getItem("user_name");
                $rootScope.assetShow = parseInt(localStorage.getItem("assetShow"));
                $rootScope.coApplicant = parseInt(localStorage.getItem("coApplicant"));
                $scope.config = {
                    itemsPerPage: 10,
                    fillLastPage: true
                }
                $scope.currentPage = 0;
                $scope.pageSize = 5;
                $scope.loader = false;
                $scope.bankdetails = [];
                $scope.numberOfPages = function() {
                    return Math.ceil($scope.bankdetails.length / $scope.pageSize);
                }
                $scope.checkassets = JSON.parse(localStorage.getItem("UserInfo")).propertyIdentifierId;
                if ($location.search().id != undefined) {
                    $http({
                        url: config.apiUrl + '/yodlee/getPerfiosUserBankAccountsAndTransaction',
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        data: $.param({ 'sessionId': parseInt(getcokkies.getsessionId()), 'userId': parseInt(getcokkies.getUserId()) })
                    }).then(function successCallback(response) {
                    	localStorage.setItem("mint", 600000);
						$rootScope.SessionTime = 600000;
                        $http({
                            url: config.apiUrl + '/yodlee/getListOfPerfiosUserBankAccount',
                            method: "POST",
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            },
                            data: $.param({ 'sessionId': parseInt(getcokkies.getsessionId()), 'userId': parseInt(getcokkies.getUserId()) })
                        }).then(function successCallback(response) {
                        	localStorage.setItem("mint", 600000);
							$rootScope.SessionTime = 600000;
                            if(response.data.Result.length=='2')
                            {
                                 $scope.checkBankVerify = false;
                            }
                            else
                            {
                                $scope.checkBankVerify = true;
                            }
                            $scope.bankdetails = JSON.parse(response.data.Result);
                            $scope.loader = true;
                        });
                    }, function errorCallback(response) {
                        $http({
                            url: config.apiUrl + '/yodlee/getListOfPerfiosUserBankAccount',
                            method: "POST",
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            },
                            data: $.param({ 'sessionId': parseInt(getcokkies.getsessionId()), 'userId': parseInt(getcokkies.getUserId()) })
                        }).then(function successCallback(response) {
                        	localStorage.setItem("mint", 600000);
							$rootScope.SessionTime = 600000;
                            $scope.bankdetails = JSON.parse(response.data.Result);
                            $scope.loader = true;
                        });
                    });
                } else {
                    $http({
                        url: config.apiUrl + '/yodlee/getListOfPerfiosUserBankAccount',
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        data: $.param({ 'sessionId': parseInt(getcokkies.getsessionId()), 'userId': parseInt(getcokkies.getUserId()) })
                    }).then(function successCallback(response) {
                    	localStorage.setItem("mint", 600000);
						$rootScope.SessionTime = 600000;
                        $scope.bankdetails = JSON.parse(response.data.Result);
                        $scope.loader = true;
                    });

                }
                $scope.incomeandloan = function() {

                    $scope.sucess = false;
                    $scope.checkList = [];
                    _.each($scope.statementIncomes, function(val) {
                        if (val.selectedIndicator == true || val.selectedIndicator == 1) {
                            val.selectedIndicator = 1;
                        } else {
                            val.selectedIndicator = 0;
                        }
                    });
                    _.each($scope.statementLoans, function(val) {
                        if (val.selectedIndicator == true || val.selectedIndicator == 1) {
                            val.selectedIndicator = 1;
                        } else {
                            val.selectedIndicator = 0;
                        }
                    });
                    var incomes = _.where($scope.statementIncomes, { selectedIndicator: 1 });
                    var loans = _.where($scope.statementLoans, { selectedIndicator: 1 });
                    $scope.error = false;
                    $scope.infoSuccess = false;
                    _.each(incomes, function(val) {
                        $scope.checkList.push({ 'incomeloanverifyid': val.incomeloanverifyid });
                    });
                    _.each(loans, function(val) {
                        $scope.checkList.push({ 'incomeloanverifyid': val.incomeloanverifyid });
                    });

                    $http({
                        url: config.apiUrl + '/yodlee/insertIncomeAndLoanByUserSelected?sessionId=' + getcokkies.getsessionId(),
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        data: $.param({
                            'listOfId': JSON.stringify($scope.checkList),
                            'userId': parseInt(getcokkies.getUserId())
                        })

                    }).then(function successCallback(response) {
                    	localStorage.setItem("mint", 600000);
						$rootScope.SessionTime = 600000;
                        $scope.sucess = true;
                        if (incomes.length == 0 && loans.length == 0) {
                            $scope.sucess = false;
                            $scope.infoSuccess = true;
                            $scope.infoMessage = "Please select and confirm the income and loan Categories from the list below.";
             
                        } else {
                            $scope.message = "Your selected transactions are saved successfully."
                            $scope.open = false;

                        }

                    }, function errorCallback(response) {
                    });

                }

                $scope.delete = function(bankId) {
                    $scope.loader = false;
                    $scope.open = false;
                    $http({
                        url: config.apiUrl + '/yodlee/deletePerfiosBankAccount?sessionId=' + getcokkies.getsessionId(),
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        data: $.param({ 'userId': parseInt(getcokkies.getUserId()), 'bankId': parseInt(bankId) })
                    }).then(function successCallback(response) {
                    	localStorage.setItem("mint", 600000);
						$rootScope.SessionTime = 600000;
                        if (response.data.Result == "Success") {
                            $http({
                                url: config.apiUrl + '/yodlee/getListOfPerfiosUserBankAccount',
                                method: "POST",
                                headers: {
                                    'Content-Type': 'application/x-www-form-urlencoded'
                                },
                                data: $.param({ 'sessionId': parseInt(getcokkies.getsessionId()), 'userId': parseInt(getcokkies.getUserId()) })
                            }).then(function successCallback(response) {
                            	localStorage.setItem("mint", 600000);
								$rootScope.SessionTime = 600000;
                                    if(response.data.Result.length=='2')
                                    {
                                         $scope.checkBankVerify = false;
                                    }
                                    else
                                    {
                                        $scope.checkBankVerify = true;
                                    }
                                $scope.bankdetails = JSON.parse(response.data.Result);
                                $scope.numberOfPages = function() {
                                    return Math.ceil($scope.bankdetails.length / $scope.pageSize);
                                }
                                $scope.loader = true;
                                $scope.sucess = true;
                                $scope.error = false;
                                $scope.message = "Sucessfully Deleted";
                            });
                        } else {
                            $scope.loader = true;
                            $scope.error = true;
                            $scope.sucess = false;
                            $scope.message = "Not deleted";
                        }
                    });
                }

                $scope.next = function() {
                    $state.go('index.credit');
                    
                }                
                
                $scope.skip = function(){
                	 $state.go('index.credit');
                }
                
                $scope.back = function() {                	
                	var info=localStorage.getItem("UserInfo");
                	var linc = JSON.parse(info)['coApplicantId'];
                    if (linc == 1) {
                        $state.go('index.coApplicantfinancial');
                    } else {
                        $state.go('index.financial');
                    }
                }
                $scope.getIncomeAndLoan = function(id) {
                    $scope.open = false;
                    $scope.sucess = false;
                    $scope.infoSuccess = false;
                    $http({
                        url: config.apiUrl + '/user/getVerifyUserIncomeAndLoan?sessionId=' + getcokkies.getsessionId(),
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        data: $.param({ 'sessionId': parseInt(getcokkies.getsessionId()), 'userId': parseInt(getcokkies.getUserId()), "bankId": id })
                    }).then(function successCallback(response) {
                    	localStorage.setItem("mint", 600000);
						$rootScope.SessionTime = 600000;
                        $scope.infoMessage = "Please select and confirm the income and loan Categories from the list below.";
                        $scope.open = true;
                        $scope.bankstatement = JSON.parse(response.data.result)['#result-set-1'];
                        $scope.statementIncomes = _.where($scope.bankstatement, { incomeLoanCategory: 'Income' });
                        $scope.statementLoans = _.where($scope.bankstatement, { incomeLoanCategory: 'Loans' });
                    });
                };

                //reset the success msg
                $scope.sucessCall=function (){
                    $scope.sucess = false;
                }
                $scope.linktext = function(){
                	var info=localStorage.getItem("UserInfo");
                	var linc = JSON.parse(info)['coApplicantId'];
             	   if (linc == 1) {
                    	
                    	$('#lintxt').html('<i style="padding: 0 1%;font-size: 16px;" class="fa fa-angle-double-left"></i>Co-Applicant Financial');
                        
                    } else {
                    	$('#lintxt').html('<i style="padding: 0 1%;font-size: 16px;" class="fa fa-angle-double-left"></i>Financial Info');
                    }
             }
                
            }
        ]);
})();