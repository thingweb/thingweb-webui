angular.module("wot").factory('ThingClient',['$http',
  function ThingClientFactory($http) {
    var ThingClient = {};

    ThingClient.readProperty = function readProperty(thing,property) {
      return $http.get(thing.uri + "/" + property.name)
       .then(function(res) {return res.data.value})
       .then(function applyNewValue(value) {
         property.value = value;
       })
    }

    ThingClient.writeProperty = function writeProperty(thing,property) {
      return $http.put(thing.uri + "/" + property.name, {"value" : property.value})
    }

    ThingClient.callAction = function callAction(thing,action,param) {
      return $http.post(thing.uri + "/" + action.name, {"value" : param})
    }

    return ThingClient;
  }
]);
