/*
 * A graph is a collections of nodes and edges
 * This, more specifically is an implementation of a directed graph.
 * A node is initialized with an id and has one default field called visted.
 */

Graph = function() {
  this.nodes = [];
  this.links = [];
}

Graph.prototype.addNode = function(id) {
  if (id && !this.hasNode(id)) {
    this.nodes.push({
      id: id,
      visited: false,
    });
  }
}

Graph.prototype.addNodes = function(ids) {
  if (ids) {
    for (var i = 0; i < ids.length; i++) {
      this.addNode(ids[i]);
    }
  }
}

Graph.prototype.hasNode = function(id) {
  for (var i = 0; i < this.nodes.length; i++) {
    if (this.nodes[i].id === id)
      return true;
  }
  return false;
}

Graph.prototype.getNode = function (id) {
  for (var i = 0; i < this.nodes.length; i++) {
    if (this.nodes[i].id === id)
      return this.nodes[i];
  }
  return undefined;
};

Graph.prototype.addLink = function (id1, id2) {
  if (id1 && id2 && id1 !== id2 && !this.hasLink(id1, id2)) {
    var node1 = this.getNode(id1);
    var node2 = this.getNode(id2);

    this.links.push({
      source: node1,
      target: node2,
      value: 1,
      traversed: false
    });
  }
}

Graph.prototype.addLinks = function (newLinks) {
  for (var i = 0; i < newLinks.length; i++) {
    this.addLink(newLinks[i][0], newLinks[i][1]);
  }
};

Graph.prototype.hasLink = function (id1, id2) {
  if (id1 && id2) {
    for (var i = 0; i < this.links.length; i++ ) {
      if (this.links[i].source.id == id1 && this.links[i].target.id == id2) {
        return true;
      }
    }
  }

  return false;
}

/** GRAPH TAVERSAL HELPERS! */
Graph.prototype.markVisited = function (id) {
  if (id) {
    var node = this.getNode(id);
    if (node)
      node.visited = true;
  }
}

Graph.prototype.travel = function (from, to) {
  if (from && to && this.hasLink(from, to)) {
    this.getLink(from, to).traversed = true;
    return true;
  }
  return false;
}

Graph.prototype.followRandomUnvisitedLink = function (id) {
  if (id) {
    var links = this.getUnvisitedLinks(id);
    if (links.length > 0) {
      d3.shuffle(links);
      links[0].traversed = true;
      return links[0].target.id;
    }
  }
  return undefined;
}
