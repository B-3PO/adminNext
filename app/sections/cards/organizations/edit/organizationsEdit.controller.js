angular
  .module('adminNext')
  .controller('OrganizationsEditController', OrganizationsEditController);


// TODO add ability to jump to locations list for organizations


OrganizationsEditController.$inject = ['$scope', '$brExpansionCardManager', '$timeout', 'organizationsService', 'organizationId'];
function OrganizationsEditController($scope, $brExpansionCardManager, $timeout, organizationsService, organizationId) {
  var vm = this;

  organizationsService.registerScope($scope, [vm]);
  organizationsService.bind(vm, 'organization', 'organizations', organizationId);
  organizationsService.get();


  vm.save = save;
  vm.createVenue = createVenue;
  vm.editVenue = editVenue;

  // temp fix becasue component is not registered yet
  $timeout(function () {
    $scope.$card.on('organizationChange', function (id) {
      organizationId = id;
      organizationsService.bind(vm, 'organization', 'organizations', organizationId);
      $scope.$card.flash();
    });
  }, 0);


  function save() {
    organizationsService.applyChanges();
    $scope.$card.remove();
  }

  function createVenue() {
    $brExpansionCardManager('cardManager').add('venuesCreate', {organizationId: organizationId, lockOrganization: false});
  }

  function editVenue(id) {
    $brExpansionCardManager('cardManager').add('venuesEdit', {venueId: id});
  }
}
