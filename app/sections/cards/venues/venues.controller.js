angular
  .module('adminNext')
  .controller('VenuesController', VenuesController);


VenuesController.$inject = ['$brExpansionCardManager', 'organizationId', 'venueId', 'venuesCreate'];
function VenuesController($brExpansionCardManager, organizationId, venueId, venuesCreate) {
  var vm = this;

  var cardManager = $brExpansionCardManager('cardManager');
  cardManager.removeAll();

  if (venuesCreate === true && organizationId !== false) {
    cardManager.add('venuesCreate', {organizationId: organizationId});
  } else if (venuesCreate === false && organizationId !== false) {
    cardManager.add('venuesList', {organizationId: organizationId});
  } else if (venuesCreate === false && venueId !== false) {
    cardManager.add('venuesEdit', {venueId: venueId});
  }
}
