var App = App || {};

(function() {
  window.onload = () => {
    // Initializez jocul, pasand tabla si sarpele ca argumente.
    // Acestea au fost adaugate in obiectul App de incarcarea scripturilor
    // precedente.
    App.Game.init(App.Board, App.Snake);
  }
})();
