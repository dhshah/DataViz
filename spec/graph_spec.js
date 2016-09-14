
describe('graph', function() {
  var graph;
  beforeEach(inject(function($q) {
    graph = new Graph($q);
  }));

  it('test add nodes', function() {
    var added_nodes = d3.range(10);
    var not_addded_nodes = d3.range(10, 20);
    graph.addNodes(added_nodes);
    expect(graph.nodes.length).toBe(added_nodes.length);
    expect(graph.links.length).toBe(0);

    added_nodes.forEach((n) => expect(graph.hasNode(n)).toBe(true));
    not_addded_nodes.forEach((n) => expect(graph.hasNode(n)).toBe(false));
  });

  it('test add links', function() {
    graph.addNodes([0, 1]);
    graph.addLink(0, 1);
    expect(graph.links.length).toBe(1);
    expect(graph.hasLink(0, 1)).toBe(true);
    expect(graph.hasLink(1, 0)).toBe(false);

    graph.addLink(1, 0);
    expect(graph.links.length).toBe(2);
    expect(graph.hasLink(1, 0)).toBe(true);
  });
});
