
angular
  .module('app')
  .controller('AllReviewsController', ['$scope', 'Review', function($scope,
      Review) {
    $scope.reviews = Review.find({
      filter: {
        include: [
          'technology',
          'reviewer'
        ]
      }
    });
  }])
  .controller('AddReviewController', ['$scope', 'Technology', 'Review',
      '$state', function($scope, Technology, Review, $state) {
    $scope.action = 'Agregar';
    $scope.technologies = [];
    $scope.selectedTechnology;
    $scope.review = {};
    $scope.isDisabled = false;

    Technology
      .find()
      .$promise
      .then(function(technologies) {
        $scope.technologies = technologies;
        $scope.selectedTechnology = $scope.selectedTechnology || technologies[0];
      });

    $scope.submitForm = function() {
      Review
        .create({
          rating: $scope.review.rating,
          ratingEmpatia: $scope.review.ratingEmpatia,
          comments: $scope.review.comments,
          technologyId: $scope.selectedTechnology.id
        })
        .$promise
        .then(function() {
          $state.go('my-reviews');
        });
    };
  }])
  .controller('DeleteReviewController', ['$scope', 'Review', '$state',
      '$stateParams', function($scope, Review, $state, $stateParams) {
    Review
      .deleteById({ id: $stateParams.id })
      .$promise
      .then(function() {
        $state.go('my-reviews');
      });
  }])
  .controller('EditReviewController', ['$scope', '$q', 'Technology', 'Review',
      '$stateParams', '$state', function($scope, $q, Technology, Review,
      $stateParams, $state) {
    $scope.action = 'Editar';
    $scope.technologies = [];
    $scope.selectedTechnology;
    $scope.review = {};
    $scope.isDisabled = true;

    $q
      .all([
        Technology.find().$promise,
        Review.findById({ id: $stateParams.id }).$promise
      ])
      .then(function(data) {
        var technologies = $scope.technologies = data[0];
        $scope.review = data[1];
        $scope.selectedTechnology;

        var selectedTechnologyIndex = technologies
          .map(function(technology) {
            return technology.id;
          })
          .indexOf($scope.review.technologyId);
        $scope.selectedTechnology = technologies[selectedTechnologyIndex];
      });

    $scope.submitForm = function() {
      $scope.review.technologyId = $scope.selectedTechnology.id;
      $scope.review
        .$save()
        .then(function(review) {
          $state.go('my-reviews');
        });
    };
  }])
  .controller('MyReviewsController', ['$scope', 'Review',
      function($scope, Review) {
        // after a refresh, the currenUser is not immediately on the scope
        // So, we're watching it on the scope and load my reviews only then.
        $scope.$watch('currentUser.id', function(value) {
          if (!value) {
            return;
          }
          $scope.reviews = Review.find({
            filter: {
              where: {
                publisherId: $scope.currentUser.id
              },
              include: [
                'technology',
                'reviewer'
              ]
            }
          });
        });
  }]);
