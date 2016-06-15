angular
  .module('adminNext')
  .controller('VenuesCreateController', VenuesCreateController);


VenuesCreateController.$inject = ['$scope', '$brExpansionCardManager', 'organizationsService', 'organizationsId'];
function VenuesCreateController($scope, $brExpansionCardManager, organizationsService, organizationsId) {
  var vm = this;

  organizationsService.registerScope($scope, [vm]);
  organizationsService.bind(vm, 'organizationList');
  organizationsService.bind(vm, 'organization', 'organizations', organizationsId);
  organizationsService.get();

  vm.venue = {
    name: ''
  };
  vm.save = save;

  function save() {
    vm.organization.venues.push(angular.copy(vm.venue));
    organizationsService.applyChanges();
    $scope.$card.remove();
  }
}
