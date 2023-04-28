(function () {
  'use strict';

  angular.module('assetService', [])
    .service('getassetservice', function ($http,getcokkies,config,api) {
        this.getZipInfo = function (data){           
            return  $http.post(api.asset.getZipInfo+getcokkies.getsessionId(),data);
            
        };

        this.getAssetProductType = function (){
            var data= $.param({'userId': parseInt(getcokkies.getUserId())});
            return $http.post(api.asset.getAssetProductType+getcokkies.getsessionId(),data);
        };

        
        this.getAssetType = function (){
            var data= $.param({'userId': parseInt(getcokkies.getUserId())});
            return $http.post(api.asset.getAssetType+getcokkies.getsessionId(),data);
           
        };

         this.getBuilderProjectListForZipCode = function (data){         
            return $http.post(api.asset.getBuilderProjectListForZipCode+getcokkies.getsessionId(),data);
           
        };

        this.getProjectName = function (data){ 
        	//var data= $.param({'builderId': getbuilderId()});
        	//console*.log(data);
            return $http.post(api.asset.getProjectName+getcokkies.getsessionId(),data);
           
        };

         this.loanTerm = function (){
            var data = $.param({'userId': parseInt(getcokkies.getUserId())});
            return $http.post(api.asset.loanTerm+getcokkies.getsessionId(),data);
        };

         this.getListOfBuilderProjectAndZipCode = function (){
          var data = $.param({'userId': parseInt(getcokkies.getUserId())});
            return $http.post(api.asset.getListOfBuilderProjectAndZipCode+getcokkies.getsessionId(),data);
           
        };

         this.insertUserAsset = function (data){
           
            return $http.post(api.asset.insertUserAsset+getcokkies.getsessionId(),data);
           
        };
       

         this.insertUserFinancial = function (data){
             var data = $.param({'userId': parseInt(getcokkies.getUserId())});
             return $http.post(api.asset.insertUserFinancial+getcokkies.getsessionId(),data);
           
        };

          // get list of cities in asset module 
        
        this.getListOfCities = function (data){
            //var data = $.param(data);
            return $http.post(api.asset.getListOfCities+getcokkies.getsessionId(),data);
          
       };
       
       // get city based builder name
       
       this.getListOfCitiesBasedBuilderName = function (data){
           //var data = $.param(data);
           return $http.post(api.asset.getListOfCitiesBasedBuilderName+getcokkies.getsessionId(),data);
         
      };
      
      
      
      this.getPages = function (){
    	  var data = $.param({'userId': parseInt(getcokkies.getUserId())});
          return $http.post(api.asset.getPages+getcokkies.getsessionId(),data);
         
      };



      this.getRefloantimeframe = function (){
          return $http.post(api.asset.getRefloantimeframe+getcokkies.getsessionId(),"");
         
      };
      

   });
})();