angular
  .module('adminNext.menuItems')
  .controller('ModifierOptionsEditController', ModifierOptionsEditController);


ModifierOptionsEditController.$inject = ['$scope', '$brExpansionCardManager', 'organizationsService', 'watchForEdit', 'modifierOptionsId'];
function ModifierOptionsEditController($scope, $brExpansionCardManager, organizationsService, watchForEdit, modifierOptionsId) {
  var vm = this;

  organizationsService.registerScope($scope, [vm]);
  organizationsService.bind(vm, 'modifierOption', 'modifierOptions', modifierOptionsId);
  organizationsService.get();

  vm.save = save;
  vm.cancel = cancel;

  function checkChanges() {
    vm.edited = false;
    watchForEdit.watch(vm, 'modifierOption', $scope, function () {
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
}
