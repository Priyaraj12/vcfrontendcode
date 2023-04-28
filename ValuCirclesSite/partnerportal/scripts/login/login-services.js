
(function () {
  'use strict';

  angular.module('loginservices', [])
    .service('AuthService', function () {
        var userIsAuthenticated = false;

        this.setUserAuthenticated = function(value){
        userIsAuthenticated = value;
        };

        this.getUserAuthenticated = function(){
        return userIsAuthenticated;
        };
    })

    .service('SetCokkies',function(){

        this.getCookies= function() {
        	var name = "sessionId=";
        	var ca = document.cookie.split(';');
        	for (var i = 0; i < ca.length; i++) {
        		var c = ca[i];
        		while (c.charAt(0) == ' ') {
        			c = c.substring(1);
        		}
        		if (c.indexOf(name) == 0) {
        			return c.substring(name.length, c.length);
        		}
        	}
        	return "";
        	// return document.cookie.toString();
        }
        /**
         * Ajax funtion to generate cookies at document load
         */
        this.generateCookies = function () {
        	var cksId = this.getCookies();
        	if (cksId.length == 0) {
        		this.setCookies();
        	}
        	return this.getCookies();
        }

        this.setCookies = function () {
        	var d = new Date();
        	var now = new Date();
        	now.setMonth(now.getMonth() + 1);
        	document.cookie = "sessionId=" + d.getTime() + ";" + "expires="
        			+ now.toUTCString() + ";";
        	// var d = new Date();
        	// document.cookie = d.getTime();
        }
    });
})();
