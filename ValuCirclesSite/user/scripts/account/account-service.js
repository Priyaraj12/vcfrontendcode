(function () {
'use strict';

angular.module('accountService', [])
.service('getAccountService', function ($http,getcokkies,config,api) {
    this.changePassword = function (data){
        return  $http.post(api.account.changePassword+getcokkies.getsessionId(),data);
    };

    this.signUp = function (data){
        return $http.post(api.account.signUp,data);
    };

    this.otpVerify = function (data){
        return $http.post(api.account.otpVerify,data);
    };

    this.resendOtp = function (data){
        return $http.post(api.account.resendOtp,data);
    };

    this.updateLoginUserLpiStatus = function (){
        var data = $.param({ 'userId': parseInt(getcokkies.getUserId()) });
        return $http.post(api.lpi.updateLoginUserLpiStatus+getcokkies.getsessionId(),data);
    };
});
})();
