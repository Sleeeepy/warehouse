'use strict';

angular.module('warehouseApp')
  .controller('CategoryCtrl', function ($scope,$timeout,Inventory,Upload) {

    $scope.categories=[null];
    $scope.files=null;
    $scope.tree = [];
    $scope.category = {};
    $scope.submitted = false;
    $scope.alert = {};
    $scope.errors = {};
    $scope.img={files:null};

    var inventory = Inventory;

    $scope.watch('selectedImages',function(oldValue,newValue){
      alert('easdfasd');
    });

    $scope.uploadImages = function(flow){
      var files = flow.files;
      var fd = new FormData();

      inventory.image.save({files:flow.files},function(result){
        console.log(result);
      });

    };

    $scope.test = function(){
      console.log('test',$scope.img);
      inventory.image.save($scope.img,function(result){
        console.log(result);
      });
    };

    $scope.selectCategory = function(cat){

      $scope.category=cat;
      var parent = $scope.categories.filter(function(obj){
        return obj._id === cat.parent;
      });
      if(parent[0]){$scope.category.parent = parent[0]._id;}
    }


    $scope.refreshCategories =  function(){
      inventory.category.query({level:1}).$promise.then(function(categories){
          $scope.categories=categories;
      });
      inventory.category.tree().$promise.then(function(tree){
          $scope.tree=tree;
      });
    };
    $scope.refreshCategories();

    $scope.addCategory = function(form) {
      $scope.submitted = true;
      if(form.$valid) {
        if(!$scope.category._id){
          var newCat = new inventory.category($scope.category);
          newCat.$save().then(function(result){
            $scope.alert={  type: 'success',
                            msg: 'Category '+result.name+' added successfully.'
                          };
            });
        }else{
          inventory.category.update({id:$scope.category._id},$scope.category).$promise.then(function(result){
            $scope.alert={  type: 'success',
                            msg: 'Category '+result.name+' updated successfully.'
                          };
          });
        }

          $scope.refreshCategories();
          setTimeout(function(){$scope.reset();},2500);
      }
    };


    $scope.deleteCategory = function(category) {
      console.log('deleting',category.name);

        inventory.category.get({id:category._id}).$promise.then(function(cat){

          cat.$delete(null,function(success){
            $scope.updateCategories();
          },function(err){
            alert(err);
            $scope.refreshCategories();
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

    //ng-file-upload jsfiddle

    $scope.$watch('files', function () {
      console.log('fileswatch',$scope.files);
        $scope.upload($scope.files);
    });
    $scope.log = '';

    $scope.upload = function (files) {
      $scope.log = '';

        if (files && files.length) {
          console.log('legnth',files.length);
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                Upload.upload({
                    url: '/api/images',//'https://angular-file-upload-cors-srv.appspot.com/upload',
                    fields: {
                        'username': $scope.username
                    },
                    file: file
                }).progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    $scope.log = 'progress: ' + progressPercentage + '% ' +
                                evt.config.file.name + '\n' + $scope.log;
                    console.log($scope.log);
                }).success(function (data, status, headers, config) {
                    $scope.log = 'file ' + config.file.name + 'uploaded. Response: ' + JSON.stringify(data) + '\n' + $scope.log;
                    //$scope.$apply();
                });
            }
        }
    };







  });
