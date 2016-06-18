angular
  .module('adminNext.menuItems')
  .controller('ModifierOptionsCreateController', ModifierOptionsCreateController);


ModifierOptionsCreateController.$inject = ['$scope', '$brExpansionCardManager', 'organizationsService', 'modifiersId'];
function ModifierOptionsCreateController($scope, $brExpansionCardManager, organizationsService, modifiersId) {
  var vm = this;

  organizationsService.registerScope($scope, [vm]);
  organizationsService.bind(vm, 'modifier', 'modifiers', modifiersId);
  organizationsService.get();


  vm.modifierOption = {
    name: '',
    price: 0
  };

  vm.save = save;
  vm.cancel = cancel;


  function save() {
    vm.modifier.modifierOptions.push(angular.copy(vm.modifierOption));
    organizationsService.applyChanges();
    $scope.$card.remove();
  }

  function cancel() {
    $scope.$card.remove();
  }
}
