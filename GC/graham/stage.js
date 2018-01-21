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

  getPoints() {
    return _.cloneDeep(this.points);
  },

  render() {
    this.canvas.clear();
    this.lines.forEach(line => {
      this.canvas.drawLine(line.x1, line.y1, line.x2, line.y2, "#009900");
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

  drawPolyLine(vertices) {
    this.lines = [];
    for (let i = 0; i < vertices.length - 1; i++) {
      this.lines.push({
        x1: vertices[i].x,
        y1: vertices[i].y,
        x2: vertices[i+1].x,
        y2: vertices[i+1].y,
      });
    }
    this.render()
  },

  runAnimation() {
    let frames = App.Solver.convexHull(this.getPoints());
    let currentFrame = 0;
    let handle = setInterval(() => {
      console.log("tick!", currentFrame);
      if (currentFrame < frames.length) {
        this.drawPolyLine(frames[currentFrame]);
        currentFrame++;
      } else {
        clearInterval(handle);
      }
    }, 300);
  },

};
