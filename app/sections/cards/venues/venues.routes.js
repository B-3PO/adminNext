angular
  .module('adminNext.venues')
  .config(venuesConfig);


// TODO add general venues list to show all venues instead of redirecting to organizations list when no id is provided

venuesConfig.$inject = ['$routeProvider'];
function venuesConfig($routeProvider) {
  $routeProvider
    .when('/organizations/:organizationsId/venues/create', {
      template: ' ',
      controller: 'VenuesController',
      controllerAs: 'vm',
      resolve: {
        venuesCreate: function () { return true; },
        organizationScope: function () { return true; }
      }
    })
    .when('/organizations/:organizationsId/venues', {
      template: ' ',
      controller: 'VenuesController',
      controllerAs: 'vm',
      resolve: {
        venuesCreate: function () { return false; },
        organizationScope: function () { return true; }
      }
    })
    .when('/organizations/:organizationsId/venues/:venuesId', {
      template: ' ',
      controller: 'VenuesController',
      controllerAs: 'vm',
      resolve: {
        venuesCreate: function () { return false; },
        organizationScope: function () { return true; }
      }
    })
    .when('/venues/:venuesId', {
      template: ' ',
      controller: 'VenuesController',
      controllerAs: 'vm',
      resolve: {
        venuesCreate: function () { return false; },
        organizationScope: function () { return false; }
      }
    })
    .when('/venues', {
      template: ' ',
      controller: 'VenuesController',
      controllerAs: 'vm',
      resolve: {
        venuesCreate: function () { return false; },
        organizationScope: function () { return false; }
      }
    });
}
