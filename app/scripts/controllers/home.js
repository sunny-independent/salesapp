'use strict';

/**
 * @ngdoc function
 * @name salesManagementApp.controller:HomeController
 * @description
 * # HomeController
 * Controller of the salesManagementApp
 */
angular.module('salesManagementApp')
    .controller('HomeController', function($scope, $location, $filter, APIService, pie, bar, top5order, top5men) {
        $scope.keys = {
            pie: "pie",
            bar: "bar",
            top5order: "top5order",
            top5men: "top5men"
        };

        var apiData = {};
        apiData[$scope.keys.pie] = [];
        apiData[$scope.keys.bar] = [];
        apiData[$scope.keys.top5order] = [];
        apiData[$scope.keys.top5men] = [];

        function load() {
            $scope.username = APIService.getUserName();
            $scope.defaultCounter = 1;
            $scope.blocks = initializeBlocks();
            setApiData($scope.keys.pie, pie);
            setApiData($scope.keys.bar, bar);
            setApiData($scope.keys.top5order, top5order);
            setApiData($scope.keys.top5men, top5men);
        }

        function setApiData(chartName, response) {
            var result = response.data;
            if (result.resultDescription == "SUCCESS") {
                apiData[chartName] = result.data;
            }
        }

        function initializeBlocks() {
            var arr = [];
            arr[0] = {
                visible: true,
                currentChart: $scope.keys.pie
            };
            arr[1] = {
                visible: true,
                currentChart: $scope.keys.bar
            };
            arr[2] = {
                visible: true,
                currentChart: $scope.keys.top5order
            };
            arr[3] = {
                visible: true,
                currentChart: $scope.keys.top5men
            };
            return arr;
        }

        function getBarChartValues() {
            var values = [];
            angular.forEach(apiData[$scope.keys.bar], function(value, index) {
                var temp = new Object();
                temp.label = value[0];
                temp.value = value[1];
                values.push(temp);
            });
            return values;
        }

        function getPieChartData() {
            var data = [];
            angular.forEach(apiData[$scope.keys.pie], function(value, index) {
                var temp = new Object();
                temp.key = value[0];
                temp.y = value[1];
                data.push(temp);
            });
            return data;
        }

        $scope.logout = function() {
            APIService.logout();
            $location.path("/");
        }

        $scope.getBarChartConfig = function() {
            var options = {
                chart: {
                    type: 'discreteBarChart',
                    height: 180,
                    margin: {
                        top: 20,
                        right: 20,
                        bottom: 50,
                        left: 55
                    },
                    x: function(d) {
                        return d.label;
                    },
                    y: function(d) {
                        return d.value;
                    },
                    showValues: false,
                    valueFormat: function(d) {
                        return d3.format(',.4f')(d);
                    },
                    duration: 500,
                    xAxis: {
                        axisLabel: ''
                    },
                    yAxis: {
                        axisLabel: '',
                        axisLabelDistance: -40
                    }
                }
            };
            var data = [{
                key: "Cumulative Return",
                values: getBarChartValues()
            }];
            var answer = new Object();
            answer.data = data;
            answer.options = options;
            return answer;
        };

        $scope.getPieChartConfig = function() {
            var options = {
                chart: {
                    type: 'pieChart',
                    height: 180,
                    x: function(d) {
                        return d.key;
                    },
                    y: function(d) {
                        return d.y;
                    },
                    showLabels: true,
                    duration: 500,
                    labelThreshold: 0.01,
                    labelSunbeamLayout: true,
                    legend: {
                        margin: {
                            top: 5,
                            right: 35,
                            bottom: 5,
                            left: 0
                        }
                    }
                }
            };

            var data = getPieChartData();
            var answer = new Object();
            answer.data = data;
            answer.options = options;
            return answer;
        }

        $scope.getTop5SalesOrederInAmount = function() {
            var sortedList = $filter('orderBy')(apiData[$scope.keys.top5order], function(value, index, array) {
                return value.value;
            }, true);
            return sortedList;
        }

        $scope.getTop5SalesMenInLast3Months = function() {
            var sortedList = $filter('orderBy')(apiData[$scope.keys.top5men], function(value, index, array) {
                return value[1];
            }, true);
            return sortedList;
        }

        /* these functions will manipulate local data of child controller */

        $scope.drawPie = function(index, childScope) {
            var answer = childScope.getPieChartConfig();
            $scope.blocks[index].currentChart = childScope.keys.pie;
            /* Chart options */
            childScope.options = answer.options;
            /* Chart data */
            childScope.data = answer.data;
            /* List data */
            childScope.topMenList = [];
            childScope.topOrderList = [];
        }

        $scope.drawBar = function(index, childScope) {
            var answer = childScope.getBarChartConfig();
            $scope.blocks[index].currentChart = childScope.keys.bar;
            /* Chart options */
            childScope.options = answer.options;
            /* Chart data */
            childScope.data = answer.data;
            /* List data */
            childScope.topMenList = [];
            childScope.topOrderList = [];
        }

        $scope.drawTop5Order = function(index, childScope) {
            var answer = childScope.getTop5SalesOrederInAmount();
            $scope.blocks[index].currentChart = childScope.keys.top5order;
            /* Chart options */
            childScope.options = null;
            /* Chart data */
            childScope.data = null;
            /* List data */
            childScope.topMenList = [];
            childScope.topOrderList = answer;
        }

        $scope.drawTop5Men = function(index, childScope) {
            var answer = childScope.getTop5SalesMenInLast3Months();
            $scope.blocks[index].currentChart = childScope.keys.top5men;
            /* Chart options */
            childScope.options = null;
            /* Chart data */
            childScope.data = null;
            /* List data */
            childScope.topMenList = answer;
            childScope.topOrderList = [];
        }

        $scope.close = function(blockId) {
            $scope.blocks[blockId].visible = false;
        }

        $scope.openBack = function(blockId){
            $scope.blocks[blockId].visible = true;
        }

        $scope.getCurrentChartName = function(index) {
            var current = $scope.blocks[index].currentChart;
            var title = "";
            switch (current) {
                case $scope.keys.pie:
                    title = "Sales Total Per Sales Man";
                    break;
                case $scope.keys.bar:
                    title = "Sales Total Per month";
                    break;
                case $scope.keys.top5order:
                    title = "Top 5 Sales Oder";
                    break;
                case $scope.keys.top5men:
                    title = "Top 5 Sales Men";
                    break;
            }
            return title;
        }

        $scope.drawCurrent = function(index, childScope) {
            var current = $scope.blocks[index].currentChart;
            switch (current) {
                case $scope.keys.pie:
                    $scope.drawPie(index, childScope);
                    break;
                case $scope.keys.bar:
                    $scope.drawBar(index, childScope);
                    break;
                case $scope.keys.top5order:
                    $scope.drawTop5Order(index, childScope);
                    break;
                case $scope.keys.top5men:
                    $scope.drawTop5Men(index, childScope);
                    break;
            }
        }

        load();
    });
