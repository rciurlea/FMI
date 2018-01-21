var App = App || {};

App.Stage = {
  init(canvas) {
    this.canvas = canvas;
    this.clear();
  },

  clear() {
    this.canvas.clear();
    this.points = [];
    this.lines = [];
  },

  render() {
    this.canvas.clear();
    this.lines.forEach(line => {
      this.canvas.drawLine(line.x1, line.y1, line.x2, line.y2, line.color);
    });
    this.points.forEach(p => {
      this.canvas.drawPoint(p.x, p.y);
    });
  },

  addPoint(x, y) {
    const minDistance = 10;
    let collision = false;
    this.points.forEach(p => {
      if (Math.sqrt((p.x - x) * (p.x - x) + (p.y - y) * (p.y - y)) < minDistance) collision = true;
    });
    if (!collision) {
      this.points.push({x, y});
      this.render();
    }
    return collision;
  },

  addLine(x1, y1, x2, y2, color) {
    let collision = false;
    this.lines.forEach(li => {
      if (li.x1 === x1 && li.y1 === y1 && li.x2 === x2 && li.y2 === y2) collision = true;
    });
    if (!collision) {
      this.lines.push({x1, y1, x2, y2, color});
      this.render();
    }
  },

  removeLine(x1, y1, x2, y2) {
    this.lines = this.lines.filter(l => !(l.x1 === x1 && l.y1 === y1 && l.x2 === x2 && l.y2 === y2));
    this.render();
  },
};
