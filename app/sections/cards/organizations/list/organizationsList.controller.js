angular
  .module('adminNext')
  .controller('OrganizationsListController', OrganizationsListController);


OrganizationsListController.$inject = ['$scope', '$brExpansionCardManager', 'organizationsService'];
function OrganizationsListController($scope, $brExpansionCardManager, organizationsService) {
  var vm = this;

  organizationsService.registerScope($scope, [vm]);
  organizationsService.bind(vm, 'organizations');
  organizationsService.get();

  vm.createOrganization = createOrganization;
  vm.editOrg = editOrg;


  function editOrg(id) {
    $brExpansionCardManager('cardManager').add('organizationsEdit', {organizationId: id});
  }

  function createOrganization() {
    $brExpansionCardManager('cardManager').add('organizationsCreate');
  }
}
