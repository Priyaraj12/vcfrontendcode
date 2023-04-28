
(function () {
  'use strict';

  angular.module('financialService', [])
    .service('financialService', function ($http,getcokkies,config,api) {
        this.getListOfRefEmploymentType = function (){
        	
            var data =  $.param({'userId': parseInt(getcokkies.getUserId())});
            return  $http.post(api.financial.getListOfRefEmploymentType+getcokkies.getsessionId(),data);
        };
        
        
        this.getCoApplicantId = function (){
            var data =  $.param({'userId': parseInt(getcokkies.getUserId())});
            return  $http.post(api.financial.getCoApplicantId+getcokkies.getsessionId(),data);
        };
        
        this.getCoApplicantDetailsUsingListOfUserId = function(postData){
            return $http.post(api.financial.getCoApplicantDetailsUsingListOfUserId+getcokkies.getsessionId(),postData);
        };
        
        this.insertFinancialData = function(postData){
            var data = $.param(
            {
                'userId' : parseInt(getcokkies.getUserId()),
                'financialDetails' : postData.financialDetails,
                'loanDetails' : postData.loanDetails,
                'incomeDetails' : postData.incomeDetails,
                'salaryDeduction' : postData.salaryDeduction
            }
            );
            return $http.post(api.financial.insertFinancialData+getcokkies.getsessionId(),data);
        };
        this.insertUserFinancial = function(){
            var data = $.param(
                {
                    'userId': parseInt(getcokkies.getUserId())
                }
            );
            return $http.post(api.financial.insertUserFinancial+getcokkies.getsessionId(),data);
        };
        this.insertUserDetailsForCreditScore = function(userInfo,questionData,userAns,userId){
            // var mysUserId = parseInt(getcokkies.getUserId());
            
            var data = $.param(
                {
                    'userInfo': JSON.stringify(userInfo),
                    'questionData':  questionData,
                    'userAns' : userAns,
                    'mysUserId' : userId
                });
            return $http.post(api.financial.insertUserDetailsForCreditScore+getcokkies.getsessionId(),data);
        };
       /* this.getcreditproofDetails = function(){
        	return $http.post(api.financial.getcreditproofDetails+getcokkies.getsessionId(),data);
        }*/
        this.getCreditReport = function(userInfo){
            var data = $.param(userInfo);
            return $http.post(api.financial.getCreditReport+getcokkies.getsessionId(),data);
        };
        this.getCreditScoreValue = function(e){
//        	if(e.includes("userId")){
        	if(e != undefined){
        		var coid = e.split("=");
        		 var data = $.param(
        	                {
        	                    'userId': parseInt(coid[1])
        	                }
        	            );
        	}else{
           var data = $.param(
                {
                    'userId': parseInt(getcokkies.getUserId())
                }
            );
        }
            return $http.post(api.financial.getUserDetailsForCreditScore+getcokkies.getsessionId(),data);
        };
        this.getListOfEmployer = function() {
            var data = $.param(
                {
                    'userId': parseInt(getcokkies.getUserId())
                }
            );
            return $http.post(api.financial.getListOfEmployer+getcokkies.getsessionId(),data);
        };
        
  	  this.getcompanylistusingprobe = function(val){
  	  	var data = $.param({
  	  		 'val' : val
  	  	});
  	      return $http.post(api.financial.getcompanylistusingprobe+getcokkies.getsessionId(),data);
  	  };
  	  
  	  this.getcompanylistusingcin = function(cin){
  	  	var data = $.param({
  	  		 'cin' : cin
  	  	});
  	      return $http.post(api.financial.getcompanylistusingcin+getcokkies.getsessionId(),data);
  	  };
  	  
  	 this.getListOfOccupationCategory = function (data){
     	
         //var data =  $.param({'userId': parseInt(getcokkies.getUserId())});
         return  $http.post(api.financial.getListOfOccupationCategory+getcokkies.getsessionId(),data);
     };

    });
  

  
  
})();
