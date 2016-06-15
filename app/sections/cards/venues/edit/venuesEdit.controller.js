angular
  .module('adminNext')
  .controller('VenuesEditController', VenuesEditController);


VenuesEditController.$inject = ['$scope', '$brExpansionCardManager', 'organizationsService', 'venuesId', 'US_STATES'];
function VenuesEditController($scope, $brExpansionCardManager, organizationsService, venuesId, US_STATES) {
  var vm = this;

  organizationsService.registerScope($scope, [vm]);
  organizationsService.bind(vm, 'venue', 'venues', venuesId);
  organizationsService.get();

  vm.states = US_STATES;

  vm.save = save;
  vm.cancel = cancel;


  function save() {
    organizationsService.applyChanges();
  }

  function cancel() {
    $scope.$card.remove();
  }
}
