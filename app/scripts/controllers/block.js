'use strict';

/**
 * @ngdoc function
 * @name salesManagementApp.controller:Block1Controller
 * @description
 * # Block1Controller
 * Controller of the salesManagementApp
 */
angular.module('salesManagementApp')
    .controller('BlockController', function($scope) {
        var blockIndex = 0;
        $scope.title = "";

        $scope.init = function(index) {
            blockIndex = index;
            $scope.drawCurrent(index, $scope); //by default
            $scope.title = $scope.getCurrentChartName(blockIndex);
        }

        $scope.drawPie = function() {
            $scope.$parent.drawPie(blockIndex, $scope);
            $scope.title = $scope.getCurrentChartName(blockIndex);
        }
        $scope.drawBar = function() {
            $scope.$parent.drawBar(blockIndex, $scope);
            $scope.title = $scope.getCurrentChartName(blockIndex);
        }
        $scope.drawTop5Order = function() {
            $scope.$parent.drawTop5Order(blockIndex, $scope);
            $scope.title = $scope.getCurrentChartName(blockIndex);
        }
        $scope.drawTop5Men = function() {
            $scope.$parent.drawTop5Men(blockIndex, $scope);
            $scope.title = $scope.getCurrentChartName(blockIndex);
        }
        $scope.refresh = function() {
            $scope.drawCurrent(blockIndex, $scope);
        }
        $scope.close = function() {
            $scope.$parent.close(blockIndex);
        }
        $scope.openBack = function(){
            $scope.$parent.openBack(blockIndex);
        }
    });
