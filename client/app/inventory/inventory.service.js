'use strict';

angular.module('warehouseApp')
  .factory('Inventory', function ($resource) {
    // Public API here
    return {
      category: $resource('/api/categories/:id',{id:'@_id'},{
                    tree: {method:'GET',isArray:true, params:{tree:true}},
                    update:{ method:'PUT'}
                  }),
      product:  $resource('/api/products/:id'),
      brand:    $resource('/api/brands/:id'),
      image:    $resource('/api/images/:id',{id: "@_id"}, {
                      save: { method: 'POST',
                              transformRequest: function(data) {
                                      if (data === undefined)
                                        return data;

                                      var fd = new FormData();
                                      angular.forEach(data, function(value, key) {
                                        if (value instanceof FileList) {
                                          if (value.length == 1) {
                                            fd.append(key, value[0]);
                                          } else {
                                            angular.forEach(value, function(file, index) {
                                              fd.append(key + '_' + index, file);
                                            });
                                          }
                                        } else {
                                          fd.append(key, value);
                                        }
                                      });

                                      return fd;
                                    }
                              //header: <SEE BELOW>
                              // todo https://github.com/angular/angular.js/issues/1375#issuecomment-21933012
                      }
                    })
    };
  });
