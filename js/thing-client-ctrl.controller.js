angular.module("wot").controller('ThingClientCtrl',
  ['$scope','TdParser','$http',
  function ThingClientCtrl($scope,TdParser,$http) {
    var ThingClientCtrl = this;

    $scope.things = [];

    ThingClientCtrl.addThingFromUrl = function addThingFromUrl(url) {
       TdParser.fromUrl(url).then(ThingClientCtrl.addThing);
     }

     ThingClientCtrl.addThingFromJson = function addThingFromJson(json) {
        ThingClientCtrl.addThing(TdParser.parseJson(json));
    }

    ThingClientCtrl.addThing = function addThing(thing) {
        $scope.things.push(thing);
     }

     ThingClientCtrl.updateState = function updateState(thing) {
       $scope.things.forEach(function updateThing(thing) {
         thing.properties.forEach(function(property) {
          ThingClientCtrl.readProperty(thing,property); 
         })
       });
     }

     ThingClientCtrl.readProperty = function readProperty(thing,property) {
       $http.get(thing.uri + "/" + property.name)
        .then(function(res) {return res.data.value})
        .then(function applyNewValue(value) {
          property.value = value;
        });
     }

    return ThingClientCtrl;
   }
  ]
);
