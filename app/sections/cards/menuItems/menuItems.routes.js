angular
  .module('adminNext.menuItems')
  .config(menuItemsRoutes);


menuItemsRoutes.$inject = ['$routeProvider'];
function menuItemsRoutes($routeProvider) {
  $routeProvider
    .when('/menus/:menusId/menuItems/create', {
      template: ' ',
      controller: 'MenuItemsController',
      controllerAs: 'vm',
      resolve: {
        menuItemsCreate: function () { return true; }
      }
    })
    .when('/menus/:menusId/menuItems', {
      template: ' ',
      controller: 'MenuItemsController',
      controllerAs: 'vm',
      resolve: {
        menuItemsCreate: function () { return false; }
      }
    })
    .when('/menus/:menusId/menuItems/:menuItemsId', {
      template: ' ',
      controller: 'MenuItemsController',
      controllerAs: 'vm',
      resolve: {
        menuItemsCreate: function () { return false; }
      }
    })
    .when('/menuItems/:menuItemsId', {
      template: ' ',
      controller: 'MenuItemsController',
      controllerAs: 'vm',
      resolve: {
        menuItemsCreate: function () { return false; }
      }
    })
    .when('/menuItems', {
      template: ' ',
      controller: 'MenuItemsController',
      controllerAs: 'vm',
      resolve: {
        menuItemsCreate: function () { return false; }
      }
    });
}
