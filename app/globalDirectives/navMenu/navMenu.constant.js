angular
  .module('adminNext')
  .constant('NAV_MENU_ITEMS', {
    admin: [
      {
        label: 'Organizations',
        url: 'organizations',
      },
      {
        label: 'Venues',
        url: 'venues'
      },
      {
        label: 'Locations',
        url: 'locations'
      }
    ],

    organizationScoped: [
      {
        label: 'Organization',
        url: 'organizations/:organizationId',
        organizationId: true
      },
      {
        label: 'Venues',
        url: 'organizations/:organizationId/venues',
        organizationId: true
      },
      {
        label: 'Locations',
        url: 'location'
      }
    ],

    venueScoped: [
      {
        label: 'Venue',
        url: 'venues/:venueId',
        venueId: true
      },
      {
        label: 'Locations',
        url: 'veneus/:venueId/locations',
        venueId: true
      }
    ]
  })
  .constant('NAV_MENU_SEARCH_ITEMS', [
    {
      action: 'Create',
      label: 'Organization',
      url: 'organizations/create',
      icon: 'add',
      admin: true,
      venueId: false
    },
    {
      action: 'Create',
      label: 'Venue',
      url: 'organizations/:organizationId/venues/create',
      icon: 'add',
      admin: true,
      organizationId: true,
      venueId: false
    },
    {
      action: 'Create',
      label: 'Location',
      url: 'venues/:venueId/locations/create',
      icon: 'add',
      venueId: true
    },


    {
      action: 'Edit',
      label: 'Organization',
      url: 'organizations/:organizationId',
      icon: 'edit',
      organizationId: true,
      venueId: false
    },
    {
      action: 'Edit',
      label: 'Venue',
      url: 'venues/:venueId',
      icon: 'edit',
      venueId: true
    },
    {
      action: 'Edit',
      label: 'Location',
      url: 'locations/:locationId',
      icon: 'edit',
      venueId: true,
      locationId: true
    },


    {
      action: 'List',
      label: 'Organization',
      url: 'organizations',
      icon: 'dehaze',
      admin: true,
      venueId: false,
      organizationId: false
    },
    {
      action: 'List',
      label: 'Venue',
      url: 'organizations/:organizationId/venues',
      icon: 'dehaze',
      organizationId: true,
      venueId: false
    },
    {
      action: 'List',
      label: 'Location',
      url: 'venues/:venueId/locations',
      icon: 'dehaze',
      venueId: true
    }
  ]);
