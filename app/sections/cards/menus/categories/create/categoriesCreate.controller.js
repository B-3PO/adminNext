angular
  .module('adminNext.menus')
  .controller('CategoriesCreateController', CategoriesCreateController);


CategoriesCreateController.$inject = ['$scope', '$brExpansionCardManager', 'organizationsService', 'menusId'];
function CategoriesCreateController($scope, $brExpansionCardManager, organizationsService, menusId) {
  var vm = this;

  organizationsService.registerScope($scope, [vm]);
  organizationsService.bind(vm, 'menu', 'menus', menusId);
  organizationsService.get();

  vm.types = [
    'food',
    'beverage',
    'alcohol',
    'merchandise'
  ];
  vm.category = {
    name: '',
    type: ''
  };
  vm.save = save;
  vm.cancel = cancel;


  function save() {
    vm.menu.categories.push(angular.copy(vm.category));
    organizationsService.applyChanges();
    $scope.$card.remove();
  }

  function cancel() {
    $scope.$card.remove();
  }
}
