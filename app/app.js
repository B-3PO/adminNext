angular
  .module('adminNext',
  [
    'ngRoute',
    'ngMessages',
    'ngAnimate',
    'angular-jwt',
    'brMaterial',
    'jsonApiManager',

    'adminNext.organizations',
    'adminNext.venues',
    'adminNext.locations',
    'adminNext.menus',
    'adminNext.menuItems'
  ])
  .config(configApp);




configApp.$inject = ['$routeProvider', 'jwtInterceptorProvider', '$httpProvider', 'jsonApiManagerProvider'];
function configApp($routeProvider, jwtInterceptorProvider, $httpProvider, jsonApiManagerProvider) {
  jwtInterceptorProvider.tokenGetter = ['authService', function(authService) {
    return authService.getToken();
  }];
  $httpProvider.interceptors.push('jwtInterceptor');

  jsonApiManagerProvider.baseUrl = 'api/';


  $routeProvider
    .when('/', {
      templateUrl: 'sections/home/home.html',
      controller: 'HomeController',
      controllerAs: 'vm'
    })
    .when('/login', {
      templateUrl: 'sections/auth/login/login.html',
      controller: 'LoginController',
      controllerAs: 'vm'
    })
    .when('/logout', {
      template: ' ',
      controller: 'LogoutController'
    })
    .otherwise('/');
}
