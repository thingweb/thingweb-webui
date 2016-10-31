(function () {
    'use strict';

    angular
        .module('wot')
        .directive('scriptEditor', scriptEditor);

    scriptEditor.$inject = ["$window"];
    function scriptEditor($window) {
        // Usage:
        //
        // Creates:
        //

        var directive = {
            bindToController: true,
            controller: ControllerController,
            controllerAs: 'vm',
            link: link,
            restrict: 'AE',
            scope: {
            }
        };
        return directive;

        function link(scope, elements, attrs) {
            var editor = $window.monaco.editor.create(elements[0], {
                value: [
                    'function x() {',
                    '\tconsole.log("Hello world!");',
                    '}'
                ].join('\n'),
                language: 'javascript'
            });
        }
    }

    /* @ngInject */
    function ControllerController() {

    }
})();