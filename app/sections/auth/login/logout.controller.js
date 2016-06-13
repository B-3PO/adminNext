angular
  .module('adminNext')
  .controller('LogoutController', LogoutController);


LogoutController.$inject = ['authService'];
function LogoutController(authService) {
  authService.logout();
}
