
(function () {
  'use strict';

  angular.module('commonservices', [])
    .service('AuthService', function () {
        var userIsAuthenticated = false;

        this.setUserAuthenticated = function(value){
        userIsAuthenticated = value;
        };

        this.getUserAuthenticated = function(){
        return userIsAuthenticated;
        };
    })

    .service('GetMonth',function(){

        this.getcurrentmonth = function(){
            var d = new Date();
            var month = new Array();
            month[0] = "January";
            month[1] = "February";
            month[2] = "March";
            month[3] = "April";
            month[4] = "May";
            month[5] = "June";
            month[6] = "July";
            month[7] = "August";
            month[8] = "September";
            month[9] = "October";
            month[10] = "November";
            month[11] = "December";
            return month[d.getMonth()];
        };
         this.getcurrentyear = function(){
            var d = new Date();
            return d.getFullYear();
        };

    })

    .service('getcokkies',function(){
        this.getUserId = function(){
            var name = "userId=";
            var sam = document.cookie;
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
            return "0";
        }

        this.getBuilderId = function(){
            var name = "builderId=";
            var sam = document.cookie;
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
            return "0";
        }
        this.getBuilderProjectId = function(){
            var name = "builderProjectId=";
            var sam = document.cookie;
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
            return "0";
        }


        this.getsessionId = function(){
            var name = "sessionId=";
            var sam = document.cookie;
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
            return "0";
        }   

        this.getBuilderName = function(){
            var name = "builderName=";
            var sam = document.cookie;
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
            return "0";
        }     


                /**
         * function to get url parameter values
         * 
         * @param name
         * @returns
         */
        function getParam(name) {
            name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
            var regexS = "[\\?&]" + name + "=([^&#]*)";
            var regex = new RegExp(regexS);
            var results = regex.exec(window.location.href);
            if (results == null)
                return "";
            else
                return results[1];
        }

             
        /**
         * function to get length id from url
         * 
         * @returns
         */
        this.getBuilderProjectIdFromUrl=function() {
            var lengthId = getParam("builderProjectId");
            return lengthId;
        }

        this.getBuilderUserIdFromUrl=function() {
            var builderId = getParam("builderUserId");
            return builderId;
        }

        /**
         * function to get email id from url
         * 
         * @returns
         */
        this.getEmailIdFromUrl=function() {
            var emailId = getParam("emailId");
            return emailId;
        }
         /**
         * function to get session id from url
         * 
         * @returns
         */
        this.getSessionIdFromUrl=function() {
            var sessionId = getParam("sessionId");
            return sessionId;
        }
         /**
         * function to get userId  from url
         * 
         * @returns
         */
        this.getUserIdFromUrl=function() {
            var userId = getParam("userId");
            return userId;
        }
/**
*
*/
        this.getLenderLpiFromUrl=function() {
        var lengthId = getParam("lenderLpi");
        return lengthId;
        }
    });

})();
