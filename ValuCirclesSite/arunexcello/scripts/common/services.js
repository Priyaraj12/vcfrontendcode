(function() {
    'use strict';

    angular.module('commonservices', [])
        .service('AuthService', function() {
            var userIsAuthenticated = false;

            this.setUserAuthenticated = function(value) {
                userIsAuthenticated = value;
            };

            this.getUserAuthenticated = function() {
                return userIsAuthenticated;
            };
        })
        .service('GetMonth', function() {

            this.getcurrentmonth = function() {
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
            this.getcurrentyear = function() {
                var d = new Date();
                return d.getFullYear();
            };

        })
        .service('getcokkies', function() {
            function getParam(name) {
                name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
                var regexS = "[\\?&]" + name + "=([^&#]*)";
                var regex = new RegExp(regexS);
                var results = regex.exec(window.location.href);
                if (results == null)
                    return "";
                else
                    return results[1];
            };

            this.getUserId = function() {
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
            };

            this.getsessionId = function() {
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
            };

            this.getEmailIdFromUrl = function() {
                var emailId = getParam("emailId");
                return emailId;
            }

            this.getSessionIdFromUrl = function() {
                var sessionId = getParam("sessionId");
                return sessionId;
            }

            this.getUserIdFromUrl = function() {
                var userId = getParam("userId");
                return userId;
            }
        })
        .service('calculateAge', function() {
            this.age = function(age) {
                var ageDifMs = Date.now() - new Date(age);
                var ageDate = new Date(ageDifMs); // miliseconds from epoch
                return Math.abs(ageDate.getUTCFullYear() - 1970);
            }
        })
        .service('dropDown', function($http, config) {
            this.updateFinancialDropdown = function(time) {
                function getSessionId() {
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

                function getUserId() {
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
                };
                $http({
                    url: config.apiUrl + '/user/updateIndustryAndEmployerFinancialData?sessionId=' + getSessionId(),
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data: $.param({
                        'userId': parseInt(getUserId())
                    })
                }).then(function successCallback(response) {
                	localStorage.setItem("mint", 30000);
                    if (response.data.TimeStamp != parseInt(localStorage.getItem('timestamp'))) {
                        $http({
                            url: config.apiUrl + '/user/getListOfAllGetMethodFinancialTest?sessionId=' + getSessionId(),
                            method: "POST",
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            },
                            data: $.param({
                                'userId': parseInt(getUserId())
                            })
                        }).then(function successCallback(response) {
                        	localStorage.setItem("mint", 30000);
                            localStorage.setItem('dropdown', JSON.stringify(response.data));
                            localStorage.setItem('timestamp', response.data.TimeStamp);
                        }, function errorCallback(response) {});
                    }
                }, function errorCallback(response) {});
            };
            this.getDropdownPersonal = function() {
                var personalData = {
                    "gender": JSON.parse(localStorage.getItem('gender')),
                    "maritals": JSON.parse(localStorage.getItem('maritals')),
                    "educationInstitutions": JSON.parse(localStorage.getItem('educationInstitutions')),
                    "Residences": JSON.parse(localStorage.getItem('Residences')),
                    "educationDetails": JSON.parse(localStorage.getItem('educationDetails')),
                    "educations": JSON.parse(localStorage.getItem('educations')),
                    "userInfo": JSON.parse(localStorage.getItem("UserInfo"))
                }
                return personalData;
            };
        })
        .service('dirty', function() {
            this.set = function() {
                $('input.ng-dirty').addClass('error');
                $('select.ng-dirty').addClass('error');
                $('[type=radio].ng-dirty').addClass('radio_error');
                return true;
            }
            this.remove = function() {
                $('input.ng-dirty').removeClass('error');
                $('select.ng-dirty').removeClass('error');
                $('[type=radio].ng-dirty').removeClass('radio_error');
                return true;
            }
        })
        .service('regex', function() {
            this.convertNumberToWords = function(amount) {
                if (amount) {
                    var words = new Array();
                    words[0] = '';
                    words[1] = 'One';
                    words[2] = 'Two';
                    words[3] = 'Three';
                    words[4] = 'Four';
                    words[5] = 'Five';
                    words[6] = 'Six';
                    words[7] = 'Seven';
                    words[8] = 'Eight';
                    words[9] = 'Nine';
                    words[10] = 'Ten';
                    words[11] = 'Eleven';
                    words[12] = 'Twelve';
                    words[13] = 'Thirteen';
                    words[14] = 'Fourteen';
                    words[15] = 'Fifteen';
                    words[16] = 'Sixteen';
                    words[17] = 'Seventeen';
                    words[18] = 'Eighteen';
                    words[19] = 'Nineteen';
                    words[20] = 'Twenty';
                    words[30] = 'Thirty';
                    words[40] = 'Forty';
                    words[50] = 'Fifty';
                    words[60] = 'Sixty';
                    words[70] = 'Seventy';
                    words[80] = 'Eighty';
                    words[90] = 'Ninety';
                    amount = amount.toString();
                    var atemp = amount.split(".");
                    var number = atemp[0].split(",").join("");
                    var n_length = number.length;
                    var words_string = "";
                    if (n_length <= 9) {
                        var n_array = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
                        var received_n_array = new Array();
                        for (var i = 0; i < n_length; i++) {
                            received_n_array[i] = number.substr(i, 1);
                        }
                        for (var i = 9 - n_length, j = 0; i < 9; i++, j++) {
                            n_array[i] = received_n_array[j];
                        }
                        for (var i = 0, j = 1; i < 9; i++, j++) {
                            if (i == 0 || i == 2 || i == 4 || i == 7) {
                                if (n_array[i] == 1) {
                                    n_array[j] = 10 + parseInt(n_array[j]);
                                    n_array[i] = 0;
                                }
                            }
                        }
                        var value = "";
                        for (var i = 0; i < 9; i++) {
                            if (i == 0 || i == 2 || i == 4 || i == 7) {
                                value = n_array[i] * 10;
                            } else {
                                value = n_array[i];
                            }
                            if (value != 0) {
                                words_string += words[value] + " ";
                            }
                            if ((i == 1 && value != 0) || (i == 0 && value != 0 && n_array[i + 1] == 0)) {
                                words_string += "Crores ";
                            }
                            if ((i == 3 && value != 0) || (i == 2 && value != 0 && n_array[i + 1] == 0)) {
                                words_string += "Lakhs ";
                            }
                            if ((i == 5 && value != 0) || (i == 4 && value != 0 && n_array[i + 1] == 0)) {
                                words_string += "Thousand ";
                            }
                            if (i == 6 && value != 0 && (n_array[i + 1] != 0 && n_array[i + 2] != 0)) {
                                words_string += "Hundred and ";
                            } else if (i == 6 && value != 0) {
                                words_string += "Hundred ";
                            }
                        }
                        words_string = words_string.split("  ").join(" ");
                    }
                    return words_string;

                }else{
                    return "";
                }
            };
            this.removeText = function(val) {
                return val.replace(/[^0-9\.]+/g, "");
            };
            this.numericOnly = function(event, val) {
                if (val) {
                    if (event.which >= 37 && event.which <= 40) {
                        event.preventDefault();
                    }
                    var $this = $(this);
                    var num = val.replace(/,/gi, "").split("").reverse().join("");
                    var num2 = RemoveRougeChar(num.replace(/[^0-9]+/g, '').replace(/(.{3})/g, "$1,").split("").reverse().join(""));
                    return num2;
                } else {
                    return ""
                }
            };
        });

})();