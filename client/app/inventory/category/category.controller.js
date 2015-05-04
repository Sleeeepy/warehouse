'use strict';

angular.module('warehouseApp')
  .controller('CategoryCtrl', function ($scope,Inventory) {

    $scope.categories=[null];
    $scope.tree = [];
    $scope.category = {};
    $scope.submitted = false;
    $scope.alert = {}


    var inventory = Inventory;

    $scope.changeCat = function(cat){
      $scope.category=cat;
    }


    $scope.updateCategories =  function(){
      inventory.category.query({level:1}).$promise.then(function(categories){
             $scope.categories=categories;
             console.log(categories);
          });
      inventory.category.tree().$promise.then(function(tree){
                    console.log(tree);
                   $scope.tree=tree;
                });
    };
    $scope.updateCategories();

    $scope.errors = {};

    $scope.addCategory = function(form) {
      $scope.submitted = true;
      if(form.$valid) {
        var newCat = new inventory.category($scope.category);
        if (newCat.parent){newCat.parent = newCat.parent._id;}

        newCat.$save().then(function(result){
          $scope.alert={  type: 'success',
                          msg: 'Category '+result.name+' added successfully.'
                        };
          $scope.updateCategories();
          setTimeout(function(){$scope.reset();},2500);
        });

        };

    };
    $scope.deleteCategory = function(category) {
      console.log('deleting',category.name);

        inventory.category.get({id:category._id}).$promise.then(function(cat){

          cat.$delete(null,function(success){
            $scope.updateCategories();
          },function(err){
            alert(err);
            $scope.updateCategories();
          });

        });

    };


    $scope.reset = function(){
      $scope.form.$setPristine;
      $scope.form.$setUntouched;
      $scope.alert={};
      $scope.submitted = false;
      $scope.category = angular.copy({});
      $scope.$apply();

    };


  });
