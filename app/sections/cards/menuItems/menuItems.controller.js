angular
  .module('adminNext.menuItems')
  .controller('MenuItemsController', MenuItemsController);


MenuItemsController.$inject = ['$brExpansionCardManager', 'menuItemsCreate', 'scopeIds'];
function MenuItemsController($brExpansionCardManager, menuItemsCreate, scopeIds) {
  var vm = this;
  var ids = scopeIds.get();
  var menusId = ids.menusId;
  var menuItemsId = ids.menuItemsId;

  var cardManager = $brExpansionCardManager('cardManager');
  cardManager.removeAll();

  if (menuItemsCreate === true) {
    if (menusId !== undefined) {
      cardManager.add('menuItemsCreate', {menusId: menusId});
    } else {

    }
  } else if (menuItemsId !== undefined) {
    cardManager.add('menuItemsEdit', {menusId: menusId, menuItemsId: menuItemsId});
  } else {
    cardManager.add('menuItemsList', {menusId: menusId});
  }
}
