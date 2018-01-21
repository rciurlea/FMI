var App = App || {};

// Obiectul Board reprezinta "ecranul telefonului" pentru jocul de snake
App.Board = {
  boardBg: '#339966',
  pixelColor: '#26734d',
  // Metoda care deseneaza un caroiaj de 50x50 patratele
  drawGrid() {
    this.ctx.fillStyle = this.boardBg;
    this.ctx.fillRect(0, 0, 600, 600);
    this.ctx.fillStyle = this.pixelColor;
    for (let i = 0; i < 50; i++) {
      for (let j = 0; j < 50; j++) {
        this.ctx.fillRect(1+i*12, 1+j*12, 10, 10);
      }
    }
  },

  // Metoda pentru colorarea unuia dintre patratele
  setPixel(x, y, color) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(1+x*12, 1+y*12, 10, 10);
  },

  // Metoda care sterge unul dintre patratele
  clearPixel(x, y) {
    this.setPixel(x, y, this.pixelColor);
  },

  // La initializarea Board-ului salvez contextul 2d din canvas si desenez
  // caroiajul.
  init() {
    const canvas = document.getElementById('canv');
    this.ctx = canvas.getContext('2d');
    this.drawGrid();
  }
};
