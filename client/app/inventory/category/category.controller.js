'use strict';

angular.module('warehouseApp')
  .controller('CategoryCtrl', function ($scope,Inventory) {
    $scope.message = 'Hello';
    $scope.categories="";
    var inventory = Inventory;
    inventory.category.query().$promise.then(function(categories){

       $scope.categories=categories;
    });

    $scope.updateCategories =  function(){
      inventory.category.query().$promise.then(function(categories){
             $scope.categories=categories;
          });
    };

  });
