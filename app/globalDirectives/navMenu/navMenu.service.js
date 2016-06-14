angular
  .module('adminNext')
  .factory('navMenuService', navMenuService);


navMenuService.inject = ['authService', 'requester', '$filter', '$brUtil'];
function navMenuService(authService, requester, $filter, $brUtil) {
  var filterBy = $filter('filter');
  var sendSearchDebounced = $brUtil.debounce(sendSearch, 300);
  var mainLinks = [];
  var searchLinks = [];
  var service = {
    getMenu: getMenu,
    addMainLinks: addMainLinks,
    addSearchLinks: addSearchLinks
  };
  return service;



  function getMenu(searchTerm, callback) {

    if (searchTerm === undefined || searchTerm === '') {
      callback(getDefaultMenu());
    } else {
      getSearchableMenu(searchTerm, callback);
    }
  }


  function addMainLinks(links) {
    if (typeof links !== 'object' || links === null || (links instanceof Array && links.length === 0)) {
      return;
    }

    mainLinks = mainLinks.concat(links);
  }

  function addSearchLinks(links) {
    if (typeof links !== 'object' || links === null || (links instanceof Array && links.length === 0)) {
      return;
    }

    searchLinks = searchLinks.concat(links);
  }


  function getDefaultMenu() {
    return filterLinks(mainLinks);
  }

  function filterLinks(links) {
    var filtered = [];
    var userInfo = authService.getPayload() || {};
    var admin = userInfo.admin;
    var ids = {
      organizationId: userInfo.organization_id || undefined,
      venueId: userInfo.venue_id || undefined
    };

    return links.filter(function (item) {
      if (item.admin === true && admin !== true) { return false; }
      if (item.organizationId === true && ids.organizationId === undefined) { return false; }
      if (item.organizationId === false && ids.organizationId !== undefined) { return false; }
      if (item.venueId === true && ids.venueId === undefined) { return false; }
      if (item.venueId === false && ids.venueId !== undefined) { return false; }

      return true;
    }).map(function (item) {
      return {
        label: item.label,
        action: item.action,
        icon: item.icon,
        url: buildLinkUrl(item, ids)
      };
    });
  }

  function buildLinkUrl(item, ids) {
    var id;

    return item.url.split('/').reduce(function (a, peice) {
      if (peice.indexOf(':') === 0) {
        id = ids[peice.replace(':', '')];
        return id ? a + '/' + id : a;
      } else {
        return a + '/' + peice;
      }
    }, '').slice(1);
  }


  function getLocalSerchableMenu(searchTerm) {
    return filterLinks(filterBy(searchLinks, searchTerm));
  }


  function getSearchableMenu(searchTerm, callback) {
    var userInfo = authService.getPayload() || {};
    var admin = userInfo.admin;
    var ids = {
      organizationId: userInfo.organization_id || undefined,
      venueId: userInfo.venue_id || undefined
    };

    var localSercahble = getLocalSerchableMenu(searchTerm);

    sendSearchDebounced(searchTerm, function (data){
      var foundMenu = [];

      Object.keys(data).forEach(function (type) {
        Object.keys(data[type]).forEach(function (uuid) {

          // TODO make into filter
          if (type === 'organizations' && ids.venueId !== undefined) { return; }
          
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

  function sendSearch(searchTerm, callback) {
    if (searchTerm === undefined || searchTerm === '' || searchTerm.length < 3) { return; }
    requester.post('/api/search', {term: searchTerm}, function (error, response) {
      callback(response);
    });
  }
}
