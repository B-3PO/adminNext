angular
  .module('adminNext')
  .factory('organizationsService', organizationsService);



organizationsService.$inject = ['jsonApiManager'];
function organizationsService(jsonApiManager) {
  var organizationsManager = jsonApiManager.create({
    url: 'organizations',
    include: ['venues']
  }, function (error) {
    console.log(error);
  });

  var service = {
    get: organizationsManager.get,
    bind: organizationsManager.bind,
    registerScope: organizationsManager.registerScope,
    applyChanges: organizationsManager.applyChanges,
    removeChanges: organizationsManager.removeChanges
  };
  return service;
}
