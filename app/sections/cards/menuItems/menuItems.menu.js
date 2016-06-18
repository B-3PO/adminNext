angular
  .module('adminNext.menuItems')
  .run(menuItemsLinks);



menuItemsLinks.$inject = ['navMenuService'];
function menuItemsLinks(navMenuService) {
  navMenuService.addSearchLinks([
    {
      sub: 'create',
      label: 'Menu Item',
      url: 'menus/:menusId/menuItems/create',
      icon: 'add',
      scope: 'venues'
    },
    {
      sub: 'edit',
      label: 'Menu Item',
      url: 'menus/:menusId/menuItems/:menuItemsId',
      icon: 'edit',
      scope: 'venues'
    }
  ]);
}
