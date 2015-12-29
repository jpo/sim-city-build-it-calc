angular.module('app.controllers', [])
  .controller('CalculatorCtrl', function ($scope, $ionicScrollDelegate, Resources) {
    $scope.resources = Resources.allByCategory();

    $scope.toggleResources = function() {
      for (var category in $scope.resources) {
        $scope.resources[category].forEach(function(resource) {
          if (resource.quantity > 0)
            resource.hidden = false;
          else
            resource.hidden = resource.hidden === true ? false : true;
        });
      }

      $ionicScrollDelegate.scrollTop();
    }

    $scope.clearQuantities = function() {
      for (var category in $scope.resources) {
        $scope.resources[category].forEach(function(resource) {
          resource.quantity = 0;
          resource.hidden = false;
        });
      }
    };

    $scope.increaseQuantity = function(resource) {
      var requiredItems = Resources.getAllRequiredItems(resource);

      requiredItems.forEach(function(requiredItem) {
        for (var category in $scope.resources) {
          $scope.resources[category].forEach(function(r) {
            if (r.id != resource.id && r.id === requiredItem.id) {
              if (r.quantity > 0)
                r.quantity += requiredItem.quantity;
              else
                r.quantity = requiredItem.quantity;
            }
          });
        }
      });

      if (resource.quantity > 0)
        resource.quantity += 1;
      else
        resource.quantity = 1;
    };

  });
