angular
  .module('adminNext.menuItems')
  .run(menuItemsRegisterCards);


menuItemsRegisterCards.$inject = ['$brExpansionCardManager'];
function menuItemsRegisterCards($brExpansionCardManager) {
  $brExpansionCardManager().waitFor('cardManager').then(function (instance) {
    instance.register({
      componentId: 'menuItemsList',
      templateUrl: 'sections/cards/menuItems/list/menuItemsList.html',
      controller: 'MenuItemsListController',
      controllerAs: 'vm'
    });

    instance.register({
      componentId: 'menuItemsCreate',
      templateUrl: 'sections/cards/menuItems/create/menuItemsCreate.html',
      controller: 'MenuItemsCreateController',
      controllerAs: 'vm'
    });

    instance.register({
      componentId: 'menuItemsEdit',
      templateUrl: 'sections/cards/menuItems/edit/menuItemsEdit.html',
      controller: 'MenuItemsEditController',
      controllerAs: 'vm'
    });


    instance.register({
      componentId: 'modifiersCreate',
      templateUrl: 'sections/cards/menuItems/modifiers/create/modifiersCreate.html',
      controller: 'ModifiersCreateController',
      controllerAs: 'vm'
    });


    instance.register({
      componentId: 'modifiersEdit',
      templateUrl: 'sections/cards/menuItems/modifiers/edit/modifiersEdit.html',
      controller: 'ModifiersEditController',
      controllerAs: 'vm'
    });


    instance.register({
      componentId: 'modifierOptionsEdit',
      templateUrl: 'sections/cards/menuItems/modifierOptions/edit/modifierOptionsEdit.html',
      controller: 'ModifierOptionsEditController',
      controllerAs: 'vm'
    });

    instance.register({
      componentId: 'modifierOptionsCreate',
      templateUrl: 'sections/cards/menuItems/modifierOptions/create/modifierOptionsCreate.html',
      controller: 'ModifierOptionsCreateController',
      controllerAs: 'vm'
    });


    instance.register({
      componentId: 'modifiersSelect',
      templateUrl: 'sections/cards/menuItems/modifiers/select/modifiersSelect.html',
      controller: 'ModifiersSelectController',
      controllerAs: 'vm'
    });
  });
}
