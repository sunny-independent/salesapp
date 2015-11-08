'use strict';

/**
 * @ngdoc function
 * @name salesManagementApp.controller:FooterController
 * @description
 * # FooterController
 * Controller of the salesManagementApp
 */
angular.module('salesManagementApp')
    .controller('FooterController', function($scope, $uibModal) {

        $scope.privacy = function() {
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'views/privacy.html',
                controller: function($uibModalInstance, $scope) {
                    $scope.ok = function() {
                        $uibModalInstance.close('ok');
                    };

                    $scope.cancel = function() {
                        $uibModalInstance.dismiss('cancel');
                    };
                },
                size: 'lg'
            });
        };

        $scope.terms = function() {
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'views/terms.html',
                controller: function($uibModalInstance, $scope) {
                    $scope.ok = function() {
                        $uibModalInstance.close('ok');
                    };

                    $scope.cancel = function() {
                        $uibModalInstance.dismiss('cancel');
                    };
                },
                size: 'lg'
            });
        };

        $scope.support = function() {
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'views/support.html',
                controller: function($uibModalInstance, $scope) {
                	$scope.on = false;
                    $scope.ok = function() {
                        //$uibModalInstance.close('ok');
                        $scope.on = true;
                    };

                    $scope.cancel = function() {
                        $uibModalInstance.dismiss('cancel');
                    };
                },
                size: 'lg'
            });
        };

    });
