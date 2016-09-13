App = (function() {
  var graphController = function ($scope, $element) {

      var nodes = [
        {"name":"A","group":1},
        {"name":"B","group":1},
        {"name":"C","group":1},
        {"name":"D","group":1},
        {"name":"E","group":1},
        {"name":"F","group":1},
        {"name":"G","group":1},
        {"name":"H","group":1},
        {"name":"I","group":1}
      ];

      var links = [
        {"source":0,"target":1,"value":2},
        {"source":1,"target":2,"value":3},
        {"source":0,"target":3,"value":4},
        {"source":1,"target":4,"value":5},
        {"source":2,"target":5,"value":4},
        {"source":3,"target":4,"value":3},
        {"source":4,"target":5,"value":2},
        {"source":3,"target":6,"value":1},
        {"source":4,"target":7,"value":2},
        {"source":5,"target":8,"value":3},
        {"source":6,"target":7,"value":4},
        {"source":7,"target":8,"value":5}
      ];

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


    $scope.nodes = nodes || [];
    $scope.links = links || [];
    $scope.rectGlobals = rectGlobals;
    $scope.width = canvasWidth;
    $scope.height = canvasHeight;

    for(var i=0; i < $scope.nodes.length ; i++){
      $scope.nodes[i].color = "red";
    }

    var force = d3.layout.force()
      .charge(-120)
      .linkDistance(function(d) { return d.value * 10; })
      .size([canvasWidth, canvasHeight])
      .nodes($scope.nodes)
      .links($scope.links)
      .on("tick", function(){$scope.$apply()})
      .start();

    $scope.addNewNode = function() {
      $scope.nodes.push({
        "name":"J","group":1
      });
      force.start();
    }
}

  var app = angular.module("AlgoSim", []);
  app.controller("GraphController", graphController);
  return {
    module: app,
  };
}) ();
