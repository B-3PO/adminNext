angular
  .module('adminNext.menus')
  .config(menusRoutes);


menusRoutes.$inject = ['$routeProvider'];
function menusRoutes($routeProvider) {
  $routeProvider
    .when('/organizations/:organizationsId/menus/create', {
      template: ' ',
      controller: 'MenusController',
      controllerAs: 'vm',
      resolve: {
        menusCreate: function () { return true; }
      }
    })
    .when('/organizations/:organizationsId/menus', {
      template: ' ',
      controller: 'MenusController',
      controllerAs: 'vm',
      resolve: {
        menusCreate: function () { return false; }
      }
    })
    .when('/organizations/:organizationsId/menus/:menusId', {
      template: ' ',
      controller: 'MenusController',
      controllerAs: 'vm',
      resolve: {
        menusCreate: function () { return false; }
      }
    })
    .when('/menus/:menusId', {
      template: ' ',
      controller: 'MenusController',
      controllerAs: 'vm',
      resolve: {
        menusCreate: function () { return false; }
      }
    })
    .when('/menus', {
      template: ' ',
      controller: 'MenusController',
      controllerAs: 'vm',
      resolve: {
        menusCreate: function () { return false; }
      }
    });
}
