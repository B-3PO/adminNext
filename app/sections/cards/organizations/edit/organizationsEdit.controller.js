angular
  .module('adminNext.organizations')
  .controller('OrganizationsEditController', OrganizationsEditController);


// TODO add ability to jump to locations list for organizations


OrganizationsEditController.$inject = ['$scope', '$brExpansionCardManager', '$timeout', 'watchForEdit', 'organizationsService', 'organizationsId'];
function OrganizationsEditController($scope, $brExpansionCardManager, $timeout, watchForEdit, organizationsService, organizationsId) {
  var vm = this;

  organizationsService.registerScope($scope, [vm]);
  organizationsService.bind(vm, 'organization', 'organizations', organizationsId);
  organizationsService.get();

  vm.save = save;
  vm.cancel = cancel;
  vm.createVenue = createVenue;
  vm.editVenue = editVenue;

  function checkChanges() {
    vm.edited = false;
    watchForEdit.watch(vm, 'organization', $scope, function () {
      vm.edited = true;
    });
  }
  checkChanges();

  // temp fix becasue component is not registered yet
  $timeout(function () {
    $scope.$card.on('organizationChange', function (id) {
      organizationsId = id;
      organizationsService.bind(vm, 'organization', 'organizations', organizationsId);
      $scope.$card.flash();
    });
  }, 0);


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

  function createVenue() {
    $brExpansionCardManager('cardManager').add('venuesCreate', {organizationsId: organizationsId, lockOrganization: false});
  }

  function editVenue(id) {
    $brExpansionCardManager('cardManager').add('venuesEdit', {venuesId: id, organizationsId: organizationsId});
  }
}
