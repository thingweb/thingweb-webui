//based on https://stackoverflow.com/questions/18839048/how-to-read-a-file-in-angularjs
angular.module("file-loader",[]).directive('fileLoader', ['$window', function ($window) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, el, attr, ctrl) {
            var fileReader = new $window.FileReader();

            fileReader.onload = function () {
                ctrl.$setViewValue(fileReader.result);

                if ('fileLoaded' in attr) {
                  scope.$apply(function() {
                    scope.$eval(attr['fileLoaded']);
                  });
                }
            };

            fileReader.onprogress = function (event) {
              scope.$apply(function() {
                if ('fileProgress' in attr) {
                    scope.$eval(attr['fileProgress'], {'$total': event.total, '$loaded': event.loaded});
                }
              });
            };

            fileReader.onerror = function () {
              scope.$apply(function() {
                if ('fileError' in attr) {
                    scope.$eval(attr['fileError'], {'$error': fileReader.error});
                }
              });
            };

            var fileType = attr['fileLoader'];

            el.bind('change', function (e) {
                var fileName = e.target.files[0];

                if (fileType === '' || fileType === 'text') {
                    fileReader.readAsText(fileName);
                } else if (fileType === 'data') {
                    fileReader.readAsDataURL(fileName);
                }
            });
        }
    };
}]);
