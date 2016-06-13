angular
  .module('adminNext')
  .controller('OrganizationsController', OrganizationsController);


OrganizationsController.$inject = ['$brExpansionCardManager', 'organizationId', 'organizationCreate'];
function OrganizationsController($brExpansionCardManager, organizationId, organizationCreate) {
  var vm = this;

  var cardManager = $brExpansionCardManager('cardManager');
  cardManager.removeAll();


  if (organizationCreate === true) {
    cardManager.add('organizationsCreate');
  } else if (organizationId !== false) {
    cardManager.add('organizationsEdit', {organizationId: organizationId});
  } else {
    cardManager.add('organizationsList');
  }
}
