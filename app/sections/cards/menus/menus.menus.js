angular
  .module('adminNext.menus')
  .run(menuLinks);



menuLinks.$inject = ['navMenuService'];
function menuLinks(navMenuService) {
  navMenuService.addMainLinks([
    {
      label: 'Menus',
      url: 'menus',
      icon: 'menu',
      scope: 'venues'
    },
    {
      label: 'Menu',
      url: 'menus/:menusId',
      icon: 'menu',
      scope: 'venues'
    }
  ]);


  navMenuService.addSearchLinks([
    {
      sub: 'list',
      label: 'Menus',
      url: 'menus',
      icon: 'view_list',
      scope: 'venues'
    },

    {
      sub: 'create',
      label: 'Menus Org',
      url: 'organizations/:organizationsId/menus/create',
      icon: 'add',
      scope: 'organizations'
    },
    {
      sub: 'create',
      label: 'Menus Ven',
      url: 'venues/:venueId/menus/create',
      icon: 'add',
      scope: 'venues'
    },

    {
      sub: 'edit',
      label: 'Menus Org',
      url: 'organizations/:organizationsId/menus/:menusId',
      icon: 'edit',
      scope: 'organizations'
    },

    {
      sub: 'edit',
      label: 'Menus Ven',
      url: 'venues/:venuesId/menus/:menusId',
      icon: 'edit',
      scope: 'venues'
    }
  ]);
}
