angular
  .module('adminNext.organizations')
  .run(organizationsMenuLinks);


organizationsMenuLinks.$inject = ['navMenuService'];
function organizationsMenuLinks(navMenuService) {
  navMenuService.addMainLinks([
    {
      label: 'Organizations',
      url: 'organizations',
      icon: 'organization',
      scope: 'admin'
    },
    {
      label: 'Organization',
      url: 'organizations/:organizationsId',
      icon: 'organization',
      scope: 'organizations'
    }
  ]);


  navMenuService.addSearchLinks([
    {
      sub: 'View',
      label: 'Organizations',
      url: 'organizations',
      icon: 'view_list',
      scope: 'admin'
    },
    {
      sub: 'Create',
      label: 'Organizations',
      url: 'organizations/create',
      icon: 'add',
      scope: 'admin'
    },
    {
      sub: 'Edit',
      label: 'Organization',
      url: 'organizations/:organizationsId',
      icon: 'edit',
      scope: 'organizations'
    }
  ]);
}
