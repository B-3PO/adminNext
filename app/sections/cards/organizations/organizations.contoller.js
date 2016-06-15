angular
  .module('adminNext')
  .controller('OrganizationsController', OrganizationsController);


OrganizationsController.$inject = ['$brExpansionCardManager', 'scopeIds', 'organizationCreate'];
function OrganizationsController($brExpansionCardManager, scopeIds, organizationCreate) {
  var vm = this;
  var organizationsId = scopeIds.get().organizationsId;

  var cardManager = $brExpansionCardManager('cardManager');
  cardManager.removeAll();


  if (organizationCreate === true) {
    cardManager.add('organizationsCreate');
  } else if (organizationsId) {
    cardManager.add('organizationsEdit', {organizationsId: organizationsId});
  } else {
    cardManager.add('organizationsList', {});
  }
}
