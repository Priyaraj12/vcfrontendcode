
(function () {
  'use strict';

  angular.module('personalService', [])
    .service('getPersonalService', function ($http,getcokkies,config,api) {
        this.getSummaryDetails = function (){
            var data =  $.param({'userId': parseInt(getcokkies.getUserId())});
            return  $http.post(api.personal.getSummaryDetails+getcokkies.getsessionId(),data);
        };

        this.getZipInfo = function (data){
           return $http.post(api.personal.getZipInfo+getcokkies.getsessionId(),data);
        };

        this.getEducationInstitution = function (data){
            return $http.post(api.personal.getEducationInstitution+getcokkies.getsessionId(),data);
        };

        this.getEducationDetail = function (data){
            return $http.post(api.personal.getEducationDetail+getcokkies.getsessionId(),data);
        };

        this.savePersonal = function (data){
            return $http.post(api.personal.savePersonal+getcokkies.getsessionId(),data);
        };
       

    })
    .service('getPersonalData',function($http,config) {
        this.personalData = function(){
        	var userInfo = localStorage.getItem("UserInfo");
         return JSON.parse(userInfo);
        };
    });
})();
