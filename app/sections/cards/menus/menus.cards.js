angular
  .module('adminNext.menus')
  .run(menusRegisterCards);


menusRegisterCards.$inject = ['$brExpansionCardManager'];
function menusRegisterCards($brExpansionCardManager) {
  $brExpansionCardManager().waitFor('cardManager').then(function (instance) {
    instance.register({
      componentId: 'menusList',
      templateUrl: 'sections/cards/menus/list/menusList.html',
      controller: 'MenusListController',
      controllerAs: 'vm'
    });

    instance.register({
      componentId: 'menusCreate',
      templateUrl: 'sections/cards/menus/create/menusCreate.html',
      controller: 'MenusCreateController',
      controllerAs: 'vm'
    });

    instance.register({
      componentId: 'menusEdit',
      templateUrl: 'sections/cards/menus/edit/menusEdit.html',
      controller: 'MenusEditController',
      controllerAs: 'vm'
    });

    instance.register({
      componentId: 'menusVenuesEdit',
      templateUrl: 'sections/cards/menus/venues/menusVenuesEdit.html',
      controller: 'MenusVenuesEditController',
      controllerAs: 'vm'
    });

    instance.register({
      componentId: 'categoriesCreate',
      templateUrl: 'sections/cards/menus/categories/create/categoriesCreate.html',
      controller: 'CategoriesCreateController',
      controllerAs: 'vm'
    });

    instance.register({
      componentId: 'categoriesEdit',
      templateUrl: 'sections/cards/menus/categories/edit/categoriesEdit.html',
      controller: 'CategoriesEditController',
      controllerAs: 'vm'
    });
  });
}
