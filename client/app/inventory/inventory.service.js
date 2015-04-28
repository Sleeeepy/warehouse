'use strict';

angular.module('warehouseApp')
  .factory('Inventory', function ($resource) {
    // Public API here
    return {
      category: $resource('/api/category/:id',{},{
                    tree: {method:'GET', params:{tree:true}}
                  }),
      product:  $resource('/api/product/:id'),
      brand:    $resource('/api/brand/:id')
    };
  });
