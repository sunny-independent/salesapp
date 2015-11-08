'use strict';

/**
 * @ngdoc function
 * @name salesManagementApp.service:APIService
 * @description
 * # APIService
 * Controller of the salesManagementApp
 */
angular.module('salesManagementApp')
    .service('APIService', function($http, $q) {
        var sessionId = null;
        var uname = null;
        var baseURL = "http://localhost:8080/"
        this.login = function(username, password) {
            //username = "Angeline";
            //password = "Angeline";
            var defered = $q.defer();
            var promise = $http.get(baseURL + "login?username=" + username + "&password=" + password);
            promise.then(function(response) {
                var data = response.data;
                if (data.loginSucceeded) {
                    sessionId = data.sessionId;
                    uname = username;
                    defered.resolve();
                } else {
                    defered.reject();
                }

            }, function() {
                defered.reject();
            });
            return defered.promise;
        }

        this.getSessionId = function(){
            return sessionId;
        }

        this.getUserName = function() {
            return uname;
        }

        this.logout = function() {
            sessionId = null;
            uname = null;
            return $http.get(baseURL + "logout?sessionid=" + sessionId);
        }

        this.salesTotalPerSalesMan = function() {
            return $http.get(baseURL + "salesmandata?sessionid=" + sessionId);
        }
        this.salesTotalPerMonth = function() {
            return $http.get(baseURL + "lastyeardata?sessionid=" + sessionId);
        }
        this.top5SalesOrder = function() {
            return $http.get(baseURL + "topsalesorders?sessionid=" + sessionId);
        }
        this.top5SalesMan = function() {
            return $http.get(baseURL + "topsalesmen?sessionid=" + sessionId);
        }

    });
