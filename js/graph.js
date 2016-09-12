Graph = function() {
  this.nodes = [];
  this.links = [];
}

Graph.prototype.addNode = function(id) {
  if (id && !this.hasNode(id)) {
    this.nodes.push({id: id});
  }
}

Graph.prototype.addNodes = function(ids) {
  if (ids) {
    for (var i = 0; i < ids.length; i++) {
      this.addNode(ids[i]);
    }
  }
}

Graph.prototype.removeNode = function(id) {
  if (id) {
    for (var i = 0; i < this.nodes.length; i++) {
      if (this.nodes[i].id === id) {
        this.nodes.splice(i, 1);
        return true;
      }
    }
  }
  return false;
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
  if (!this.hasLink(id1, id2)) {
    this.links.push({
      source: id1,
      target: id2
    });
  }
}

Graph.prototype.addLinks = function (newLinks) {
  for (var i = 0; i < newLinks.length; i++) {
    this.addLink(newLinks[i][0], newLinks[i][1]);
  }
};

Graph.prototype.removeLink = function(id1, id2) {
  if (id1 && id2) {
    for (var i = 0; i < this.links.length; i++ ) {
      if (this.links[i].source.id == id1 && this.links[i].target.id == id2) {
        this.links.splice(i, 1);
        return true;
      }
    }
  }
  return false;
}

Graph.prototype.hasLink = function (id1, id2) {
  if (id1 && id2) {
    for (var i = 0; i < this.links.length; i++ ) {
      if (this.links[i].source == id1 && this.links[i].target == id2) {
        return true;
      }
    }
  }

  return false;
}
