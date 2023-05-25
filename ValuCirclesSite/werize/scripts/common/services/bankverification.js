(function () {
  'use strict';

  angular.module('bankverificationService', [])
    .service('getbankverificationservice', function ($http,getcokkies,config,api) {
        this.getPerfiosUserBankAccountsAndTransaction = function (){
            var data = $.param({'sessionId': parseInt(getcokkies.getsessionId()),'userId': parseInt(getcokkies.getUserId())});
            return  $http.post(api.bankverfication.getPerfiosUserBankAccountsAndTransaction+getcokkies.getsessionId(),data);
            
        };

        this.getListOfPerfiosUserBankAccount = function (){
            var data = $.param({'sessionId': parseInt(getcokkies.getsessionId()),'userId': parseInt(getcokkies.getUserId())});
            return $http.post(api.bankverfication.getListOfPerfiosUserBankAccount+getcokkies.getsessionId(),data);
        };

        this.getTransactionToVerifyIncomeAndLoan = function (){
            var data= $.param({'sessionId': parseInt(getcokkies.getsessionId()),'userId': parseInt(getcokkies.getUserId())});
            return $http.post(api.bankverfication.getTransactionToVerifyIncomeAndLoan+getcokkies.getsessionId(),data);
        };


        this.getVerifyUserIncomeAndLoan = function (){

            var data= $.param({'sessionId': parseInt(getcokkies.getsessionId()),'userId': parseInt(getcokkies.getUserId())});
            return $http.post(api.bankverfication.getVerifyUserIncomeAndLoan+getcokkies.getsessionId(),data);
           
        };
        
        this.insertIncomeAndLoanByUserSelected = function (){
            var data =$.param({'listOfId': JSON.stringify($scope.checkList),'userId': parseInt(getcokkies.getUserId())});
            return $http.post(api.bankverfication.insertIncomeAndLoanByUserSelected+getcokkies.getsessionId(),data);
           
        };
         this.deletePerfiosBankAccount = function (data){
            
            return $http.post(api.bankverfication.deletePerfiosBankAccount+getcokkies.getsessionId(),data);
           
        };

        // this.getListOfPerfiosUserBankAccount = function (data){
        //     var data= $.param({'sessionId': parseInt(getcokkies.getsessionId()),'userId': parseInt(getcokkies.getUserId())});
        //     return $http.post(api.bankverfication.getListOfPerfiosUserBankAccount,data);
        // };
              


    })
    
})();