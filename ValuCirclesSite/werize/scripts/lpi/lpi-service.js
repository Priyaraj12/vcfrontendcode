(function () {
  'use strict';

  angular.module('lpiService', [])
    .service('getLpiService', function ($http,getcokkies,config,api) {
        this.insertUserSubcription = function (data){
            return  $http.post(api.lpi.insertUserSubcription+getcokkies.getsessionId(),data);
        };

        this.getLpiPageListApi = function (){
           var data = $.param({ 'sessionId': parseInt(getcokkies.getsessionId()), 'userId': parseInt(getcokkies.getUserId()) });
           return $http.post(api.lpi.getLpiPageListApi+getcokkies.getsessionId(),data);
        };

        this.getUserLenderLpiScore = function (data){
            return $http.post(api.lpi.getUserLenderLpiScore+getcokkies.getsessionId(),data);
        };

        this.getSubcriptionKey = function (data){
            return $http.post(api.lpi.getSubcriptionKey+getcokkies.getsessionId(),data);
        };

        this.updateLoginUserLpiStatus = function (){
            var data = $.param({ 
            	'userId': parseInt(getcokkies.getUserId())
            });
            return $http.post(api.lpi.updateLoginUserLpiStatus+getcokkies.getsessionId(),data);
        };
        this.getlenderapplications = function (){
        	 var data = $.param({ 'userId': parseInt(getcokkies.getUserId()) });
            return $http.post(api.lpi.getlenderapplications+getcokkies.getsessionId(),data);
        };
        
        this.getlenderapplicationstatus = function (lenderdata){
       	// var data = $.param({ 'userId': parseInt(getcokkies.getUserId()) });
           return $http.post(api.lpi.getlenderapplicationstatus+getcokkies.getsessionId(),lenderdata);
       };
       
       this.getlenderapplicationdisbursements = function (lenderdata){
       	// var data = $.param({ 'userId': parseInt(getcokkies.getUserId()) });
           return $http.post(api.lpi.getlenderapplicationdisbursements+getcokkies.getsessionId(),lenderdata);
       };
       
       this.getlenderapplicationsanctions = function (lenderdata){
         	// var data = $.param({ 'userId': parseInt(getcokkies.getUserId()) });
             return $http.post(api.lpi.getlenderapplicationsanctions+getcokkies.getsessionId(),lenderdata);
         };
         
         this.insertlenderdetails = function (data){        	
               return $http.post(api.lpi.insertlenderdetails+getcokkies.getsessionId(),data);
           };
           
           this.getCoApplicantId = function (){
               var data =  $.param({'userId': parseInt(getcokkies.getUserId())});
               return  $http.post(api.lpi.getCoApplicantId+getcokkies.getsessionId(),data);
           };
           
           this.getCoApplicantDetailsUsingListOfUserId = function(postData){
               return $http.post(api.lpi.getCoApplicantDetailsUsingListOfUserId+getcokkies.getsessionId(),postData);
           };
           


    });
})();
