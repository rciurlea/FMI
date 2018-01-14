var App = App || {};

App.Snake = {
  initialCells: [
    {
      x: 24,
      y: 23,
    },
    {
      x: 24,
      y: 24,
    },
    {
      x: 24,
      y: 25,
    },
  ],

  justAte: false,

  reset() {
    this.cells = [];
    this.initialCells.forEach(cell => this.cells.push(cell));
    this.render();
  },

  init(board) {
    this.board = board;
    this.reset();
  },

  render() {
    this.cells.forEach(cell => {
      this.board.setPixel(cell.x, cell.y, '#222');
    });
  },

  hasCell(x, y) {
    for (let i = 0; i < this.cells.length; i++) {
      if (this.cells[i].x == x && this.cells[i].y == y) return true;
    }
    return false;
  },

  step(direction) {
    const newHead = {x: this.cells[0].x, y: this.cells[0].y};
    switch (direction) {
      case 'l':
        newHead.x -= 1;
        break;
      case 'r':
        newHead.x += 1;
        break;
      case 'u':
        newHead.y -= 1;
        break;
      case 'd':
        newHead.y += 1;
        break;
      default:
        console.log('should not see this');
    }

    for (let i = 0; i < this.cells.length; i++) {
      if (newHead.x == this.cells[i].x && newHead.y == this.cells[i].y) return true;
    }
    if (newHead.x < 0 || newHead.x > 49 || newHead.y < 0 || newHead.y > 49) return true;

    this.cells.unshift(newHead);
    if (!this.justAte) {
      const popped = this.cells.pop();
      this.board.clearPixel(popped.x, popped.y);
    }
    this.justAte = false;
    this.render();
    return false;
  },
};
