angular
  .module('adminNext.menus')
  .controller('MenusCreateController', MenusCreateController);


MenusCreateController.$inject = ['$scope', '$brExpansionCardManager', 'organizationsService', 'parentId', 'parentType'];
function MenusCreateController($scope, $brExpansionCardManager, organizationsService, parentId, parentType) {
  var vm = this;

  organizationsService.registerScope($scope, [vm]);
  if (parentId !== undefined) {
    vm.ownerType = parentType;
    organizationsService.bind(vm, 'owner', parentType, parentId);
  }
  organizationsService.get();

  vm.types = [
    'full',
    'game',
    'preorder',
    'Merchandise'
  ];
  vm.menu = {
    name: '',
    type: ''
  };
  vm.save = save;
  vm.cancel = cancel;


  function save() {
    var newMenu = angular.copy(vm.menu);
    vm.owner.menus.push(newMenu);
    organizationsService.applyChanges();
    $scope.$card.remove();
    $brExpansionCardManager('cardManager').add('menusEdit', {parentId: parentId, parentType: parentType, menusId: newMenu.id});
  }

  function cancel() {
    $scope.$card.remove();
  }
}
