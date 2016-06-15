angular
  .module('adminNext.venues')
  .run(venuesRegisterCards);


venuesRegisterCards.$inject = ['$brExpansionCardManager'];
function venuesRegisterCards($brExpansionCardManager) {
  $brExpansionCardManager().waitFor('cardManager').then(function (instance) {
    instance.register({
      componentId: 'venuesList',
      templateUrl: 'sections/cards/venues/list/venuesList.html',
      controller: 'VenuesListController',
      controllerAs: 'vm'
    });

    instance.register({
      componentId: 'venuesCreate',
      templateUrl: 'sections/cards/venues/create/venuesCreate.html',
      controller: 'VenuesCreateController',
      controllerAs: 'vm'
    });

    instance.register({
      componentId: 'venuesEdit',
      templateUrl: 'sections/cards/venues/edit/venuesEdit.html',
      controller: 'VenuesEditController',
      controllerAs: 'vm'
    });
  });
}
