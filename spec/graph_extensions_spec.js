
describe('graph extensions', function() {
  var graph;

  // [0, 9] inclusive
  var DEFAULT_NODES = d3.range(10);

  // [[0,1],[1,2],[2,3],...,[8,9]]
  var DEFAULT_LINKS = d3.range(9).map((i) => { return [i, i+1]; });

  beforeEach(inject(function($q) {
    graph = new Graph($q);
    graph.addNodes(DEFAULT_NODES);
    graph.addLinks(DEFAULT_LINKS);
  }));

  it('should mark visted correctly', function() {
    var node = DEFAULT_NODES[0];
    expect(graph.getNode(node).visited).toBe(false);
    graph.markVisited(node);
    expect(graph.getNode(node).visited).toBe(true);
  });

  it('should mark visted correctly', function() {
    var node = DEFAULT_NODES[0];
    expect(graph.getNode(node).visited).toBe(false);
    graph.markVisited(node);
    expect(graph.getNode(node).visited).toBe(true);
  });
});
