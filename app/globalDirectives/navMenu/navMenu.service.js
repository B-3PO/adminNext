angular
  .module('adminNext')
  .factory('navMenuService', navMenuService);


navMenuService.inject = ['authService', 'requester', 'NAV_MENU_ITEMS', 'NAV_MENU_SEARCH_ITEMS', '$filter', '$brUtil'];
function navMenuService(authService, requester, NAV_MENU_ITEMS, NAV_MENU_SEARCH_ITEMS, $filter, $brUtil) {
  var filterBy = $filter('filter');
  var sendSearchDebounced = $brUtil.debounce(sendSearch, 300);
  var service = {
    getMenu: getMenu
  };
  return service;



  function getMenu(searchTerm, callback) {

    if (searchTerm === undefined || searchTerm === '') {
      callback(getDefaultMenu());
    } else {
      getSearchableMenu(searchTerm, callback);
    }
  }



  function getDefaultMenu() {
    var menu = [];
    var userInfo = authService.getPayload() || {};
    var admin = userInfo.admin;
    var organizationId = userInfo.organization_id || undefined;
    var venueId = userInfo.venue_id || undefined;

    if (admin === true && organizationId === undefined && venueId === undefined) {
      menu = NAV_MENU_ITEMS.admin;
    } else if (organizationId !== undefined && venueId === undefined) {
      menu = NAV_MENU_ITEMS.organizationScoped.map(function (item) {
        return {
          label: item.label,
          icon: item.icon,
          url: buildItemUrl(item, organizationId)
        };
      });
    } else if (venueId !== undefined) {
      menu = NAV_MENU_ITEMS.venueScoped.map(function (item) {
        return {
          label: item.label,
          icon: item.icon,
          url: buildItemUrl(item, undefined, venueId)
        };
      });
    }

    return menu;
  }


  function getSearchableMenu(searchTerm, callback) {
    var localSercahble = getLocalSerchableMenu(searchTerm);

    sendSearchDebounced(searchTerm, function (data){
      var foundMenu = [];

      Object.keys(data).forEach(function (type) {
        Object.keys(data[type]).forEach(function (uuid) {
          foundMenu.push({
            label: data[type][uuid],
            action: type,
            icon: 'search',
            url: type + '/' + uuid
          });
        });
      });

      callback(localSercahble.concat(foundMenu));
    });

    callback(localSercahble);
  }


  function getLocalSerchableMenu(searchTerm) {
    var menu = [];
    var userInfo = authService.getPayload() || {};
    var admin = userInfo.admin;
    var organizationId = userInfo.organization_id || undefined;
    var venueId = userInfo.venue_id || undefined;

    menu = filterBy(NAV_MENU_SEARCH_ITEMS, searchTerm).filter(function (item) {
      if (item.admin === true && admin !== true) { return false; }
      if (item.organizationId === true && organizationId === undefined) { return false; }
      if (item.organizationId === false && organizationId !== undefined) { return false; }
      if (item.venueId === true && venueId === undefined) { return false; }
      if (item.venueId === false && venueId !== undefined) { return false; }
      return true;
    }).map(function (item) {
      return {
        label: item.label,
        action: item.action,
        icon: item.icon,
        url: buildItemUrl(item, organizationId, venueId)
      };
    });



    if (searchTerm !== undefined && searchTerm.length > 2) {
      sendSearchDebounced(searchTerm);
    }

    return menu;
  }

  function sendSearch(searchTerm, callback) {
    if (searchTerm === undefined || searchTerm === '' || searchTerm.length < 3) { return; }
    requester.post('/api/search', {term: searchTerm}, function (error, response) {
      callback(response);
    });
  }

  function buildItemUrl(item, organizationId, venueId) {
    var id;
    var ids = {
      organizationId: organizationId,
      venueId: venueId
    };

    var url = item.url.split('/').reduce(function (a, peice) {
      if (peice.indexOf(':') === 0) {
        id = ids[peice.replace(':', '')];
        return id ? a + '/' + id : a;
      } else {
        return a + '/' + peice;
      }
    }, '').slice(1);

    return url;
  }
}
