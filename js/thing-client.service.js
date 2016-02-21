angular.module("wot").factory('ThingClient',['$http',
  function ThingClientFactory($http) {
    var ThingClient = {};

    ThingClient.readProperty = function readProperty(thing,property) {
      if(thing.protocols['HTTP']) {
        $http.get(thing.protocols['HTTP'].uri + "/" + property.name)
         .then(function(res) {return res.data.value})
         .then(function applyNewValue(value) {
           property.value = value;
         })
         .catch(showError);
     } else if(thing.protocols['CoAP']) {
       CoAP.get(thing.protocols['HTTP'].uri + "/" + property.name)
        .then(function(res) {return res.data.value})
        .then(function applyNewValue(value) {
          property.value = value;
        })
        .catch(showError);
     }
    }

    ThingClient.writeProperty = function writeProperty(thing,property) {
      $http.put(thing.uri + "/" + property.name, {"value" : property.value})
      .catch(showError);
    }

    ThingClient.callAction = function callAction(thing,action,param) {
      $http.post(thing.uri + "/" + action.name, {"value" : param})
      .catch(showError);
    }

    return ThingClient;
  }
]);
