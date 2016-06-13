angular
  .module('adminNext')
  .controller('OrganizationsCreateController', OrganizationsCreateController);


OrganizationsCreateController.$inject = ['$scope', '$brExpansionCardManager', 'organizationsService'];
function OrganizationsCreateController($scope, $brExpansionCardManager, organizationsService) {
  var vm = this;

  organizationsService.registerScope($scope, [vm]);
  organizationsService.bind(vm, 'organizationsList');
  organizationsService.get();

  vm.organization = {
    name: ''
  };
  vm.save = save;

  function save() {
    vm.organizationsList.push(angular.copy(vm.organization));
    organizationsService.applyChanges();
    $scope.$card.remove();
  }
}
