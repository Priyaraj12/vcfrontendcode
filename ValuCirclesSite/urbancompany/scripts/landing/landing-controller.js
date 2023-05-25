// eslint-disable-next-line
var Ps = Ps || {};

(function() {
    'use strict';

    angular.module('landing')
        .controller('landingController', ['$state', '$http', '$scope', '$rootScope',
            function($state, $http, $scope, $rootScope) { //currentUser
                $scope.hi='hi';
            }
        ]);
})();