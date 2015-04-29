'use strict';

angular.module('warehouseApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/category', {
        templateUrl: 'app/inventory/category/category.html',
        controller: 'CategoryCtrl'
      });
  });
