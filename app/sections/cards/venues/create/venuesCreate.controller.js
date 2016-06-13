angular
  .module('adminNext')
  .controller('VenuesCreateController', VenuesCreateController);


VenuesCreateController.$inject = ['$scope', '$brExpansionCardManager', 'organizationsService', 'organizationId'];
function VenuesCreateController($scope, $brExpansionCardManager, organizationsService, organizationId) {
  var vm = this;

  organizationsService.registerScope($scope, [vm]);
  organizationsService.bind(vm, 'organizationList');
  organizationsService.bind(vm, 'organization', 'organizations', organizationId);
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
