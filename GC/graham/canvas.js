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
    const canvas = document.getElementById('canv');
    const targetWidth = $('#canvas-container').width();
    const targetHeight = $('#canvas-container').height() - 7;
    canvas.width = window.devicePixelRatio * targetWidth;
    canvas.height = window.devicePixelRatio * targetHeight;
    canvas.style.width = targetWidth + "px";
    canvas.style.height = targetHeight + "px";
    const ctx = canvas.getContext('2d');
    ctx.scale(window.devicePixelRatio,window.devicePixelRatio);
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
