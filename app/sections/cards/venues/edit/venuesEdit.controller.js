angular
  .module('adminNext')
  .controller('VenuesEditController', VenuesEditController);


VenuesEditController.$inject = ['$scope', '$brExpansionCardManager', 'organizationsService', 'watchForEdit', 'venuesId', 'organizationsId', 'US_STATES'];
function VenuesEditController($scope, $brExpansionCardManager, organizationsService, watchForEdit, venuesId, organizationsId, US_STATES) {
  var vm = this;

  organizationsService.registerScope($scope, [vm]);
  organizationsService.bind(vm, 'organization', 'organizations', organizationsId);
  organizationsService.bind(vm, 'venue', 'venues', venuesId);
  organizationsService.get();

  vm.states = US_STATES;

  vm.save = save;
  vm.cancel = cancel;


  function checkChanges() {
    vm.edited = false;
    watchForEdit.watch(vm, 'venue', $scope, function () {
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
