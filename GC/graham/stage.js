var App = App || {};

App.Stage = {
  init(canvas) {
    this.period = 200;
    this.playing = false;
    this.frames = null;
    this.currentFrame = 0;
    this.interval = null;
    this.canvas = canvas;
    this.clear();
  },

  clear() {
    this.canvas.clear();
    this.points = [];
    this.lines = [];
  },

  reset() {
    if (confirm("Wipe everything?")) {
      this.clear();
    }
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

  resetAnimation() {
    this.playing = false;
    this.lines = [];
    this.showPlayButton();
    if (this.interval !== null) {
      clearInterval(this.interval);
    }
    this.frames = App.Solver.convexHull(this.getPoints());
    this.currentFrame = 0;
  },

  addPoint(x, y) {
    const minDistance = 10;
    let collision = false;
    this.points.forEach(p => {
      if (Math.sqrt((p.x - x) * (p.x - x) + (p.y - y) * (p.y - y)) < minDistance) collision = true;
    });
    if (!collision) {
      this.points.push({x, y});
      this.resetAnimation();
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

  step() {
    if (this.currentFrame < this.frames.length) {
      console.log("step!");
      this.drawPolyLine(this.frames[this.currentFrame]);
      this.currentFrame++;
    } else {
      if (this.interval !== null) {
        clearInterval(this.interval);
        this.interval = null;
        this.playing = false;
        this.showPlayButton();
      }
    }
  },

  manualStep(forward = true) {
    if (this.frames !== null) {
      if (this.currentFrame >= 0 && this.currentFrame < this.frames.length)
        this.drawPolyLine(this.frames[this.currentFrame]);
      if (forward) {
        if (this.currentFrame < this.frames.length - 1) this.currentFrame++;
      } else {
        if (this.currentFrame > 0) this.currentFrame--;
      }
    }
  },

  runAnimation() {
    if (!this.playing) {
      if (this.frames !== null && this.frames.length > 0) {
        this.playing = true;
        this.showPauseButton();
        this.interval = setInterval(() => { this.step(); }, this.period);
      }
    } else {
      this.playing = false;
      this.showPlayButton();
      clearInterval(this.interval);
      this.interval = null;
    }
  },

  stopAnimation() {
    if (this.playing) {
      this.playing = false;
      clearInterval(this.interval);
      this.interval = null;
      this.showPlayButton();
    }
  },

  gotoFirst() {
    this.stopAnimation();
    this.currentFrame = 0;
    this.drawPolyLine(this.frames[this.currentFrame]);
  },

  gotoLast() {
    this.stopAnimation();
    this.currentFrame = this.frames.length - 1;
    this.drawPolyLine(this.frames[this.currentFrame]);
  },

  setFPS(fps) {
    this.period = 1000 / fps;
  },

  showPauseButton() {
    $('#start-playback i').removeClass('fa-play');
    $('#start-playback i').addClass('fa-pause');
  },

  showPlayButton() {
    $('#start-playback i').removeClass('fa-pause');
    $('#start-playback i').addClass('fa-play');
  },
};
