angular
  .module('adminNext.menuItems')
  .controller('MenuItemsEditController', MenuItemsEditController);


MenuItemsEditController.$inject = ['$scope', '$brExpansionCardManager', 'organizationsService', 'watchForEdit', 'categoriesId', 'menuItemsId'];
function MenuItemsEditController($scope, $brExpansionCardManager, organizationsService, watchForEdit, categoriesId, menuItemsId) {
  var vm = this;

  organizationsService.registerScope($scope, [vm]);
  organizationsService.bind(vm, 'category', 'categories', categoriesId);
  organizationsService.bind(vm, 'menuItem', 'menuItems', menuItemsId);
  organizationsService.get();

  vm.save = save;
  vm.cancel = cancel;
  vm.selectModifier = selectModifier;
  vm.editModifier = editModifier;

  function checkChanges() {
    vm.edited = false;
    watchForEdit.watch(vm, 'menuItem', $scope, function () {
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

  function selectModifier() {
    $brExpansionCardManager('cardManager').add('modifiersSelect', {menuItemsId: menuItemsId});
  }

  function editModifier(id) {
    $brExpansionCardManager('cardManager').add('modifiersEdit', {modifiersId: id});
  }
}
