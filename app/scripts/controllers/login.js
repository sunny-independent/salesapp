'use strict';

/**
 * @ngdoc function
 * @name salesManagementApp.controller:LoginController
 * @description
 * # LoginController
 * Controller of the salesManagementApp
 */
angular.module('salesManagementApp')
    .controller('LoginController', function($scope, $location, APIService) {

        $scope.login = function() {
            $scope.loginFailed = false;
            var promise = APIService.login($scope.username, $scope.password);
            promise.then(function() {
                //go to home page
                $location.path('/home');
            }, function() {
                $scope.loginFailed = true;
            });
        }

    });
