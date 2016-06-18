angular
  .module('adminNext.menuItems')
  .controller('ModifiersCreateController', ModifiersCreateController);


ModifiersCreateController.$inject = ['$scope', '$brExpansionCardManager', 'organizationsService', 'menuItemsId'];
function ModifiersCreateController($scope, $brExpansionCardManager, organizationsService, menuItemsId) {
  var vm = this;

  organizationsService.registerScope($scope, [vm]);
  organizationsService.bind(vm, 'menuItem', 'menuItems', menuItemsId);
  organizationsService.get();


  vm.modifier = {
    name: ''
  };

  vm.save = save;
  vm.cancel = cancel;


  function save() {
    var newModifier = angular.copy(vm.modifier);
    vm.menuItem.modifiers.push(newModifier);
    organizationsService.applyChanges();
    $brExpansionCardManager('cardManager').add('modifiersEdit', {modifiersId: newModifier.id});
    $scope.$card.remove();
  }

  function cancel() {
    $scope.$card.remove();
  }
}
