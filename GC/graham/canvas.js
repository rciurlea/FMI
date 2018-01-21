var App = App || {};

App.Canvas = {
  init() {
    this.canvas = document.getElementById('canv');
    this.ctx = this.canvas.getContext('2d');
    this.refit();
  },

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },

  refit() {
    let canvas = document.getElementById('canv');
    canvas.width = $('#canvas-container').width();
    canvas.height = $('#canvas-container').height() - 4;
  },

  drawPoint(x, y) {
    this.ctx.beginPath();
    this.ctx.arc(x, y, 4, 0, 2 * Math.PI, false);
    this.ctx.fillStyle = '#ffbf00';
    this.ctx.fill();
    this.ctx.beginPath();
    this.ctx.arc(x, y, 2, 0, 2 * Math.PI, false);
    this.ctx.fillStyle = '#fff9e6';
    this.ctx.fill();
  },

  drawLine(x1, y1, x2, y2, color) {
    this.ctx.beginPath()
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = 2;
    this.ctx.stroke();
  },
};
