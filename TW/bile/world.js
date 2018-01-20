var App = App || {};

App.World = {
  init() {
    this.canvas = document.getElementById('canv');
    this.ctx = this.canvas.getContext('2d');
    this.balls = [];
    this.canvas.addEventListener('click', e => {
      this.balls.push({
        x: e.clientX,
        y: e.clientY,
        vx: this.getRandomInt(-10, 10),
        vy: this.getRandomInt(-10, 10),
        r: this.getRandomInt(6, 15),
        color: this.getRandomColor(),
      });
    });
  },

  addBall(ball) {
    this.balls.push(ball);
  },

  step() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.balls.forEach(ball => {
      this.ctx.beginPath();
      this.ctx.arc(ball.x, ball.y, ball.r, 0, 1 * Math.PI, false);
      this.ctx.fillStyle = ball.color;
      this.ctx.fill();
      ball.x += ball.vx;
      ball.y += ball.vy;
      if (ball.x < 0 || ball.x > this.canvas.width) ball.vx = -ball.vx;
      if (ball.y < 0 || ball.y > this.canvas.height) ball.vy = -ball.vy;
    });
  },

  run() {
    setInterval(this.step.bind(this), 20);
  },

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  },

  getRandomColor() {
    return '#' +
      this.getRandomInt(100, 255).toString(16) +
      this.getRandomInt(75, 200).toString(16) +
      this.getRandomInt(50, 100).toString(16);
  },
}
