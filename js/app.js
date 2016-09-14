App = (function() {
  var graphController = function ($scope, $element, $timeout) {
    var id  = 0;
    var graph = new Graph();
    var range = d3.range(0, 10).map(function(d) { return String.fromCharCode('a'.charCodeAt() + d); } );
    graph.addNodes(range);

    for (var i in d3.range(500)) {
      range = d3.shuffle(range);
      for (var i = 0; i < range.length - 1; i += 2) {
        graph.addLink(range[i], range[i+1]);
      }
    }

    var paddingRight = 10;
    var paddingTop = 10;
    var paddingLeft = 10;
    var paddingBottom = 10;

    var canvasWidth = $element[0].offsetWidth - (paddingRight + paddingLeft);
    var canvasHeight = $element[0].offsetHeight - (paddingTop + paddingBottom);

    var rectGlobals = {
      width: 10,
      height: 10,
    }

    var numRows = Math.round(canvasWidth / rectGlobals.width);
    var numCols = Math.round(canvasHeight / rectGlobals.height);

    /**
     * In this grid odd numbered cells are nodes in the graph
     * and the even ones are numbered.
     */

    $scope.nodes = graph.nodes || [];
    $scope.links = graph.links || [];
    $scope.rectGlobals = rectGlobals;
    $scope.width = canvasWidth;
    $scope.height = canvasHeight;

    for(var i=0; i < $scope.nodes.length ; i++){
      $scope.nodes[i].color = "red";
    }

    $scope.visit = function(id) {
      graph.markVisited(v);

      function DFS () {

      }
      setTimeout(DFS, 150);
    }

    var force = d3.layout.force()
      .charge(-120)
      .linkDistance(250)//function(d) { return d.value * 10; })
      .size([canvasWidth, canvasHeight])
      .nodes($scope.nodes)
      .links($scope.links)
      .on("tick", function(){$scope.$apply()})
      .start();
  }

  var app = angular.module("AlgoSim", []);
  app.controller("GraphController", graphController);
  return {
    module: app,
  };
}) ();
