angular
  .module('adminNext.locations')
  .controller('LocationsEditController', LocationsEditController);


LocationsEditController.$inject = ['$scope', '$brExpansionCardManager', 'organizationsService', 'watchForEdit', 'locationsId'];
function LocationsEditController($scope, $brExpansionCardManager, organizationsService, watchForEdit, locationsId) {
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


  function checkChanges() {
    vm.edited = false;
    watchForEdit.watch(vm, 'location', $scope, function () {
      vm.edited = true;
    });
  }
  checkChanges();


  function save() {
    organizationsService.applyChanges();
    if ($scope.$card.topCard === false) {
      $scope.$card.remove();
    } else { checkChanges(); }
  }

  function cancel() {
    organizationsService.removeChanges();
    if ($scope.$card.topCard === false) {
      $scope.$card.remove();
    } else { checkChanges(); }
  }
}
