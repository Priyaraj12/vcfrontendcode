(function () {
  'use strict';

  angular.module('sponsorService', [])
    .service('getSponsorService', function ($http,getcokkies,config,api) {
        this.getSubscriptionSponsor = function (data){          
            return  $http.post(api.sponsor.getSubscriptionSponsor,data);
        };

        this.selectedSubscription = function (data){
           return $http.post(api.sponsor.selectedSubscription,data);
        };
    });
})();
