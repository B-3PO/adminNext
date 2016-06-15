angular
  .module('adminNext.locations')
  .run(locationsRegisterCards);


locationsRegisterCards.$inject = ['$brExpansionCardManager'];
function locationsRegisterCards($brExpansionCardManager) {
  $brExpansionCardManager().waitFor('cardManager').then(function (instance) {
    instance.register({
      componentId: 'locationsList',
      templateUrl: 'sections/cards/locations/list/locationsList.html',
      controller: 'LocationsListController',
      controllerAs: 'vm'
    });

    instance.register({
      componentId: 'locationsCreate',
      templateUrl: 'sections/cards/locations/create/locationsCreate.html',
      controller: 'LocationsCreateController',
      controllerAs: 'vm'
    });

    instance.register({
      componentId: 'locationsEdit',
      templateUrl: 'sections/cards/locations/edit/locationsEdit.html',
      controller: 'LocationsEditController',
      controllerAs: 'vm'
    });
  });
}
