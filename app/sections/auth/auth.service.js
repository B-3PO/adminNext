angular
  .module('adminNext')
  .factory('authService', authService);



authService.$inject = ['requester', '$window', '$location', 'jwtHelper', '$brSideContent'];
function authService(requester, $window, $location, jwtHelper, $brSideContent) {
  var token;
  var tokenPayload;
  var onLoginFunc;
  var localStorage = window.localStorage;

  var service = {
    login: login,
    logout: logout,
    getToken: getToken,
    getPayload: getPayload,
    onLogin: onLogin
  };
  return service;



  function login(user, callback) {
    requester.post('auth/login', {email: user.email, password: user.password}, function (error, response) {
      if (error !== undefined) {
        callback(error.response);
        return;
      }

      setToken(response.token);
      $brSideContent('navMenuSideContent').show();
      onLoginFunc();
      $location.url('/');
    });
  }

  function logout() {
    clearToken();
    $location.url('login');
  }


  function getToken() {
    if (token === undefined) {
      token = localStorage.getItem('auth_token') || undefined;
    }

    // if token is invalid redirect to login page
    if (token === undefined || jwtHelper.getTokenExpirationDate(token)) {
      $location.url('login');
      return;
    }

    // if token is valid do not allow to acces login page
    if ($location.url() === '/login') {
      $location.url('/');
      return;
    }

    return token;
  }

  function getPayload() {
    getToken();

    if (token !== undefined && tokenPayload === undefined) {
      tokenPayload = jwtHelper.decodeToken(token);
    }

    return tokenPayload;
  }

  function onLogin(func) {
    onLoginFunc = func;
  }


  function setToken(_token) {
    token = _token;
    localStorage.setItem('auth_token', token);
  }

  function clearToken() {
    token = undefined;
    tokenPayload = undefined;
    localStorage.removeItem('auth_token');
  }
}
