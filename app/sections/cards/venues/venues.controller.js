angular
  .module('adminNext')
  .controller('VenuesController', VenuesController);


VenuesController.$inject = ['$brExpansionCardManager', 'venuesCreate', 'organizationScope', 'scopeIds'];
function VenuesController($brExpansionCardManager, venuesCreate, organizationScope, scopeIds) {
  var vm = this;
  var ids = scopeIds.get();
  var organizationsId = ids.organizationsId;
  var venuesId = ids.venuesId;

  var cardManager = $brExpansionCardManager('cardManager');
  cardManager.removeAll();

  if (organizationScope === false) {
    if (venuesCreate === true && organizationsId !== undefined) {
      cardManager.add('venuesCreate', {organizationsId: organizationsId});
    } else if (venuesCreate === false && venuesId !== undefined) {
        cardManager.add('venuesEdit', {venuesId: venuesId, organizationsId: organizationsId});
    } else if (venuesCreate === false && organizationsId !== undefined) {
      cardManager.add('venuesList', {organizationsId: organizationsId});
    } else {
      cardManager.add('venuesList', {organizationsId: undefined});
    }

  } else if (organizationsId !== undefined) {
    cardManager.add('organizationsEdit', {organizationsId: organizationsId}, true);

    if (venuesCreate === true && organizationsId !== undefined) {
      cardManager.add('venuesCreate', {organizationsId: organizationsId});
    } else if (venuesCreate === false && venuesId !== undefined) {
      cardManager.add('venuesEdit', {venuesId: venuesId, organizationsId: organizationsId});
    } else if (venuesCreate === false && organizationsId !== undefined) {
      cardManager.add('venuesList', {organizationsId: organizationsId});
    }
  }
}
