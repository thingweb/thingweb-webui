angular.module("wot").controller('ThingClientCtrl',
  ['$scope','$mdSidenav','$mdDialog','TdParser','ThingClient',
  function ThingClientCtrl($scope, $mdSidenav, $mdDialog, TdParser, ThingClient) {
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
        self.selected = thing;
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

     self.openUriDialog = function openUriDialog($event) {
       $mdDialog.show({
          clickOutsideToClose: true,
          controller: function($mdDialog) {
            // Save the clicked item
            this.uri = "";
            // Setup some handlers
            this.close = function() {
              $mdDialog.cancel();
            };
            this.submit = function() {
              $mdDialog.hide();
              self.addThingFromUrl(this.uri);
            };
          },
          controllerAs: 'dialog',
          templateUrl: 'uridialog.html',
          targetEvent: $event
        });
     }

     self.addFileFromPicker = function addFileFromPicker(filePickerId) {
        angular.element(document.querySelector('#' + filePickerId))[0].click();
     }

    return self;
   }
  ]
);
