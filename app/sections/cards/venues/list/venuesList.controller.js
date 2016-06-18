angular
  .module('adminNext')
  .controller('VenuesListController', VenuesListController);


VenuesListController.$inject = ['$scope', '$brExpansionCardManager', 'organizationsService', 'organizationsId'];
function VenuesListController($scope, $brExpansionCardManager, organizationsService, organizationsId) {
  var vm = this;

  organizationsService.registerScope($scope, [vm]);
  if (organizationsId !== undefined) {
    organizationsService.bind(vm, 'organization', 'organizations', organizationsId);
  } else {
    vm.organization = {};
    organizationsService.bind(vm.organization, 'venues', 'venues');
  }
  organizationsService.get();


  vm.createVenue = createVenue;
  vm.editVenue = editVenue;


  function createVenue() {
    $brExpansionCardManager('cardManager').add('venuesCreate', {organizationsId: organizationsId});
  }

  function editVenue(id) {
    $brExpansionCardManager('cardManager').add('venuesEdit', {venuesId: id, organizationsId: organizationsId});
  }
}
