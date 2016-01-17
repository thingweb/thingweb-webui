angular.module("wot").factory('TdParser',['$http',
  function TdParserFactory($http) {
    var TdParser = {};

    //helper functions
    function createThing(parsedTd) {
      var newThing = {
        'name' : parsedTd.metadata.name,
        'properties' : [],
        'actions': [],
        'uri': parsedTd.metadata.protocols.HTTP.uri
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
           'xsdType' : property.outputData
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
      //to be done
    }

    TdParser.parseJson = function parseJson(json) {
      // TODO actually parse as JSON-LD, e.g. using io-informatics/angular-jsonld
      var td = JSON.parse(json);
      return createThing(td);
    }

    return TdParser;
  }
]);
