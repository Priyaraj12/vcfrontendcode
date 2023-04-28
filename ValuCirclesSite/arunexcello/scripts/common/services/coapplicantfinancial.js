
(function () {
  'use strict';
  angular.module('coApplicantFinancialService', [])
    .service('getCoApplicantFinancialService', function ($http,getcokkies,config,api) {
        this.getCoApplicantId = function (){            
            var data =  $.param({'userId': parseInt(getcokkies.getUserId())});           
            return  $http.post(api.coApplicantFinancial.getCoApplicantId+getcokkies.getsessionId(),data);
        };
        
        this.insertMultipleUserCoApplicantFinancials = function(data) {
            return $http.post(api.coApplicantFinancial.insertMultipleUserCoApplicantFinancials+getcokkies.getsessionId(),data);
        };
        
        this.getCoApplicantDetailsUsingListOfUserId = function(postData){
            return $http.post(api.coApplicantFinancial.getCoApplicantDetailsUsingListOfUserId+getcokkies.getsessionId(),postData);
        };

        this.getCoApplicantEmploymentAndIncomeLoan = function(data) {       
            return $http.post(api.coApplicantFinancial.getCoApplicantEmploymentAndIncomeLoan+getcokkies.getsessionId(),data);
        };

        this.insertUserCoApplicantFinancial = function() {                                  
            var data =  $.param({'userId': parseInt(getcokkies.getUserId())});
            return $http.post(api.coApplicantFinancial.insertUserCoApplicantFinancial+getcokkies.getsessionId(),data);
        }

        this.getListOfAllGetMethodFinancial = function() {                                             
            var data = $.param({
                'sessionId': parseInt(getcokkies.getsessionId()),
                'userId': parseInt(getcokkies.getUserId())
                });
            return $http.post(api.coApplicantFinancial.getListOfAllGetMethodFinancial+getcokkies.getsessionId(),data);             
        }
        this.getCreditScoreValue = function(id){
           var data = $.param(
                {
                    'userId': id
                }
            );
            return $http.post(api.financial.getUserDetailsForCreditScore+getcokkies.getsessionId(),data);
        };
        
        this.getListOfOccupationCategory = function (data){
         	
            //var data =  $.param({'userId': parseInt(getcokkies.getUserId())});
            return  $http.post(api.financial.getListOfOccupationCategory+getcokkies.getsessionId(),data);
        };
    });
})();
