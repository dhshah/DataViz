/*
 * A graph is a collections of nodes and edges
 * This, more specifically is an implementation of a directed graph.
 * A node is initialized with an id and has one default field called visted.
 */

Graph = function($q) {
  this.deferred_ = $q.defer();
  this.nodes = [];
  this.links = [];
}

Graph.prototype.addNode = function(id) {
  if (id !== undefined && !this.hasNode(id)) {
    this.nodes.push({
      id: id,
      visited: false,
    });
  }
}

Graph.prototype.addNodes = function(ids) {
  ids.forEach((id) => this.addNode(id));
}

Graph.prototype.hasNode = function(id) {
  return (id !== undefined ? this.nodes.some((n) => { return n.id === id }) : false);
}

Graph.prototype.getNode = function (id) {
  for (var i = 0; i < this.nodes.length; i++)
    if (this.nodes[i].id === id)
      return this.nodes[i];
  return undefined;
};

Graph.prototype.addLink = function (source, target) {
  if (source !== undefined && target !== undefined && source !== target &&
      !this.hasLink(source, target)) {
    var node1 = this.getNode(source);
    var node2 = this.getNode(target);

    this.links.push({
      source: node1,
      target: node2,
      value: 1,
      traversed: false
    });
  }
}

Graph.prototype.addLinks = function (newLinks) {
  newLinks.forEach((link) => this.addLink(link[0], link[1]));
};

Graph.prototype.hasLink = function (source, target) {
  if (source !== undefined && target !== undefined) {
    return this.links.some((l) => {
      return l.source.id === source && l.target.id === target
    });
  }
  return false;
}
