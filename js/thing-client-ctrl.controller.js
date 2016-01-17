angular.module("wot").controller('ThingClientCtrl',
  ['$scope','TdParser',
  function ThingClientCtrl($scope,TdParser) {
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

    return ThingClientCtrl;
   }
  ]
);
