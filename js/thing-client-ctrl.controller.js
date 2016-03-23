angular.module("thingclient").controller('ThingClientCtrl',
  ['$scope','$interval','$mdSidenav','$mdDialog', '$mdToast','TdParser','ThingClient',
  function ThingClientCtrl($scope, $interval, $mdSidenav, $mdDialog, $mdToast, TdParser, ThingClient) {
    var self = this;
    $scope.things = [];
    self.selected = {};
    self.autoReloaded = [];

    var showRestError = function showRestError(errorObj) {
      msg = errorObj.config.method + " to " + errorObj.config.url + " failed.<br/>";
      msg += errorObj.status + " " + errorObj.statusText
      showError(msg);
    }

    var showError = function showError(errorMsg) {
      $mdToast.showSimple(errorMsg);
    }

    var reloadAuto = function reloadAuto() {
      self.autoReloaded.forEach(function(property) {
          ThingClient.readProperty(property.parent,property).catch(showRestError);
      });
    }

    $interval(reloadAuto, 1000);

    self.addThingFromUrl = function addThingFromUrl(url) {
       TdParser.fromUrl(url).then(self.addThing).catch(showRestError);
     }

     self.addThingFromJson = function addThingFromJson(json) {
        self.addThing(TdParser.parseJson(json));
    }

    self.addThing = function addThing(thing) {
        $scope.things.push(thing);
        self.selected = thing;
     }

     self.updateState = function updateState() {
         self.selected.properties.forEach(function(property) {
          ThingClient.readProperty(self.selected,property).catch(showRestError);
        });
     }

     self.readProperty = function readProperty(property) {
       ThingClient.readProperty(self.selected,property).catch(showRestError);
     }

     self.writeProperty = function writeProperty(property) {
       ThingClient.writeProperty(self.selected,property).catch(showRestError);
     }

     self.callAction = function callAction(action,param) {
       ThingClient.callAction(self.selected,action,param).catch(showRestError);
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

     self.toggleAuto = function toggleAuto(property) {
       property.autoUpdate = !property.autoUpdate;
       if(property.autoUpdate) {
         self.autoReloaded.push(property);
       } else {
         var idx = autoReloaded.indexOf(property);
         if(idx > -1)
          self.autoReloaded.splice(idx,1); //remove property
       }
     }

    return self;
   }
  ]
);
