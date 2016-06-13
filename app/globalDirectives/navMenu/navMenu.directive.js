angular
  .module('adminNext')
  .directive('navMenu', navMenuDirective);


function navMenuDirective() {
  var directive = {
    restrict: 'E',
    templateUrl: 'globalDirectives/navMenu/navMenu.html',
    replace: true,
    controller: ['$rootScope', 'navMenuService', 'authService', controller],
    controllerAs: 'vm'
  };
  return directive;


  function controller($rootScope, navMenuService, authService) {
    /* jshint validthis: true */
    var vm = this;

    navMenuService.getMenu(undefined, function (data) {
      vm.menu = data;
    });
    vm.search = '';

    vm.searchChange = searchChange;

    authService.onLogin(function () {
      navMenuService.getMenu(undefined, function (data) {
        vm.menu = data;
      });
    });

    $rootScope.$on('$locationChangeSuccess', onLocationChange);
    function onLocationChange(event, newState) {
      vm.search = '';
      navMenuService.getMenu(undefined, function (data) {
        vm.menu = data;
      });
    }


    function searchChange() {
      navMenuService.getMenu(vm.search, function (data) {
        vm.menu = data;
      });
    }
  }
}
