angular
  .module('adminNext.menuItems')
  .controller('MenuItemsCreateController', MenuItemsCreateController);


MenuItemsCreateController.$inject = ['$scope', '$brExpansionCardManager', 'organizationsService', 'categoriesId'];
function MenuItemsCreateController($scope, $brExpansionCardManager, organizationsService, categoriesId) {
  var vm = this;

  organizationsService.registerScope($scope, [vm]);
  organizationsService.bind(vm, 'category', 'categories', categoriesId);
  organizationsService.get();

  vm.menuItem = {
    name: '',
    price: 0,
    description: ''
  };

  vm.save = save;
  vm.cancel = cancel;


  function save() {
    var newMenuItem = angular.copy(vm.menuItem);
    vm.category.menuItems.push(newMenuItem);
    organizationsService.applyChanges();
    $brExpansionCardManager('cardManager').add('menuItemsEdit', {categoriesId: categoriesId, menuItemsId: newMenuItem.id});
    $scope.$card.remove();
  }

  function cancel() {
    $scope.$card.remove();
  }
}
