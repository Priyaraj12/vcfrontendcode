// eslint-disable-next-line
var Ps = Ps || {};


  angular.module('common',[])
    .controller('MainController', ['$state','$http','$scope','$rootScope','getcokkies',
      function ($state,$http,$scope,$rootScope,getcokkies) { //currentUser
         $scope.builderNAME = getcokkies.getBuilderName();
       $scope.currentUser=$rootScope.currentUser
        $scope.Logout = function(){
       		document.cookie = "userId=0";
          document.cookie = "builderId=0";
           document.cookie = "builderName=";
       		 window.location.href='#/login';
       }
       $scope.home = function () {
       	// body...
       	window.location.href = '#/Landing';
       }
}]);
