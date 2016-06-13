angular
  .module('adminNext')
  .controller('LoginController', LoginController);


LoginController.$inject = ['authService', '$brSideContent', '$brExpansionCardManager'];
function LoginController(authService, $brSideContent, $brExpansionCardManager) {
  var vm = this;

  vm.errorMessage = '';
  vm.user = {
    email: '',
    password: ''
  };

  vm.login = login;


  $brSideContent('navMenuSideContent').hide();
  $brExpansionCardManager('cardManager').removeAll();



  function login () {
    authService.login(vm.user, function (error) {
      if (error !== undefined) {
        vm.errorMessage = 'Incorrect email or password entered';
      }
    });
  }
}
