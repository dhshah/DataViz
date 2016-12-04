/* Graph initializers */
Graph.prototype.createGridGraph = function (width, height) {
  height = height || width;
  this.nodes = [];
  this.edges = [];
  var range = d3.range(width * height);
  this.addNodes(range);

  for (var i = 0; i < range.length; i++) {
    if (i % width != width - 1) {
      this.addLink(i, i + 1);
      this.addLink(i + 1, i);
    }
    if (Math.floor(i / height) != height - 1) {
      this.addLink(i, i + height);
      this.addLink(i + height, i);
    }
  }
}


/** GRAPH TAVERSAL HELPERS! */
Graph.prototype.markVisited = function (id) {
  if (id !== undefined) {
    if (this.hasNode(id))
      this.getNode(id).visited = true;
  }
}

Graph.prototype.travel = function (from, to) {
  if (from !== undefined && to !== undefined && this.hasLink(from, to)) {
    this.getLink(from, to).traversed = true;
    return true;
  }
  return false;
}

Graph.prototype.followRandomUnvisitedLink = function (id) {
  if (id !== undefined) {
    var links = this.links.filter((l) => {
      return l.source.id === id && !l.target.visited;
    });
    if (links.length > 0) {
      d3.shuffle(links);
      links[0].traversed = true;
      return links[0].target.id;
    }
  }
  return undefined;
}
