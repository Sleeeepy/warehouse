'use strict';

angular.module('warehouseApp')
  .controller('CategoryCtrl', function ($scope,$timeout,Inventory) {

    $scope.categories=[null];
    $scope.tree = [];
    $scope.category = {};
    $scope.submitted = false;
    $scope.alert = {};



    var inventory = Inventory;

    $scope.changeCat = function(cat){

      $scope.category=cat;
      var parent = $scope.categories.filter(function(obj){

        return obj._id === cat.parent;
      });
      $scope.category.parent = parent[0];

      console.log($scope.category);

    }


    $scope.updateCategories =  function(){
      inventory.category.query({level:1}).$promise.then(function(categories){
             $scope.categories=categories;
          });
      inventory.category.tree().$promise.then(function(tree){
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


    $scope.addImage=function(form2){
      console.log(form2);

    };
    $scope.reset = function(){
      $scope.form.$setPristine;
      $scope.form.$setUntouched;
      $scope.alert={};
      $scope.submitted = false;
      $scope.category = angular.copy({});
      $scope.$apply();

    };


    /**
     * @property interface
     * @type {Object}
     */
    $scope.interface = {};

    /**
     * @property uploadCount
     * @type {Number}
     */
    $scope.uploadCount = 0;

    /**
     * @property success
     * @type {Boolean}
     */
    $scope.success = false;

    /**
     * @property error
     * @type {Boolean}
     */
    $scope.error = false;

    // Listen for when the interface has been configured.
    $scope.$on('$dropletReady', function whenDropletReady() {

        $scope.interface.allowedExtensions(['png', 'jpg', 'bmp', 'gif', 'svg', 'torrent']);
        $scope.interface.setRequestUrl('upload.html');
        $scope.interface.defineHTTPSuccess([/2.{2}/]);
        $scope.interface.useArray(false);

    });

    // Listen for when the files have been successfully uploaded.
    $scope.$on('$dropletSuccess', function onDropletSuccess(event, response, files) {

        $scope.uploadCount = files.length;
        $scope.success     = true;
        console.log(response, files);

        $timeout(function timeout() {
            $scope.success = false;
        }, 5000);

    });

    // Listen for when the files have failed to upload.
    $scope.$on('$dropletError', function onDropletError(event, response) {

        $scope.error = true;
        console.log(response);

        $timeout(function timeout() {
            $scope.error = false;
        }, 5000);

    });

}).directive('progressbar', function ProgressbarDirective() {

    return {

        /**
         * @property restrict
         * @type {String}
         */
        restrict: 'A',

        /**
         * @property scope
         * @type {Object}
         */
        scope: {
            model: '=ngModel'
        },

        /**
         * @property ngModel
         * @type {String}
         */
        require: 'ngModel',

        /**
         * @method link
         * @param scope {Object}
         * @param element {Object}
         * @return {void}
         */
        link: function link(scope, element) {

            var progressBar = new ProgressBar.Path(element[0], {
                strokeWidth: 2
            });

            scope.$watch('model', function() {

                progressBar.animate(scope.model / 100, {
                    duration: 1000
                });

            });

            scope.$on('$dropletSuccess', function onSuccess() {
                progressBar.animate(0);
            });

            scope.$on('$dropletError', function onSuccess() {
                progressBar.animate(0);
            });

        }

    }






  });
