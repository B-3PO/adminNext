angular
  .module('adminNext.locations')
  .controller('LocationsEditController', LocationsEditController);


LocationsEditController.$inject = ['$scope', '$brExpansionCardManager', 'organizationsService', 'locationsId'];
function LocationsEditController($scope, $brExpansionCardManager, organizationsService, locationsId) {
  var vm = this;

  organizationsService.registerScope($scope, [vm]);
  organizationsService.bind(vm, 'location', 'locations', locationsId);
  organizationsService.get();

  vm.types = [
    'Commissary',
    'Concession',
    'Restaurant',
    'Vending Room'
  ];
  vm.save = save;
  vm.cancel = cancel;


  function save() {
    organizationsService.applyChanges();
  }

  function cancel() {
    $scope.$card.remove();
  }
}
