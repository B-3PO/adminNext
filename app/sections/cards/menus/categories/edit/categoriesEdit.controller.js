angular
  .module('adminNext.menus')
  .controller('CategoriesEditController', CategoriesEditController);


CategoriesEditController.$inject = ['$scope', '$brExpansionCardManager', 'organizationsService', 'watchForEdit', 'menusId', 'categoriesId'];
function CategoriesEditController($scope, $brExpansionCardManager, organizationsService, watchForEdit, menusId, categoriesId) {
  var vm = this;

  organizationsService.registerScope($scope, [vm]);
  organizationsService.bind(vm, 'menu', 'menus', menusId);
  organizationsService.bind(vm, 'category', 'categories', categoriesId);
  organizationsService.get();


  function checkChanges() {
    vm.edited = false;
    watchForEdit.watch(vm, 'category', $scope, function () {
      vm.edited = true;
    });
  }
  checkChanges();

  vm.types = [
    'food',
    'beverage',
    'alcohol',
    'merchandise'
  ];

  vm.save = save;
  vm.cancel = cancel;


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
}
