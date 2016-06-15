angular
  .module('adminNext.locations')
  .controller('LocationsController', LocationsController);


LocationsController.$inject = ['$brExpansionCardManager', 'locationsCreate', 'scopeIds'];
function LocationsController($brExpansionCardManager, locationsCreate, scopeIds) {
  var vm = this;
  var ids = scopeIds.get();
  var organizationsId = ids.organizationsId;
  var venuesId = ids.venuesId;
  var locationsId = ids.locationsId;

  var cardManager = $brExpansionCardManager('cardManager');
  cardManager.removeAll();

  if (locationsCreate === true) {
    if (venuesId !== undefined) {
      cardManager.add('locationsCreate', {venuesId: venuesId, organizationsId: organizationsId});
    } else {
      cardManager.add('locationsList', {venuesId: venuesId, organizationsId: organizationsId});
    }
  } else {
    if (locationsId !== undefined) {
      cardManager.add('locationsEdit', {locationsId: locationsId});
    } else {
      cardManager.add('locationsList', {venuesId: venuesId, organizationsId: organizationsId});
    }
  }
}
