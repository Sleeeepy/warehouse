'use strict';

angular.module('warehouseApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/order', {
        templateUrl: 'app/order/order.html',
        controller: 'OrderCtrl'
      });
  });
