angular
  .module('adminNext.menuItems')
  .controller('ModifiersEditController', ModifiersEditController);


ModifiersEditController.$inject = ['$scope', '$brExpansionCardManager', 'organizationsService', 'watchForEdit', 'modifiersId'];
function ModifiersEditController($scope, $brExpansionCardManager, organizationsService, watchForEdit, modifiersId) {
  var vm = this;

  organizationsService.registerScope($scope, [vm]);
  organizationsService.bind(vm, 'modifier', 'modifiers', modifiersId);
  organizationsService.get();

  vm.save = save;
  vm.cancel = cancel;
  vm.editOption = editOption;
  vm.createOption = createOption;

  function checkChanges() {
    vm.edited = false;
    watchForEdit.watch(vm, 'modifier', $scope, function () {
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

  function editOption(id) {
    $brExpansionCardManager('cardManager').add('modifierOptionsEdit', {modifierOptionsId: id});
  }

  function createOption() {
    $brExpansionCardManager('cardManager').add('modifierOptionsCreate', {modifiersId: modifiersId});
  }
}
