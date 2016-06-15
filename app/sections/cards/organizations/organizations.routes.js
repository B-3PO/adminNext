angular
  .module('adminNext.organizations')
  .config(organizationsConfig);

organizationsConfig.$inject = ['$routeProvider'];
function organizationsConfig($routeProvider) {
  $routeProvider
    .when('/organizations/create', {
      template: ' ',
      controller: 'OrganizationsController',
      controllerAs: 'vm',
      resolve: {
        organizationCreate: function () { return true; }
      }
    })
    .when('/organizations/:organizationsId?', {
      template: ' ',
      controller: 'OrganizationsController',
      controllerAs: 'vm',
      resolve: {
        organizationCreate: function () { return false; }
      }
    });
}
