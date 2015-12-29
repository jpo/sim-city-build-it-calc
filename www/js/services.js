angular.module('app.services', [])
  .factory('Resources', function () {
    var self = {};

    var _resources = function() {
      return angular.copy(DATA['RESOURCES']);
    }

    var _requirements = function() {
      return angular.copy(DATA['REQUIREMENTS']);
    }

    self.all = function() {
      return _resources();
    }

    self.allByCategory = function() {
      return self.groupByCategory(self.all());
    }

    self.get = function(id) {
      return self.all().find(function(resource) {
        return resource.id === id;
      });
    }

    self.getRequiredItems = function(resource) {
      var requiredItems = _requirements().filter(function(requiredItem) {
        return requiredItem.resourceId === resource.id;
      });

      return requiredItems.map(function(requiredItem) {
        var resource = self.get(requiredItem.requiredItemId);
        resource.quantity = requiredItem.quantity;
        return angular.copy(resource);
      });
    }

    self.getAllRequiredItems = function(resource) {
      var traverseRequiredItems = function(resource) {
        var results  = [];

        self.getRequiredItems(resource).forEach(function(requiredItem) {
          results = results.concat(traverseRequiredItems(requiredItem));
        });

        if (resource.quantity)
          results.push(resource);

        return results;
      }

      var requiredItems = traverseRequiredItems(resource);

      if (requiredItems.length === 0)
        return [resource];

      var results = requiredItems.reduce(function(prev, curr) {
        var existing = prev.find(function(p) { return p.id === curr.id });

        if (existing)
          existing.quantity += curr.quantity;
        else
          prev.push(angular.copy(curr))

        return prev;
      }, []);

      return angular.copy(results);
    }

    self.groupByCategory = function(resources) {
      return resources.reduce(function(prev, curr) {
        if (prev[curr.source])
          prev[curr.source].push(curr);
        else
          prev[curr.source] = [curr];
        return prev;
      }, {});
    }

    return self;
  });
