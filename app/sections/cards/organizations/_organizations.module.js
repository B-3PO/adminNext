angular
  .module('adminNext')
  .run(organizationsRegisterCards)
  .run(organizationsMenuLinks)
  .config(organizationsConfig);


// TODO add ability to jump to venues list for organizations

organizationsConfig.$inject = ['$routeProvider'];
function organizationsConfig($routeProvider) {
  $routeProvider
    .when('/organizations/create', {
      template: ' ',
      controller: 'OrganizationsController',
      controllerAs: 'vm',
      resolve: {
        organizationId: function () { return false; },
        organizationCreate: function () { return true; }
      }
    })
    .when('/organizations/:id?', {
      template: ' ',
      controller: 'OrganizationsController',
      controllerAs: 'vm',
      resolve: {
        organizationId: ['$route', function ($route) {
          return $route.current.params.id || false;
        }],
        organizationCreate: function () { return false; }
      }
    });
}



organizationsMenuLinks.$inject = ['navMenuService'];
function organizationsMenuLinks(navMenuService) {
  navMenuService.addMainLinks([
    {
      order: 0,
      label: 'Organizations',
      url: 'organizations',
      icon: 'turned_in',
      admin: true,
      organizationId: false
    },
    {
      order: 0,
      label: 'Organization',
      url: 'organizations/:organizationId',
      icon: 'turned_in',
      organizationId: true,
      venueId: false
    }
  ]);



  navMenuService.addSearchLinks([
    {
      action: 'list',
      label: 'Organizations',
      url: 'organizations',
      icon: 'list',
      organizationId: false,
      venueId: false,
      admin: true
    },
    {
      action: 'create',
      label: 'Organizations',
      url: 'organizations/create',
      icon: 'add',
      organizationId: false,
      venueId: false,
      admin: true
    },
    {
      action: 'edit',
      label: 'Organization',
      url: 'organizations/:organizationId',
      icon: 'edit',
      organizationId: true,
      venueId: false
    }
  ]);
}



organizationsRegisterCards.$inject = ['$brExpansionCardManager'];
function organizationsRegisterCards($brExpansionCardManager) {
  // register cards and add the first one
  $brExpansionCardManager().waitFor('cardManager').then(function (instance) {
    instance.register({
      componentId: 'organizationsList',
      templateUrl: 'sections/cards/organizations/list/organizationsList.html',
      controller: 'OrganizationsListController',
      controllerAs: 'vm'
    });

    instance.register({
      componentId: 'organizationsEdit',
      templateUrl: 'sections/cards/organizations/edit/organizationsEdit.html',
      controller: 'OrganizationsEditController',
      controllerAs: 'vm'
    });

    instance.register({
      componentId: 'organizationsCreate',
      templateUrl: 'sections/cards/organizations/create/organizationsCreate.html',
      controller: 'OrganizationsCreateController',
      controllerAs: 'vm'
    });
  });
}
