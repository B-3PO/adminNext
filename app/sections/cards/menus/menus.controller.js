angular
  .module('adminNext.menus')
  .controller('MenusController', MenusController);


MenusController.$inject = ['$brExpansionCardManager', 'menusCreate', 'scopeIds'];
function MenusController($brExpansionCardManager, menusCreate, scopeIds) {
  var vm = this;
  var ids = scopeIds.get();
  var organizationsId = ids.organizationsId;
  var venuesId = ids.venuesId;
  var locationsId = ids.locationsId;
  var menusId = ids.menusId;
  var parentId = locationsId || venuesId || organizationsId;
  var parentType = locationsId ? 'locations' : venuesId ? 'venues' : organizationsId ? 'organizations' : undefined;

  var cardManager = $brExpansionCardManager('cardManager');
  cardManager.removeAll();

  if (menusCreate === true) {
    if (parentId !== undefined) {
      cardManager.add('menusCreate', {parentId: parentId, parentType: parentType});
    } else {

    }
  } else {
    if (menusId !== undefined) {
      cardManager.add('menusEdit', {parentId: parentId, parentType: parentType, menusId: menusId});
    } else {
      cardManager.add('menusList', {parentId: parentId, parentType: parentType});
    }
  }
}
