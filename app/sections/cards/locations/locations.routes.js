angular
  .module('adminNext.locations')
  .config(locationsRoutes);


locationsRoutes.$inject = ['$routeProvider'];
function locationsRoutes($routeProvider) {
  $routeProvider
    .when('/venues/:venuesId/locations/create', {
      template: ' ',
      controller: 'LocationsController',
      controllerAs: 'vm',
      resolve: {
        locationsCreate: function () { return true; }
      }
    })
    .when('/venues/:venuesId/locations', {
      template: ' ',
      controller: 'LocationsController',
      controllerAs: 'vm',
      resolve: {
        locationsCreate: function () { return false; }
      }
    })
    .when('/venues/:venuesId/locations/:locationsId', {
      template: ' ',
      controller: 'LocationsController',
      controllerAs: 'vm',
      resolve: {
        locationsCreate: function () { return false; }
      }
    })
    .when('/locations/:locationsId', {
      template: ' ',
      controller: 'LocationsController',
      controllerAs: 'vm',
      resolve: {
        locationsCreate: function () { return false; }
      }
    })
    .when('/locations', {
      template: ' ',
      controller: 'LocationsController',
      controllerAs: 'vm',
      resolve: {
        locationsCreate: function () { return false; }
      }
    });
}
