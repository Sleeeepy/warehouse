'use strict';

angular.module('warehouseApp')
  .directive('filesModel', function () {
    return {
            scope:    {
                      filesModel:'=',     // = two-way binding
                      filesCallback:'&',  // & one-way binding only
                      },
            restrict: 'AE',
            replace:  true,
            link:     function(scope,elem,attrs){
                          elem.bind('change',function(){
                            scope.$apply(function(){
                              scope.filesModel = elem.context.files;

                            });
                            scope.filesCallback();
                          });
                      }
     };
});

/*
usage:
<input type="file" files-model="someObject.files" multiple>
*/
