angular
  .module('adminNext')
  .factory('navMenuService', navMenuService);

var ICONS_BY_TYPE = {organizations: 'organization', venues: 'venue', locations: 'location'}
var SCOPE_RANKING = ['admin', 'organizations', 'venues', 'locations', 'menus', 'menuItems'];


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
    links.forEach(function (item) {
      item.scopeRank = getScopeRanking(item.scope);
      item.requiredIds = getRequiredIds(item.url);
    });
    mainLinks = mainLinks.concat(links);
  }

  function addSearchLinks(links) {
    if (typeof links !== 'object' || links === null || (links instanceof Array && links.length === 0)) {
      return;
    }
    links.forEach(function (item) {
      item.scopeRank = getScopeRanking(item.scope);
      item.requiredIds = getRequiredIds(item.url);
    });
    searchLinks = searchLinks.concat(links);
  }




  function getRequiredIds(url) {
    return url.split('/').filter(function (peice) {
      return peice.indexOf(':') === 0;
    }).map(function (peice) {
      return peice.replace(':', '');
    });
  }






  function getDefaultMenu() {
    return filterLinks(mainLinks);
  }


  function filterLinks(links) {
    var filtered = [];
    var userInfo = authService.getPayload() || {};
    var userScopeRank = getScopeRanking(userInfo.scope);
    var ids = userInfo.ids;

    if (userScopeRank === -1) { return []; }

    return links.filter(function (item) {
      return item.scopeRank >= userScopeRank && hasRequiredIds(item.requiredIds, ids);
    }).map(function (item) {
      return {
        label: item.label,
        sub: item.sub,
        icon: item.icon,
        url: buildLinkUrl(item, ids)
      };
    });
  }

  function hasRequiredIds(requiredIds, ids) {
    var i = 0;
    var length = requiredIds.length;
    if (length === 0) { return true; }

    while (i < length) {
      if (ids[requiredIds[i]] === undefined || ids[requiredIds[i]] === '') { return false; }
      i += 1;
    }

    return true;
  }

  function getScopeRanking(scope) {
    return SCOPE_RANKING.indexOf(scope);
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
    return filterBy(filterLinks(searchLinks), searchTerm);
  }


  function getSearchableMenu(searchTerm, callback) {
    var localSercahble = getLocalSerchableMenu(searchTerm);

    sendSearchDebounced(searchTerm, function (data){
      var foundMenu = [];

      Object.keys(data).forEach(function (type) {
        var linkGroup = {
          label: type,
          icon: getIconFromType(type),
          links: []
        };

        Object.keys(data[type]).forEach(function (uuid) {
          console.log(linkGroup);
          linkGroup.links.push({
            label: data[type][uuid],
            sub: type,
            icon: 'search',
            url: type + '/' + uuid
          });
        });

        foundMenu.push(linkGroup);
      });

      callback(localSercahble.concat(foundMenu));
    });

    callback(localSercahble);
  }

  function getIconFromType(type) {
    return ICONS_BY_TYPE[type];
  }

  function sendSearch(searchTerm, callback) {
    if (searchTerm === undefined || searchTerm === '' || searchTerm.length < 3) { return; }
    requester.post('/api/search', {term: searchTerm}, function (error, response) {
      callback(response);
    });
  }
}
