angular
  .module('adminNext.menuItems')
  .controller('ModifiersSelectController', ModifiersSelectController);


ModifiersSelectController.$inject = ['$scope', '$brExpansionCardManager', 'organizationsService', 'menuItemsId'];
function ModifiersSelectController($scope, $brExpansionCardManager, organizationsService, menuItemsId) {
  var vm = this;

  organizationsService.registerScope($scope, [vm]);
  organizationsService.bind(vm, 'modifiersList', 'modifiers');
  organizationsService.bind(vm, 'menuItem', 'menuItems', menuItemsId);
  organizationsService.get();

  vm.close = close;
  vm.add = add;
  vm.createModifier = createModifier;
  vm.editModifier = editModifier;


  function add(modifier) {
    vm.menuItem.modifiers.push(modifier);
    organizationsService.applyChanges();
    $scope.$card.remove();
  }

  function close() {
    $scope.$card.remove();
  }


  function createModifier() {
    $scope.$card.remove();
    $brExpansionCardManager('cardManager').add('modifiersCreate', {menuItemsId: menuItemsId});
  }

  function editModifier(id) {
    $brExpansionCardManager('cardManager').add('modifiersEdit', {modifiersId: id});
  }
}
