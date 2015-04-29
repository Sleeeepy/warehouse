'use strict';

angular.module('warehouseApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    $scope.menu = [
      {'title': 'Inventory','link': '/inventory',
        'entries':[ {'title': 'Category','link': '/category'},
                    {'title': 'Product','link': '/product'},
                    {'title': 'Brand','link': '/brand'}
                  ]
      },
      {'title': 'Orders','link': '/order','entries':[]},
      {'title': 'Users','link': '/user',
        'entries':[ {'title': 'Customers','link': '/customer'},
                    {'title': 'Employees','link': '/employee'}
                  ]
      },
      {'title': 'Data','link': '/data',
        'entries':[ {'title': 'Export','link': '/export'},
                    {'title': 'Import','link': '/import'}
                  ]
      },
      //{'title': '','link': '',class:'divider'},
      {'title': 'Advanced','link': '/advanced',
        'entries':[ {'title': 'Shipping','link': '/shipping'},
                    {'title': 'Taxes','link': '/tax'},
                    {'title': 'Currencies','link': '/currency'},
                    {'title': 'Gateways','link': '/gateway'}
                  ]
      }
      ];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
