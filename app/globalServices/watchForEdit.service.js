angular
  .module('adminNext')
  .factory('watchForEdit',  watchForEdit);




watchForEdit.$inject = ['$rootScope'];
function watchForEdit($rootScope) {
  var service = {
    watch: watch,
    watchDeep: watchDeep
  };
  return service;


  function watch(obj, property, scope) {
    var callback = arguments[arguments.length - 1];
    return makeWatcher(scope || $rootScope, obj, property, callback);
  }

  function watchDeep(obj, property, scope) {
    var callback = arguments[arguments.length - 1];
    return makeWatcher(scope || $rootScope, obj, property, callback, true);
  }


  function makeWatcher(scope, obj, property, callback, deep) {
    var killer = scope.$watch(function () { return obj[property]; },  function (newValue, oldValue) {
      if (oldValue !== undefined) {
        if ((deep === true && angular.equals(newValue, oldValue) === false) || compareShallow(newValue, oldValue) === false) {
          console.log(newValue, oldValue);
          if (typeof killer === 'function') { killer(); }
          if (typeof callback === 'function') { callback(); }
        }
      }
    }, true);
  }



  function compareShallow(newValue, oldValue) {
    var keys = Object.keys(newValue);
    var key = keys.pop();

    while (key !== undefined) {
      if (key !== '$$hashKey' && typeof newValue[key] !== 'object' && typeof newValue[key] !== 'function' && newValue[key] !== null) {
        if (newValue[key] !== oldValue[key]) {
          return false;
        }
      }

      key = keys.pop();
    }

    return true;
  }
}
