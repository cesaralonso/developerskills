

angular
  .module('app')
  .controller('AllUsersController', ['$scope', 'AuthService', '$state', 'Reviewers',
      function($scope, AuthService, $state, Reviewers) {

          $scope.users = [];

          Reviewers.find()
            .$promise
            .then(function(users){
                $scope.users = users;
            });

  }]);
