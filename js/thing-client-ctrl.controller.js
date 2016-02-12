angular.module("wot").controller('ThingClientCtrl',
  ['$scope','$mdSidenav','TdParser','ThingClient',
  function ThingClientCtrl($scope, $mdSidenav, TdParser, ThingClient) {
    var self = this;
    $scope.things = [];
    $scope.errors = [];
    self.selected = {};

    var showError = function showError(errorMsg) {
      $scope.errors.push(errorMsg);
    }

    self.addThingFromUrl = function addThingFromUrl(url) {
       TdParser.fromUrl(url).then(self.addThing).catch(showError);
     }

     self.addThingFromJson = function addThingFromJson(json) {
        self.addThing(TdParser.parseJson(json));
    }

    self.addThing = function addThing(thing) {
        $scope.things.push(thing);
     }

     self.updateState = function updateState(thing) {
       $scope.things.forEach(function updateThing(thing) {
         thing.properties.forEach(function(property) {
          ThingClient.readProperty(thing,property);
         })
       });
     }

     self.toggleList = function toggleList() {
       $mdSidenav('left').toggle()
     };

     self.selectThing = function selectThing(thing) {
       self.selected = thing;
     };


    return self;
   }
  ]
);
