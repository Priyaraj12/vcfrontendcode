//new
angular.module('vcircle', [
  'ui.router',
  'Authentication',            
  'common',                    
  'commonservices',
  'buillderInfo',
  'addBuilderProject',
  'changePassword',
  'subscription',
  'register',
  'landing',
  'reset',
  'partnerUserList',
  'loansWIP',
  'loansSanctioned',
  'userDetails'
])
  .config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/Landing');
    $stateProvider
        .state('index', {
          abstract: true,
          url: '/index',
          templateUrl: 'scripts/common/content.html',
          controller: 'MainController',
          data: { pageTitle: 'MainController'},
          authenticate: false 
        });
  
  }).filter('startFrom',function(){
     return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
}).run(['$rootScope', '$state','getcokkies',   function($rootScope, $state, getcokkies) {
  /*
   if(parseInt(getcokkies.getUserId()) == 0){
    window.location.href='#/login';
  }
  else{
    window.location.href='#/reset';
  }*/
}]).constant('config', {  

  //apiUrl: 'http://3.111.159.93/StagingService',
  apiUrl: 'http://localhost:8081/StagingService',
 // apiUrl: 'http://13.235.118.32/StagingService',
 // 		apiUrl: 'https://valucircles.com/StagingService',
  baseUrl: '/',
  enableDebug: true
});
