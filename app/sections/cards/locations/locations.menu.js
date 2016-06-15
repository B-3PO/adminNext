angular
  .module('adminNext.locations')
  .run(locationsMenuLinks);



locationsMenuLinks.$inject = ['navMenuService'];
function locationsMenuLinks(navMenuService) {
  navMenuService.addMainLinks([
    {
      label: 'Locations',
      url: 'locations',
      icon: 'location',
      scope: 'venues'
    },
    {
      label: 'Location',
      url: 'locations/:locationsId',
      icon: 'location',
      scope: 'locations'
    }
  ]);


  navMenuService.addSearchLinks([
    {
      sub: 'list',
      label: 'Locations',
      url: 'locations',
      icon: 'view_list',
      scope: 'venues'
    },
    {
      sub: 'create',
      label: 'Locations',
      url: 'venues/:venuesId/locations/create',
      icon: 'add',
      scope: 'venues'
    },
    {
      sub: 'edit',
      label: 'Location',
      url: 'locations/:locationsId',
      icon: 'edit',
      scope: 'locations'
    }
  ]);
}
