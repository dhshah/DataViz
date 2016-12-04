App = (function() {
  var graphController = function ($scope, $element, $q) {
    var id  = 0;
    // var range = d3.range(7).map((d) => { return String.fromCharCode('a'.charCodeAt() + d); } );
    // graph.addNodes(range);
    //
    // var DEFAULT_DELAY = 250; //ms
    //
    // for (var i in d3.range(500)) {
    //   range = d3.shuffle(range);
    //   for (var i = 0; i < range.length - 1; i += 2) {
    //     if (!graph.hasLink(range[i+1], range[i]))
    //       graph.addLink(range[i], range[i+1]);
    //   }
    // }

    var DEFAULT_DELAY = 250;

    var paddingRight = 10;
    var paddingTop = 10;
    var paddingLeft = 10;
    var paddingBottom = 10;

    var canvasWidth = $element[0].offsetWidth - (paddingRight + paddingLeft);
    var canvasHeight = $element[0].offsetHeight - (paddingTop + paddingBottom);

    var rectGlobals = {
      width: 100,
      height: 100
    };

    var numRows = 14;
    var numCols = 14;

    console.log("here");
    var graph = new Graph($q);
    graph.createGridGraph(numRows, numCols);
    console.log("here");
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
      var stack = [id];
      graph.markVisited(id);
      function DFS () {
        var node = graph.followRandomUnvisitedLink(stack.peek());
        if (node === undefined) {
          stack.pop();
          if (stack.length > 0){
            setTimeout(DFS, 1);
          }
        }
        else {
          graph.markVisited(node);
          stack.push(node);
          if (stack.length > 0){
            setTimeout(DFS, DEFAULT_DELAY);
          }
        }
        $scope.$apply();
      }
      setTimeout(DFS, DEFAULT_DELAY);
    }

    var grid = d3.layout.grid()
      .size([canvasWidth - 50, canvasHeight - 50]);

    var nodes = d3.selectAll('.node')
      .data(grid(graph.nodes));
  }

  var app = angular.module("AlgoSim", []);
  app.controller("GraphController", graphController);
  return {
    module: app,
  };
}) ();
