angular
    .module('thingclient', ['ngMaterial', 'chartjs-directive', 'file-loader', 'wot'])
    .config(['$mdThemingProvider',
        function($mdThemingProvider) {
            $mdThemingProvider.theme('default')
                .primaryPalette('blue-grey')
                .accentPalette('grey');
        }]
    );