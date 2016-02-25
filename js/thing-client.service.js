angular.module("wot").factory('ThingClient',['$http','CoAP',
  function ThingClientFactory($http,CoAP) {
    var ThingClient = {};



    ThingClient.readProperty = function readProperty(thing,property) {
      function applyNewValue(value) {
        property.value = value;
        property.history.push(value);

        //ensure size
        while(property.history.length >= 20) property.history.shift();
      }

      if(thing.protocols['HTTP']) {
        return $http.get(thing.protocols['HTTP'].uri + "/" + property.name)
         .then(function(res) {return res.data.value})
         .then(applyNewValue);
     } else if(thing.protocols['CoAP']) {
       return CoAP.get(thing.protocols['CoAP'].uri + "/" + property.name)
        .then(function(res) {
          return JSON.parse(res).value
          })
        .then(applyNewValue);
     }
    }

    ThingClient.writeProperty = function writeProperty(thing,property) {
      if(thing.protocols['HTTP']) {
        return $http.put(thing.protocols['HTTP'].uri + "/" + property.name, {"value" : property.value})
      } else {
        return CoAP.put(thing.protocols['CoAP'].uri + "/" + property.name, {"value" : property.value})
      }
    }

    ThingClient.callAction = function callAction(thing,action,param) {
      if(thing.protocols['HTTP']) {
        return $http.post(thing.protocols['HTTP'].uri + "/" + action.name, {"value" : param})
      } else {
        return CoAP.post(thing.protocols['CoAP'].uri + "/" + action.name, {"value" : param})
      }
    }

    return ThingClient;
  }
]);
