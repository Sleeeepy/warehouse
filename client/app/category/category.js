'use strict';

angular.module('warehouseApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/category', {
        templateUrl: 'app/category/category.html',
        controller: 'CategoryCtrl'
      });
  });
