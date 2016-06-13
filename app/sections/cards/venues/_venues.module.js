angular
  .module('adminNext')
  .run(venuesRegisterCards)
  .config(venuesConfig);


// TODO add general venues list to show all venues instead of redirecting to organizations list when no id is provided

venuesConfig.$inject = ['$routeProvider'];
function venuesConfig($routeProvider) {
  $routeProvider
    .when('/organizations/:id/venues/create', {
      template: ' ',
      controller: 'VenuesController',
      controllerAs: 'vm',
      resolve: {
        organizationId: ['$route', function ($route) {
          return $route.current.params.id || false;
        }],
        venueId: function () { return false; },
        venuesCreate: function () { return true; }
      }
    })
    .when('/organizations/:organizationId/venues', {
      template: ' ',
      controller: 'VenuesController',
      controllerAs: 'vm',
      resolve: {
        organizationId: ['$route', function ($route) {
          return $route.current.params.organizationId || false;
        }],
        venueId: function () { return false; },
        venuesCreate: function () { return false; }
      }
    })
    .when('/venues/:id', {
      template: ' ',
      controller: 'VenuesController',
      controllerAs: 'vm',
      resolve: {
        organizationId: function () { return false; },
        venueId: ['$route', function ($route) {
          return $route.current.params.id;
        }],
        venuesCreate: function () { return false; }
      }
    });
}


venuesRegisterCards.$inject = ['$brExpansionCardManager'];
function venuesRegisterCards($brExpansionCardManager) {
  $brExpansionCardManager().waitFor('cardManager').then(function (instance) {
    instance.register({
      componentId: 'venuesList',
      templateUrl: 'sections/cards/venues/list/venuesList.html',
      controller: 'VenuesListController',
      controllerAs: 'vm'
    });

    instance.register({
      componentId: 'venuesCreate',
      templateUrl: 'sections/cards/venues/create/venuesCreate.html',
      controller: 'VenuesCreateController',
      controllerAs: 'vm'
    });

    instance.register({
      componentId: 'venuesEdit',
      templateUrl: 'sections/cards/venues/edit/venuesEdit.html',
      controller: 'VenuesEditController',
      controllerAs: 'vm'
    });
  });
}
