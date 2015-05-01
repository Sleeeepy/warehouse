'use strict';

angular.module('warehouseApp')
  .factory('Inventory', function ($resource) {
    // Public API here
    return {
      category: $resource('/api/categories/:id',{id:'@_id'},{
                    tree: {method:'GET',isArray:true, params:{tree:true}}
                  }),
      product:  $resource('/api/products/:id'),
      brand:    $resource('/api/brands/:id')
    };
  });
