var App = App || {};

App.World = {
  init() {
    // Salvez canvasul si contextul 2d pentru apeluri ulterioare
    this.canvas = document.getElementById('canv');
    this.canvas.height = window.innerHeight;
    this.canvas.width = window.innerWidth;
    this.ctx = this.canvas.getContext('2d');

    // Array de bile, initial gol. Pentru fiecare bila voi tine un obiect
    // in care am coordonatele x si y, vitezele pe x si y, raza si culoarea
    this.balls = [];

    // Event listener pentru click. la fiecare click voi adauga o bila la
    // pozitia mouse-ului. Noile bile vor avea viteze, raze si culori aleatorii
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

  // Pasul de animatie
  step() {
    // Sterg canvasul
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // Parcurg array-ul de bile si o desenez pe fiecare
    this.balls.forEach(ball => {
      this.ctx.beginPath();
      this.ctx.arc(ball.x, ball.y, ball.r, 0, 2 * Math.PI, false);
      this.ctx.fillStyle = ball.color;
      this.ctx.fill();
      ball.x += ball.vx;
      ball.y += ball.vy;
      // Daca am ajuns la marginea canvas-ului inversez viteza pentru reflexie
      if (ball.x < 0 || ball.x > this.canvas.width) ball.vx = -ball.vx;
      if (ball.y < 0 || ball.y > this.canvas.height) ball.vy = -ball.vy;
    });
  },

  run() {
    // Rulez pasul de animatie la fiecare 20ms (deci 50 de cadre pe secunda)
    setInterval(this.step.bind(this), 20);
  },

  // Functie ajutatoare, intoarce un numar intreg aleator intre min si max
  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  },

  // Functie ajutatoare, intoarce un cod de culoare aleator
  getRandomColor() {
    return '#' +
      this.getRandomInt(100, 255).toString(16) +
      this.getRandomInt(75, 200).toString(16) +
      this.getRandomInt(50, 100).toString(16);
  },
}
