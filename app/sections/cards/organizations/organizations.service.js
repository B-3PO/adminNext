angular
  .module('adminNext')
  .factory('organizationsService', organizationsService);



organizationsService.$inject = ['jsonApiManager', 'authService', 'scopeIds'];
function organizationsService(jsonApiManager, authService, scopeIds) {
  var organizationsManager = jsonApiManager.create({
    url: 'organizations',
    include: ['venues.locations']
  }, function (error) {
    console.log(error);
  });

  var service = {
    get: get,
    bind: organizationsManager.bind,
    registerScope: organizationsManager.registerScope,
    applyChanges: organizationsManager.applyChanges,
    removeChanges: organizationsManager.removeChanges
  };
  return service;


  function get(callback) {
    var userInfo = authService.getPayload() || {};
    var organizationId = scopeIds.get().organizationsId || userInfo.ids.organizationsId || undefined;

    if (organizationId !== undefined) {
      organizationsManager.getById(organizationId, callback);
    } else {
      organizationsManager.get(callback);
    }
  }
}
