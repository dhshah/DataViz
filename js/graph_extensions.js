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
