'use strict';

/**
 * @ngdoc overview
 * @name salesManagementApp
 * @description
 * # salesManagementApp
 *
 * Main module of the application.
 */
angular
    .module('salesManagementApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngTouch',
        'nvd3',
        'dndLists',
        'ui.bootstrap'
    ])
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/login.html',
                controller: 'LoginController'
            })
            .when('/home', {
                templateUrl: 'views/home.html',
                controller: 'HomeController',
                resolve: {
                    valid: function($location, $q, APIService) {
                        var sessionId = APIService.getSessionId();
                        if (sessionId == null) {
                            //prevent direct home navigation thru state.
                            $location.path("/");
                            $q.reject();
                        }else{
                            return true;
                        }
                    },
                    pie: function(APIService) {
                        return APIService.salesTotalPerSalesMan();
                    },
                    bar: function(APIService) {
                        return APIService.salesTotalPerMonth();
                    },
                    top5order: function(APIService) {
                        return APIService.top5SalesOrder();
                    },
                    top5men: function(APIService) {
                        return APIService.top5SalesMan();
                    }
                }
            })
            .otherwise({
                redirectTo: '/'
            });
    });
