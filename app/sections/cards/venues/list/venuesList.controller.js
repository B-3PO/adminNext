angular
  .module('adminNext')
  .controller('VenuesListController', VenuesListController);


VenuesListController.$inject = ['$scope', '$brExpansionCardManager', 'organizationsService', 'organizationId'];
function VenuesListController($scope, $brExpansionCardManager, organizationsService, organizationId) {
  var vm = this;

  organizationsService.registerScope($scope, [vm]);
  organizationsService.bind(vm, 'organization', 'organizations', organizationId);
  organizationsService.get();


  vm.createVenue = createVenue;
  vm.editVenue = editVenue;


  function createVenue() {
    $brExpansionCardManager('cardManager').add('venuesCreate', {organizationId: organizationId});
  }

  function editVenue(id) {
    $brExpansionCardManager('cardManager').add('venuesEdit', {venueId: id});
  }
}
