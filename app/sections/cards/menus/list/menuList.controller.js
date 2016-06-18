angular
  .module('adminNext.menus')
  .controller('MenusListController', MenusListController);


MenusListController.$inject = ['$scope', '$brExpansionCardManager', 'organizationsService', 'parentId', 'parentType'];
function MenusListController($scope, $brExpansionCardManager, organizationsService, parentId, parentType) {
  var vm = this;

  organizationsService.registerScope($scope, [vm]);
  if (parentId !== undefined) {
    vm.ownerType = parentType;
    organizationsService.bind(vm, 'owner', parentType, parentId);
  }
  organizationsService.get();


  vm.createMenu = createMenu;
  vm.editMenu = editMenu;
  vm.editVenues = editVenues;


  function createMenu() {
    $brExpansionCardManager('cardManager').add('menusCreate', {parentId: parentId, parentType: parentType});
  }

  function editMenu(id) {
    $brExpansionCardManager('cardManager').add('menusEdit', {parentId: parentId, parentType: parentType, menusId: id});
  }

  function editVenues(id) {
    $brExpansionCardManager('cardManager').add('menusVenuesEdit', {menusId: id, parentId: parentId, parentType: parentType});
  }
}
