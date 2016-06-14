angular
  .module('adminNext')
  .run(venuesMenuLinks)
  .run(venuesRegisterCards)
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
        organizationId: ['$route', function ($route) {
          return $route.current.params.organizationsId || false;
        }],
        venueId: function () { return false; },
        venuesCreate: function () { return true; },
        organizationScope: function () { return true; }
      }
    })
    .when('/organizations/:organizationsId/venues', {
      template: ' ',
      controller: 'VenuesController',
      controllerAs: 'vm',
      resolve: {
        organizationId: ['$route', function ($route) {
          return $route.current.params.organizationsId || false;
        }],
        venueId: function () { return false; },
        venuesCreate: function () { return false; },
        organizationScope: function () { return true; }
      }
    })
    .when('/organizations/:organizationsId/venues/:venueId', {
      template: ' ',
      controller: 'VenuesController',
      controllerAs: 'vm',
      resolve: {
        organizationId: ['$route', function ($route) {
          return $route.current.params.organizationsId || false;
        }],
        venueId: ['$route', function ($route) {
          return $route.current.params.venueId || false;
        }],
        venuesCreate: function () { return false; },
        organizationScope: function () { return true; }
      }
    })
    .when('/venues/create', {
      template: ' ',
      controller: 'VenuesController',
      controllerAs: 'vm',
      resolve: {
        organizationId: ['authService', function (authService) {
          return authService.getPayload().organization_id || false;
        }],
        venueId: function () { return false; },
        venuesCreate: function () { return true; },
        organizationScope: function () { return false; }
      }
    })
    .when('/venues/:venueId', {
      template: ' ',
      controller: 'VenuesController',
      controllerAs: 'vm',
      resolve: {
        organizationId: ['authService', function (authService) {
          return authService.getPayload().organization_id || false;
        }],
        venueId: ['$route', function ($route) {
          return $route.current.params.venueId;
        }],
        venuesCreate: function () { return false; },
        organizationScope: function () { return false; }
      }
    })
    .when('/venues', {
      template: ' ',
      controller: 'VenuesController',
      controllerAs: 'vm',
      resolve: {
        organizationId: ['authService', function (authService) {
          return authService.getPayload().organization_id || false;
        }],
        venueId: function () { return false; },
        venuesCreate: function () { return false; },
        organizationScope: function () { return false; }
      }
    });
}



venuesMenuLinks.$inject = ['navMenuService'];
function venuesMenuLinks(navMenuService) {
  navMenuService.addMainLinks([
    {
      order: 1,
      label: 'Venues',
      url: 'venues',
      icon: 'poll',
      admin: true,
      venueId: false
    },
    {
      order: 1,
      label: 'Venue',
      url: 'venues/:venueId',
      icon: 'poll',
      organizationId: true,
      venueId: true,
    }
  ]);



  navMenuService.addSearchLinks([
    {
      action: 'list',
      label: 'Venues',
      url: 'venues',
      icon: 'list',
      venueId: false,
      admin: true
    },
    {
      action: 'create',
      label: 'Venues',
      url: 'venues/create',
      icon: 'add',
      venueId: false,
      admin: true
    },
    {
      action: 'edit',
      label: 'Venues',
      url: 'venues/:venueId',
      icon: 'edit',
      organizationId: true,
      venueId: true
    }
  ]);
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
