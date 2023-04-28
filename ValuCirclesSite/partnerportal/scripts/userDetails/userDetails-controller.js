
// eslint-disable-next-line
var Ps = Ps || {};


(function () {
'use strict';

  angular.module('userDetails')
  .controller('userDetailsController',['$state','$http','$scope','getcokkies','config',
  function ($state,$http,$scope,getcokkies, config) { 
    $scope.loader = true;
    var currentUserId=getcokkies.getUserIdFromUrl();
 
    $scope.currentuserId=currentUserId;
  

	var lpiScore=getcokkies.getLenderLpiFromUrl();

    $scope.lpiScore=lpiScore;


    // $http({
    // url:config.apiUrl+'/user/getSummaryDetails?sessionId='+getcokkies.getsessionId(),
    // method:"POST",
    // headers: {
    //   'Content-Type': 'application/x-www-form-urlencoded'
    // },
    // data: $.param({'userId': parseInt(getcokkies.getUserIdFromUrl())})

    // }).then(function successCallback(response) {
    //   console.log(response);
    //   $scope.UserInfo = JSON.parse(response.data.UserInfo);
    //  //console.log($scope.UserInfo);
    //  // $scope.SelfEmployment = JSON.parse(response.data.SelfEmployment);
    //   $scope.UserEmployment = JSON.parse(response.data.UserEmployment);
    //   $scope.UserIncome = JSON.parse(response.data.UserIncome);
    //   $scope.UserLoan = JSON.parse(response.data.UserLoan);
    //   $scope.UserFinancial = JSON.parse(response.data.UserFinancial);
    //   $scope.loader = false;
    // }, function errorCallback(response) {
    // // called asynchronously if an error occurs
    // // or server returns response with an error status.
    // });
										
    $http({
    url:config.apiUrl+'/user/getUserInfoDetailsForBuilders?sessionId='+getcokkies.getsessionId(),
    method:"POST",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: $.param({'userId': parseInt(getcokkies.getUserIdFromUrl())})

    }).then(function successCallback(response) {
      $scope.userDetails = JSON.parse(response.data.userInfo)['#result-set-1'];

	  
	  $scope.loader = false;
	  
	   if($scope.data != null){
        for (var i = 0; i < $scope.data.length  ;  i++) { /*
          var EffectiveCreditSCore=$scope.data[i].UserEffectiveCreditSCore;
		  var LpiDesc=$scope.data[i].lpi;
		  
		  if (EffectiveCreditSCore == -99)
		  {
			      //alert("effective score -99 +" + EffectiveCreditSCore);
				  EffectiveCreditSCore="Credit Check Pending"
				  //alert("effective score -99 +" + EffectiveCreditSCore);
				  $scope.data[i].UserEffectiveCreditSCore=EffectiveCreditSCore;
				  //alert("scopedata +" + $scope.data[i].UserEffectiveCreditSCore);
				 
		  }
		  
		  if (EffectiveCreditSCore == 0)
		  {
			      //alert("effective score 0 +" + EffectiveCreditSCore);
				  EffectiveCreditSCore="No Credit History"
				  //alert("effective score 0 +" + EffectiveCreditSCore);
				  $scope.data[i].UserEffectiveCreditSCore=EffectiveCreditSCore;
				  //alert("scopedata +" + $scope.data[i].UserEffectiveCreditSCore);
				 
		  }
		  
		  if (EffectiveCreditSCore >0 && EffectiveCreditSCore <300)
		  {
			      //alert("effective score betweeon 0 and 300 +" + EffectiveCreditSCore);
				  EffectiveCreditSCore="Insufficient History"
				  //alert("effective score betweeon 0 and 300 +" + EffectiveCreditSCore);
				  $scope.data[i].UserEffectiveCreditSCore=EffectiveCreditSCore;
				  //alert("scopedata +" + $scope.data[i].UserEffectiveCreditSCore);
				  
		  }
		  
		  if (EffectiveCreditSCore >=300 && EffectiveCreditSCore <550)
		  {
				  EffectiveCreditSCore="High Risk"
				  $scope.data[i].UserEffectiveCreditSCore=EffectiveCreditSCore;
				 
		  }
		  if (EffectiveCreditSCore >=550 && EffectiveCreditSCore <670)
		  {
				  EffectiveCreditSCore="Medium Risk"
				  $scope.data[i].UserEffectiveCreditSCore=EffectiveCreditSCore;
				 
		  }
		  if (EffectiveCreditSCore >=670 && EffectiveCreditSCore <=900)
		  {
				  EffectiveCreditSCore="Low Risk"
				  $scope.data[i].UserEffectiveCreditSCore=EffectiveCreditSCore;
				 
		  }
			
		  if (LpiDesc <= 20)
		  {
			      LpiDesc="Very Poor"
				  $scope.data[i].lpi=LpiDesc;
		  }
		  
		  if (LpiDesc > 20 && LpiDesc <= 40)
		  {
				  LpiDesc="Poor"
				  $scope.data[i].lpi=LpiDesc;
		  }
		  
		  if (LpiDesc > 40 && LpiDesc <= 60)
		  {
				  LpiDesc="Fair"
				  $scope.data[i].lpi=LpiDesc;
		  }
		
		  if (LpiDesc > 60 && LpiDesc <= 80)
		  {
				  LpiDesc="Good"
				  $scope.data[i].lpi=LpiDesc;
		  }
		
		  if (LpiDesc > 80 && LpiDesc <= 100)
		  {
				  LpiDesc="Excellent"
				  $scope.data[i].lpi=LpiDesc;
		  }
		  
		$scope.data[i].EligloanAmount = $scope.data[i].EligloanAmount.toLocaleString('en-IN').replace(/\B(?=(\d{3})+(?!\d))/g,",");
	    $scope.data[i].reqLoanAmount = $scope.data[i].reqLoanAmount.toLocaleString('en-IN').replace(/\B(?=(\d{3})+(?!\d))/g,",");
	    $scope.data[i].LoanShortfall = $scope.data[i].LoanShortfall.toLocaleString('en-IN').replace(/\B(?=(\d{3})+(?!\d))/g,",");
		$scope.data[i].AssetCost = $scope.data[i].AssetCost.toLocaleString('en-IN').replace(/\B(?=(\d{3})+(?!\d))/g,",");
		$scope.data[i].OwnContribution = $scope.data[i].OwnContribution.toLocaleString('en-IN').replace(/\B(?=(\d{3})+(?!\d))/g,",");
	   	   */
	   
        }
      
	  }
	  
	  
	  
    }, function errorCallback(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
    });
	
	
	/* Added multiple calls by Prernna */
	
	    $http({
    url:config.apiUrl+'/lender/getLenderCandidate?sessionId='+getcokkies.getsessionId(),
    method:"POST",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data:$.param({'userId': parseInt(getcokkies.getUserIdFromUrl())})

    }).then(function successCallback(response) {
      
      $scope.UserInfo = JSON.parse(response.data.Result);
      $scope.loader = false;
     //console.log($scope.UserInfo);
     // $scope.SelfEmployment = JSON.parse(response.data.SelfEmployment);
     //  $scope.UserEmployment = JSON.parse(response.data.UserEmployment);
      // $scope.UserIncome = JSON.parse(response.data.UserIncome);
      // $scope.UserLoan = JSON.parse(response.data.UserLoan);
      // $scope.UserFinancial = JSON.parse(response.data.UserFinancial);
      
    }, function errorCallback(response) {
		                $scope.click = false;
                        $scope.loader = false;
                    	if (response.status == 401) {
							swal("Session Timeout", "Your session has timed out. Please login again.", "info");
							window.location.href = '#/login';
                        }
						if (response.status != 401) {
							swal("In userDetails-controller.js");
                            swal("Sorry", "Something went wrong. Please try after sometime.", "error");
							window.location.href = '#/login';
                        }
						
    // called asynchronously if an error occurs
    // or server returns response with an error status.
    });
	
	//get list of Lpi List
    $http({
        url: config.apiUrl+'/user/getListOfLpiStatus?sessionId='+getcokkies.getsessionId(),
        method: "POST",
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
        },
        data:$.param({'userId': parseInt(getcokkies.getUserId())})
    }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        $scope.statusList = JSON.parse(response.data.Result);
        $scope.loader = false;


        }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
    });


     //get list of user Income
    $http({
        url: config.apiUrl+'/lender/getUserIncome?sessionId='+getcokkies.getsessionId(),
        method: "POST",
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
        },
        data:$.param({'userId': parseInt(getcokkies.getUserIdFromUrl())})
    }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
 
        $scope.UserIncome = JSON.parse(response.data.Result);
	
        $scope.loader = false;
   

        }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
    });
	
	$http({
        url: config.apiUrl+'/lender/getUserObligations?sessionId='+getcokkies.getsessionId(),
        method: "POST",
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
        },
        data:$.param({'userId': parseInt(getcokkies.getUserIdFromUrl())})
    }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
 
        $scope.UserLoans = JSON.parse(response.data.Result);
        $scope.loancount = JSON.parse(response.data.Result).length;
		$scope.loader = false;  
		
        }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
    });
	
	
		$http({
        url: config.apiUrl+'/lender/getUserCRAccounts?sessionId='+getcokkies.getsessionId(),
        method: "POST",
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
        },
        data:$.param({'userId': parseInt(getcokkies.getUserIdFromUrl())})
    }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        $scope.UserLPiCategoryScores = JSON.parse(response.data.Result);
		$scope.lpicategorycount = JSON.parse(response.data.Result).length;
        $scope.loader = false;  

        }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
    });
	
	/*
	
	$http({
        url: config.apiUrl+'/lender/getUserCRPayments?sessionId='+getcokkies.getsessionId(),
        method: "POST",
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
        },
        data:$.param({'userId': parseInt(getcokkies.getUserIdFromUrl())})
    }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        console.log("CRPayments",response);
        $scope.UserCRPayments = JSON.parse(response.data.Result);
        $scope.loader = false;  

        }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
    });
	
	*/
	
	/* End of multiple calls by Prernna */


	//lender lpi details
    $http({
        url:config.apiUrl+'/user/getUserLenderLpiScore?sessionId='+getcokkies.getsessionId(),
        method:"POST",
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: $.param({
          'sessionId': parseInt(getcokkies.getsessionId()),
          'userId': parseInt(getcokkies.getUserIdFromUrl()),
          'debug':0 })

        }).then(function successCallback(lenderresponse) {
          $scope.lenders = JSON.parse(lenderresponse.data.result);
          $scope.lpi = JSON.parse(lenderresponse.data.VCScore);
		  $scope.lendercount = JSON.parse(lenderresponse.data.result).length;
          $scope.loader = false;
        }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        }); 

  }]);
})();
