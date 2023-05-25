var Ps = Ps || {};

(function() {
    'use strict';

    angular.module('Contact')
        .controller('ContactController', ['$state', '$http', '$scope', '$rootScope', 'AuthService', 'config', '$timeout', 'getcokkies', '$location',
            function($state, $http, $scope, $rootScope, AuthService, config, $timeout, getcokkies, $location) { //currentUser
              
               
                $scope.sendMailToContact = function(contact) {
                    $http({
                    url: config.apiUrl + '/user/sendMailToContact',
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data: $.param({
                        'Fname': contact.firstName,
                        'email' : contact.email,
                        'subject' : contact.subject,
                        'msg': contact.message
                    })
                }).then(function successCallback(response) {
                	localStorage.setItem("mint", 600000);
                	$rootScope.SessionTime = 600000;
                }, function errorCallback(response) {});
                }

                }
            
        ]);
})();