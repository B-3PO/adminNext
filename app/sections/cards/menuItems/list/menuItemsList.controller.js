angular
  .module('adminNext.menuItems')
  .controller('MenuItemsListController', MenuItemsListController);


MenuItemsListController.$inject = ['$scope', '$brExpansionCardManager', 'organizationsService', 'menusId'];
function MenuItemsListController($scope, $brExpansionCardManager, organizationsService, menusId) {
  var vm = this;

  organizationsService.registerScope($scope, [vm]);
  organizationsService.bind(vm, 'menu', 'menus', menusId);
  organizationsService.get();


  vm.createMenuItem = createMenuItem;
  vm.editMenuItem = editMenuItem;


  function createMenuItem() {
    $brExpansionCardManager('cardManager').add('menuItemsCreate', {menusId: menusId});
  }

  function editMenuItem(id) {
    $brExpansionCardManager('cardManager').add('menuItemsEdit', {menusId: menusId, menuItemsId: id});
  }
}
