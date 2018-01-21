var App = App || {};

App.Game = {
  interval: null,
  period: 100,
  direction: 'u',
  wantedDirection: 'u',
  score: 0,
  level: 1,

  // Initializarea jocului
  init(board, snake) {
    this.board = board;
    this.snake = snake;
    this.setKeyboardHandler();
    this.board.init();
    this.board.drawGrid();
    this.snake.init(this.board);
    this.run();
    this.displayLevel();
  },

  // Pornim jocul
  run() {
      this.createFood();
      this.interval = setInterval(() => this.step(), this.period);
  },

  reset() {
    this.gameOver(false);
    this.board.drawGrid();
    this.snake.reset();
    this.direction = 'u';
    this.period = 100;
    this.level = 1;
    this.score = 0;
    this.displayLevel();
    this.displayScore();
  },

  restart() {
    this.reset();
    this.run();
  },

  stop() {
    clearInterval(this.interval);
  },

  // Pasul de animatie
  step() {
    if ((this.direction !== 'u' || this.wantedDirection !=='d') &&
        (this.direction !== 'd' || this.wantedDirection !=='u') &&
        (this.direction !== 'l' || this.wantedDirection !=='r') &&
        (this.direction !== 'r' || this.wantedDirection !=='l')) {
          this.direction = this.wantedDirection;
        }
    // Sarpele face un pas. Daca a murit incheiem jocul aici
    const dead = this.snake.step(this.direction);
    if (dead) {
      this.stop();
      this.gameOver(true);
    }
    // Verificam daca sarpele a mancat si ajustam scorul si viteza jocului
    // corespunzator
    if (this.snake.hasCell(this.food.x, this.food.y)) {
      this.snake.justAte = true;
      this.score += this.level;
      this.displayScore();
      this.createFood();
      this.increaseSpeed();
    }
  },

  // La fiecare bucata de mancare crestem viteza jocului, scazand perioada
  // pasului de animatie la 97.5% din cea anterioara. Jocul devine exponential
  // mai rapid
  increaseSpeed() {
    clearInterval(this.interval);
    this.period *= 0.975;
    this.level = Math.floor(1000/this.period) - 9;
    this.displayLevel();
    this.interval = setInterval(() => this.step(), this.period);
  },

  // Generam o bucata de mancare
  createFood() {
    const food = {};
    do {
      food.x = this.getRandomInt(0, 50);
      food.y = this.getRandomInt(0, 50);
    } while (this.snake.hasCell(food.x, food.y));
    this.food = food;
    this.board.setPixel(food.x, food.y, '#ff3333');
  },

  // handler de tastatura, pentru viraje
  setKeyboardHandler() {
    document.addEventListener('keydown', event => {
      const keyName = event.key;
      switch (keyName) {
        case 'ArrowUp':
          this.wantedDirection = 'u';
          break;
        case 'ArrowDown':
          this.wantedDirection = 'd';
          break;
        case 'ArrowLeft':
          this.wantedDirection = 'l';
          break;
        case 'ArrowRight':
          this.wantedDirection = 'r';
          break;
        default:
      }
    });
  },

  // afisam sau ascundem fereastra game over
  gameOver(show) {
    const popup = document.getElementById('game-over');
    if (show)
      popup.style.visibility = 'visible';
    else
      popup.style.visibility = 'hidden';
  },

  // afisam scorul
  displayScore() {
    const scoreContainer = document.getElementById('score-container');
    scoreContainer.innerHTML = this.score;
  },

  // afisam nivelul
  displayLevel() {
    const scoreContainer = document.getElementById('level-container');
    scoreContainer.innerHTML = `Level ${this.level}`;
  },

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  },
};
