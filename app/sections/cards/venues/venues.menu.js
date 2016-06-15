angular
  .module('adminNext.venues')
  .run(venuesMenuLinks);



venuesMenuLinks.$inject = ['navMenuService'];
function venuesMenuLinks(navMenuService) {
  navMenuService.addMainLinks([
    {
      label: 'Venues',
      url: 'venues',
      icon: 'venue',
      scope: 'organizations'
    },
    {
      label: 'Venue',
      url: 'venues/:venuesId',
      icon: 'venue',
      scope: 'venues'
    }
  ]);


  navMenuService.addSearchLinks([
    {
      sub: 'list',
      label: 'Venues',
      url: 'venues',
      icon: 'view_list',
      scope: 'organizations'
    },
    {
      sub: 'create',
      label: 'Venues',
      url: 'organiations/:organizationsId/venues/create',
      icon: 'add',
      scope: 'organizations'
    },
    {
      sub: 'edit',
      label: 'Venue',
      url: 'venues/:venuesId',
      icon: 'edit',
      scope: 'venues'
    }
  ]);
}
