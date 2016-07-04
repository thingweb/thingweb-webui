'use strict';

angular.module('chartjs-directive', []).
  directive('chart', function () {
    var baseWidth = 600;
    var baseHeight = 400;
    
    return {
      restrict: 'E',
      template: '<canvas></canvas>',
      scope: {
        chartObject: "=value",
        chartOptions: '=options'
      },
      link: function (scope, element, attrs) {
        var canvas  = element.find('canvas')[0],
            context = canvas.getContext('2d'),
            chart;

        var options = {
          type:   attrs.type   || "Line",
          width:  attrs.width  || baseWidth,
          height: attrs.height || baseHeight
        };
        canvas.width = options.width;
        canvas.height = options.height;
        chart = new Chart(context);

        scope.$watch(function(){ return element.attr('type'); }, function(value){
          if(!value) return;
          options.type = value;
          var chartType = options.type;
          scope.chart = chart[chartType]({'datasets' : [scope.chartObject], 'labels' : []}, scope.chartOptions);
        });

        //Update when charts data changes
        scope.$watch(function() { return scope.chartObject; }, function(value) {
          scope.chart.scale.beginAtZero = false
          if(!value) return;
          var chartType = options.type;
          if (scope.chart) {
            if(scope.chart.segments) {
              scope.chart.segments.forEach(function(segment, idx) {
                angular.extend(segment,scope.chartObject.data[idx]);
              });
            } else if (scope.chart.datasets) {

              scope.chart.datasets.forEach(function(dataset, dsid) {
                var nset = scope.chartObject;
                  nset.forEach(function(point, idx) {
                    var values = (dataset.points)? dataset.points : dataset.bars;
                    if(idx < values.length)
                      values[idx].value = nset[idx];
                    else
                      scope.chart.addData([nset[idx]],'');
                  });

              });
            }
            scope.chart.update();
          } else
            scope.chart = chart[chartType](
              {'labels' : [] , 'datasets' : [scope.chartObject]}
              , scope.chartOptions
            );
        },true);
      }
    }
  });
