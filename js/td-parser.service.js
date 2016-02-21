angular.module("wot").factory('TdParser',['$http',
  function TdParserFactory($http) {
    var TdParser = {};

    //helper functions
    function isNumericType(xsdType) {
       var numericTypes = ['xsd:byte','xsd:float','xsd:decimal','xsd:int','xsd:long'];
       return numericTypes.indexOf(xsdType) != -1;
    }

    function createThing(parsedTd) {
      var newThing = {
        'name' : parsedTd.metadata.name,
        'properties' : [],
        'actions': [],
        'uri': (parsedTd.metadata.protocols.HTTP) ? parsedTd.metadata.protocols.HTTP.uri : parsedTd.metadata.protocols.CoAP.uri, //FIXME dodgy
        'protocols' : parsedTd.metadata.protocols
      };

      //add all properties
      parsedTd.interactions
       .filter(function isProperty(interaction) {
         return interaction["@type"] == "Property";
       })
       .forEach(function addProperty(property) {
         newThing.properties.push({
           'name': property.name,
           'writable' : property.writable,
           'xsdType' : property.outputData,
           'isNumeric' : function isNumeric() {
             return isNumericType(this.xsdType);
           }
         });
       });

       //add actions
       parsedTd.interactions
        .filter(function isAction(interaction) {
          return interaction["@type"] == "Action";
        })
        .forEach(function addAction(action) {
          newThing.actions.push({
            'name': action.name,
            'xsdParamType' : action.inputData,
            'xsdReturnType' : action.outputData
          });
        });

        return newThing;
    }

    TdParser.fromUrl = function fromUrl(url) {
      return $http.get(url).then(function(res) { return res.data}).then(createThing)
    }

    TdParser.parseJson = function parseJson(json) {
      // TODO actually parse as JSON-LD, e.g. using io-informatics/angular-jsonld
      var td = JSON.parse(json);
      return createThing(td);
    }

    return TdParser;
  }
]);
