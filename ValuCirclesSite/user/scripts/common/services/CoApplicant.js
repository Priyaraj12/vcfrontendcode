
(function () {
  'use strict';

  angular.module('coApplicantService', [])
    .service('getCoApplicantService', function ($http,getcokkies,config,api) {
        this.insertMultipleUserCoApplicantwithLogin = function (data){
            return  $http.post(api.coApplicant.insertMultipleUserCoApplicantwithLogin+getcokkies.getsessionId(),data);
        };

        this.getCoApplicantId = function (){
            var data =  $.param({'userId': parseInt(getcokkies.getUserId())});
            return  $http.post(api.coApplicant.getCoApplicantId+getcokkies.getsessionId(),data);
        };
        
        this.getCoApplicantDetailsUsingListOfUserId = function(postData){
            return $http.post(api.coApplicant.getCoApplicantDetailsUsingListOfUserId+getcokkies.getsessionId(),postData);
        };
        
        this.getZipInfo = function(data){
            return $http.post(api.coApplicant.getZipInfo+getcokkies.getsessionId(),data);
        };
        
        this.fetchPrimaryaddress = function (data){
        	return $http.post(api.personal.fetchPrimaryaddress+getcokkies.getsessionId(),data);
        }

        this.getEducationDetailByEducationId = function(postData){
            var data = $.param({
                            'sessionId': parseInt(getcokkies.getsessionId()),
                            'educationId': postData.id
                        })
            return $http.post(api.coApplicant.getEducationDetailByEducationId+getcokkies.getsessionId(),data);
        };

        this.getEducationInstitutionByEducationDetailId = function(postData){
            var data = $.param({
                            'sessionId': parseInt(getcokkies.getsessionId()),
                            'educationDetailId': postData.id
                        });
            return $http.post(api.coApplicant.getEducationInstitutionByEducationDetailId+getcokkies.getsessionId(),data);
        };
        this.fetchPrimaryaddress = function (data){
        	return $http.post(api.coApplicant.fetchPrimaryaddress+getcokkies.getsessionId(),data);
        }
    });
})();
