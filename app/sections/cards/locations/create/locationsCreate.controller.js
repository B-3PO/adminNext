angular
  .module('adminNext.locations')
  .controller('LocationsCreateController', LocationsCreateController);


LocationsCreateController.$inject = ['$scope', '$brExpansionCardManager', 'organizationsService', 'venuesId'];
function LocationsCreateController($scope, $brExpansionCardManager, organizationsService, venuesId) {
  var vm = this;

  organizationsService.registerScope($scope, [vm]);
  organizationsService.bind(vm, 'venue', 'venues', venuesId);
  organizationsService.get();

  vm.types = [
    'Commissary',
    'Concession',
    'Restaurant',
    'Vending Room'
  ];
  vm.location = {
    name: ''
  };

  
  vm.save = save;

  function save() {
    vm.venue.locations.push(angular.copy(vm.location));
    organizationsService.applyChanges();
    $scope.$card.remove();
  }
}
