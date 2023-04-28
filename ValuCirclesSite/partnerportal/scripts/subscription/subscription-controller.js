var Ps = Ps || {};

(function() {
'use strict';

  angular.module('subscription')
  .controller('subscriptionController', ['$state', '$http', '$scope', 'getcokkies','config',
  function($state, $http, $scope, getcokkies, config) {
      $scope.addbuysubscription = {};
      $scope.addAssingnSubscription={};
      $scope.removedot = function(val){
        $scope.addbuysubscription.howmanysubscription = val.split('.').join("");
      }


    var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!

var yyyy = today.getFullYear();
if(dd<10){
    dd='0'+dd;
} 
if(mm<10){
    mm='0'+mm;
} 
var today = dd+'/'+mm+'/'+yyyy;
console.log(today);
$scope.currentDate = today;
      $scope.loader = true;
      $scope.config = {
        itemsPerPage: 5,
        fillLastPage: true
      }
      $scope.currentPage = 0;
      $scope.pageSize = 5;
      $scope.data = []; 
//      $scope.subCountDetails = [];  	  
      $scope.numberOfPages=function(){
        return Math.ceil($scope.data.length/$scope.pageSize);  
      }
	  init_function();
	  
	  
	  function init_function() {  // get subscription count & subscriptions
		      //get all values
//  console.log("entering One"); 
		$http({
      url:config.apiUrl+'/user/getSubscriptionCountAndListOfAssignSubscription?sessionId='+getcokkies.getsessionId(),
      method: "POST",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data:$.param({'subscriptorId': parseInt(getcokkies.getUserId())})
      }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
    $scope.subCountDetails=JSON.parse(response.data.result1);
		$scope.subCountDetails = $scope.subCountDetails["#result-set-1"];
    $scope.data=JSON.parse(response.data.result2);
		$scope.data = $scope.data["#result-set-1"];
		// console.log("entering Two"); 
		// console.log($scope.subCountDetails);
		// console.log($scope.data);
		// for (var i=0; i< $scope.subCountDetails.length; i++)
		//	console.log($scope.subCountDetails[i].cost);
     }, function errorCallback(response) {
      // called asynchronously if an error occurs
      }); 
	  }
      
	  function dummyCalls() {
	  //get subscription type
	  //		console.log("entering Three"); 
      $http({
        url: config.apiUrl + '/user/getAllSubscriptionType?sessionId=' + getcokkies.getsessionId(),
        method: "POST",
        headers: {
           'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: $.param({
          'userId': parseInt(getcokkies.getUserId())   
        })

      }).then(function successCallback(response) {
        
       $scope.subscriptiontypes = (JSON.parse(response.data.Result));    
         // console.log("txt",$scope.subscriptiontypes);

      }, function errorCallback(response) {
         // called asynchronously if an error occurs
         // or server returns response with an error status.
      });
	  }
	  
	  /*
	  $scope.sub_init() = function() { alert ("kk");
		}
*/

      //save buy subscription 
      $scope.savebuysubscription = function(buy,typeId,rate) {
		  		console.log("entering savebuysubscription11"); 
        if(!buy){
          $scope.error = true;
          $scope.success=false;
          $scope.error_message = "kindly enter the values";
          $('#buysubscription').addClass('redcolorinput');
        } else if(parseInt(buy) <= 0){
          $scope.error = true;
          $scope.success=false;
          $scope.error_message = "Subscription Value can not be negative or zero";
          $('#buysubscription').addClass('redcolorinput');
        } else if(parseInt(buy) < 50){
          $scope.error = true;
          $scope.success=false;
          $scope.error_message = "value should be greater than 50";
          $('#buysubscription').addClass('redcolorinput');
        } else if(!parseInt(typeId)){
          $scope.error = true;
          $scope.success=false;
          $scope.error_message = "Select your subscription type";
          $('#subTypeId').addClass('redcolorinput');
        } else{
          $('#buysubscription').removeClass('redcolorinput');
          $('#subTypeId').removeClass('redcolorinput');
          $http({
          url: config.apiUrl+'/user/callSubscription?sessionId='+getcokkies.getsessionId(),
          method: "POST",
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data:"subscriptionId="+parseInt(getcokkies.getUserId())+"&count="+parseInt(buy)+"&subTypeId="+parseInt(typeId)+"&subKey="
          }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            // console.log("save", response);

            init_function();

            $('#buysubscription').removeClass('redcolorinput');
            $("#hidebuysubscrpt").hide();
            $scope.success = true;
            $scope.success_message = "Your changes have been succesfully recorded.";
            $scope.error=false;
            $('#buysubscription')[0].value=0;
            console.log ($('#buysubscription')[0].value);
            // get subscription responce From Server
            /*$scope.userInfo = JSON.parse(localStorage.getItem("UserInfo"));*/
          }, function errorCallback(response) {
          // called asynchronously if an error occurs

          })
        }

      }

      $scope.skipValues = function(value, index, array) { 

       if(($scope.subCountSpecial == "" || $scope.subCountSpecial == 0) && $scope.subscriptiontypes.indexOf(value) == 1) {
           return $scope.subscriptiontypes.indexOf(value) == 0;   
       } else if(($scope.subCount == "" ||  $scope.subCount == 0) && $scope.subscriptiontypes.indexOf(value) == 0) {
          return $scope.subscriptiontypes.indexOf(value) == 1; 
       } else {
         return $scope.subscriptiontypes;
       }
      };

      //  $scope.skip_array = ['Special'];
      //save Assingn Subsciption 
      $scope.saveAssingnSubsciption = function(assignsubscrp,subTypeId) {                
        // console.log(assignsubscrp);
        // $scope.at = $scope.emailId.indexOf("@");
        // $scope. dot = $scope.emailId.lastIndexOf(".");
		console.log("entering saveAssingnSubsciptionff");
        if(assignsubscrp == "" || assignsubscrp== undefined){
          $scope.error = true;
          $scope.error_message = "Invalid email Address. Example : sample@gmail.com" 
          $('#getemailid').addClass('redcolorinput');                 
          $scope.success=false;
        }
        else{
          $http({
          url: config.apiUrl+'/user/assignSubscription?sessionId='+getcokkies.getsessionId(),
          method: "POST",
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data:"subscriptorId="+parseInt(getcokkies.getUserId())+"&emailId="+assignsubscrp+"&mysubtype="+subTypeId
          }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            if(response.data.Result == "Fail") {
              $('#getemailid').removeClass('redcolorinput');                           
              $scope.success = true;
              $scope.success_message = "The user already has an assigned subscription – please enter another user";
              $scope.addAssingnSubscription="";
              $scope.error=false;
            }
            $scope.subscription =JSON.parse(response.data.result);
            if(($scope.subCountSpecial == 0 || $scope.subCountSpecial =="") &&  subTypeId == 5){
              $scope.error = true;
              $scope.error_message = "Special Subscription was not available" 
              $('#getemailid').addClass('redcolorinput');                 
              $scope.success=false;            
            } else if(($scope.subCount == 0 || $scope.subCount == "") && subTypeId == 4) {
              $scope.error = true;
              $scope.error_message = "General Subscription was not available" 
              $('#getemailid').addClass('redcolorinput');                 
              $scope.success=false;    
            } else {
              init_function();
            $('#getemailid').removeClass('redcolorinput');   
            $('#getemailid')[0].value="";                        
            $scope.success = true;
            $scope.success_message = "Your changes have been succesfully recorded.";
            $scope.addAssingnSubscription="";
            $scope.error=false;
          }
          }, function errorCallback(response) {
          // called asynchronously if an error occurs
          })
        }
      }

	  
	  function dummyTwo()  {
      //get subscription rates
	  		console.log("entering Four"); 
      $http({
        url:config.apiUrl+'/user/getSubRates?sessionId=' + getcokkies.getsessionId(),
        method:"POST",
        headers:{
          'Content-Type':'application/x-www-from-urlencoded'
        },
        data: $.param({
          'userId':parseInt(getcokkies.getUserId())
        })
      }).then(function successCallback(response){
        $scope.subRates = (JSON.parse(response.data.SubRates)['#result-set-1']);
      },function errorCallback(response){
        console.log(response)
      });
	 }
      $scope.subselectType = function(typeId) {
        var rates = $scope.subCountDetails;
        for (var i = 0; i <= rates.length; i++) {
          if(rates[i].subscriptionTypeId == typeId) {
            $scope.subRateforType = rates[i].cost;
			    //  $scope.used = rates[i].used;
			     //  $scope.ct = rates[i].ct;
			  //   $scope.adj = rates[i].adj;
          }
        }
      }
  }]);
})();