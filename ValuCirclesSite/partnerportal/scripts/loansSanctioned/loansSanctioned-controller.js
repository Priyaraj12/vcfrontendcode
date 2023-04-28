// eslint-disable-next-line
var Ps = Ps || {};

(function () {
'use strict';

  angular.module('loansSanctioned')
  .controller('loansSanctionedController',['$state','$http','$scope','getcokkies','config',
  function ($state,$http,$scope,getcokkies,config) { 
    $scope.loader = true;
   /*
   $scope.config = {
      itemsPerPage: 10,
      fillLastPage: true
    }
    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.data = [];
    $scope.numberOfPages=function(){
      return Math.ceil($scope.data.length/$scope.pageSize);                
    }
	*/


//$http({
     // url:config.apiUrl+'/builder/getBuilderSubscribedUser?sessionId='+getcokkies.getsessionId(),
     /// method:"POST",
     /// headers: {
      //'Content-Type': 'application/x-www-form-urlencoded'
     // },
     // data:$.param({'builderId': parseInt(getcokkies.getBuilderId())})
       //data:"lenderId=1"
   // }).then(function successCallback(response) {
    //  console.log(response);
    //  var ss=JSON.stringify(JSON.parse(response.data.result)['#result-set-1']);
    //  console.log("ss",ss);
    $http({
      url:config.apiUrl+'/builder/getBuilderSubscribedUserList?sessionId='+getcokkies.getsessionId(),
      method:"POST",
      headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
      },
      data:$.param({'userId': parseInt(getcokkies.getUserId())})
    }).then(function successCallback(response) {  
      var lpiuserlist = JSON.parse(response.data.Result);
	  console.log("LpiuserList",lpiuserlist);
	  //$scope.data = JSON.parse(response.data.Result);
	  $scope.data = lpiuserlist.filter(function (a) {
			return a.LoanInitiated == '3';
		});
      $scope.loader = false;
	  
	   if($scope.data != null){
        for (var i = 0; i < $scope.data.length  ;  i++) {
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
	   
        }
      }
	  
	$(document).ready( function () {
    $('#prospectTable').DataTable();
	} );
	  /* Prernna Commented
	  $scope.loader = false;
      	  
	  if($scope.data != null){
        for (var i = 0; i < $scope.data.length  ;  i++) {
		//	alert("inside for loop; i= " + i + "$scope.data.length "+$scope.data.length );
          var userDataDTO=$scope.data[i].userDataDTO;
          var incomeList=$scope.data[i].userIncomeDTO;
          var loanList=$scope.data[i].userLoanDTO;
		  $scope.data[i].pendingLoan=0;
          $scope.data[i].emi=0;
		  $scope.data[i].totalIncomes=0; 
		  
          
		  for(var j=0; j < incomeList.length; j++){
            var income=incomeList[j].userNetIncome;
            totalIncomes =  parseInt(totalIncomes + income );
            $scope.data[i].totalIncomes=totalIncomes;    

          }

          var pendingLoan="0";
          var emi="0";
          for (var k = 0; k < loanList.length ; k++) {
            var userLoanOutstandingPrincipal =loanList[k].userLoanOutstandingPrincipal;
            var userLoanPaymentAmount =loanList[k].userLoanPaymentAmount;
            pendingLoan=parseInt(pendingLoan+userLoanOutstandingPrincipal);
            emi=parseInt(emi+userLoanPaymentAmount);
            $scope.data[i].pendingLoan=pendingLoan;
            $scope.data[i].emi=emi;                        

          }        
        }
      } ------------Prernna Comment Ended */
    }
	, function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
	  		            $scope.click = false;
                        $scope.loader = false;
                    	if (response.status == 401) {
							swal("Session Timeout", "Your session has timed out. Please login again.", "info");
							window.location.href = '#/login';
                        }
						if (response.status != 401) {
                            swal("Sorry", "Something went wrong. Please try after sometime.", "error");
							window.location.href = '#/login';
                        }
  });

//});
  }]);
})();
