'use strict';

angular.module('warehouseApp')
  .controller('CategoryCtrl', function ($scope,Inventory) {
    $scope.message = 'Hello';
    $scope.categories="";
    $scope.category = {};
    var inventory = Inventory;
    inventory.category.query().$promise.then(function(categories){

       $scope.categories=categories;
    });

    $scope.updateCategories =  function(){
      inventory.category.query().$promise.then(function(categories){
             $scope.categories=categories;
          });
    };


    $scope.errors = {};

    $scope.addCategory = function(form) {
      console.log(form);
      $scope.submitted = true;
      return;


      if(form.$valid) {
        Auth.createUser({
          name: $scope.user.name,
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // Account created, redirect to home
          $location.path('/');
        })
        .catch( function(err) {
          err = err.data;
          $scope.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function(error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.message;
          });
        });
      }
    };


  });
