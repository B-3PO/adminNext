angular
  .module('adminNext')
  .factory('scopeIds', scopeIdsService);


scopeIdsService.$inject = ['$rootScope', '$routeParams', '$location', 'authService'];
function scopeIdsService($rootScope, $routeParams, $location, authService) {
  var _userIds = authService.getPayload();
  var ids = angular.copy($routeParams || {});
  ids.organizationsId = ids.organizationsId || _userIds.ids.organizationsId || undefined;
  ids.venuesId = ids.venuesId || _userIds.ids.venuesId || undefined;

  $rootScope.$on('$routeChangeStart', function(event, next) {
    var user = authService.getPayload() || {ids:{}};
    ids = angular.copy(next.params || {});
    ids.organizationsId = ids.organizationsId || user.ids.organizationsId || undefined;
    ids.venuesId = ids.venuesId || user.ids.venuesId || undefined;
  });

  var service = {
    get: get
  };
  return service;

  function get() {
    return angular.copy(ids);
  }

}
