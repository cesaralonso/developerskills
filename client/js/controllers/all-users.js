

angular
  .module('app')
  .controller('AllUsersController', ['$scope', 'AuthService', '$state', 'User',
      function($scope, AuthService, $state, User) {

          $scope.users = [];

          User.find()
            .$promise
            .then(function(users){
                $scope.users = users;
            });

  }]);
