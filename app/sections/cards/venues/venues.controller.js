angular
  .module('adminNext')
  .controller('VenuesController', VenuesController);


VenuesController.$inject = ['$brExpansionCardManager', 'organizationId', 'venueId', 'venuesCreate', 'organizationScope'];
function VenuesController($brExpansionCardManager, organizationId, venueId, venuesCreate, organizationScope) {
  var vm = this;

  var cardManager = $brExpansionCardManager('cardManager');
  cardManager.removeAll();

  if (organizationScope === false) {
    if (venuesCreate === true && organizationId !== false) {
      cardManager.add('venuesCreate', {organizationId: organizationId});
    } else if (venuesCreate === false && venueId !== false) {
        cardManager.add('venuesEdit', {venueId: venueId});
    } else if (venuesCreate === false && organizationId !== false) {
      cardManager.add('venuesList', {organizationId: organizationId});
    } else {
      cardManager.add('venuesList', {organizationId: false});
    }

  } else if (organizationId !== false) {
    cardManager.add('organizationsEdit', {organizationId: organizationId}, true);

    if (venuesCreate === true && organizationId !== false) {
      cardManager.add('venuesCreate', {organizationId: organizationId});
    } else if (venuesCreate === false && venueId !== false) {
      cardManager.add('venuesEdit', {venueId: venueId});
    } else if (venuesCreate === false && organizationId !== false) {
      cardManager.add('venuesList', {organizationId: organizationId});
    }
  }
}
