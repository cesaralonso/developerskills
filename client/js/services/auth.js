
angular
  .module('app')
  .factory('AuthService', ['Reviewer', '$q', '$rootScope', '$state', function(
      User, $q, $rootScope, $state) {
    function login(email, password) {
      return User
        .login({email: email, password: password})
        .$promise
        .then(function(response) {
          $rootScope.currentUser = {
            id: response.user.id,
            tokenId: response.id,
            email: email
          };
        });
    }

    function logout() {
      return User
       .logout()
       .$promise
       .then(function() {
         $rootScope.currentUser = null;
       });
    }

    function register(email, password, realm) {
      return User
        .create({
         email: email,
         password: password,
         realm: realm
       })
       .$promise;
    }

    function refresh(accessTokenId) {
      return User
        .getCurrent(function(userResource) {
          $rootScope.currentUser = {
            id: userResource.id,
            tokenId: accessTokenId,
            email: userResource.email
          };
        });
    }
    return {
      login: login,
      logout: logout,
      register: register,
      refresh: refresh
    };
  }]);
