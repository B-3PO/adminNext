angular
  .module('adminNext.locations')
  .controller('LocationsListController', LocationsListController);


LocationsListController.$inject = ['$scope', '$brExpansionCardManager', 'organizationsService', 'venuesId', 'organizationsId'];
function LocationsListController($scope, $brExpansionCardManager, organizationsService, venuesId, organizationsId) {
  var vm = this;

  organizationsService.registerScope($scope, [vm]);
  if (venuesId !== undefined) {
    organizationsService.bind(vm, 'venue', 'venues', venuesId);
  } else {
    vm.venue = {locations:[]};
    organizationsService.bind(vm.venue, 'locations', 'locations');
  }
  organizationsService.get();


  vm.createLocation = createLocation;
  vm.editLocation = editLocation;


  function createLocation() {
    $brExpansionCardManager('cardManager').add('locationsCreate', {venuesId: venuesId});
  }

  function editLocation(id) {
    $brExpansionCardManager('cardManager').add('locationsEdit', {locationsId: id});
  }
}
