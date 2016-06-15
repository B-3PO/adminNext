angular
  .module('adminNext.organizations')
  .run(organizationsRegisterCards);


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
