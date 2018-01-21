var App = App || {};

// Obiectul Snake tine toate informatiile si metodele necesare gestionarii
// sarpelui.
App.Snake = {
  // Cele 3 patratele care formeaza initial sarpele.
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

  // Variabila in care tinem cont daca sarpele tocmai a inghitit ceva
  justAte: false,

  // Reseteaza starea sarpelui
  reset() {
    // Array-ul cells va tine celulele care formeaza corpul sarpelui
    this.cells = [];
    this.initialCells.forEach(cell => this.cells.push(cell));
    this.render();
  },

  init(board) {
    this.board = board;
    this.reset();
  },

  // Metoda care deseneaza sarpele pe ecran
  render() {
    this.cells.forEach(cell => {
      this.board.setPixel(cell.x, cell.y, '#222');
    });
  },

  // Metoda care verifica daca o anumita celula din caroiaj este continuta
  // in corpul sarpelui
  hasCell(x, y) {
    for (let i = 0; i < this.cells.length; i++) {
      if (this.cells[i].x == x && this.cells[i].y == y) return true;
    }
    return false;
  },

  // Pasul de animatie, intoarce true daca sarpele are o coliziune cu peretii
  // sau cu el insusi (daca a murit).
  step(direction) {
    // Generam un nou cap pentru sarpe. La inceput va avea coordonatele capului
    // vechi, apoi in functie de directia de deplasare va fi ajustat
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

    // Verificam sa nu ne lovim de propriul corp...
    for (let i = 0; i < this.cells.length; i++) {
      if (newHead.x == this.cells[i].x && newHead.y == this.cells[i].y) return true;
    }
    // ...sau de pereti
    if (newHead.x < 0 || newHead.x > 49 || newHead.y < 0 || newHead.y > 49) return true;

    // introducem noul cap in corpul sarpelui
    this.cells.unshift(newHead);
    // daca sarpele tocmai a mancat atunci ar trebui sa creasca lungimea cu 1
    // daca nu, trebuie sa scoatem coada din corp
    if (!this.justAte) {
      const popped = this.cells.pop();
      this.board.clearPixel(popped.x, popped.y);
    }
    this.justAte = false;
    this.render();
    return false;
  },
};
