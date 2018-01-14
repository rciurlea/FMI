var App = App || {};

(function() {
  window.onload = () => {
    App.Game.init(App.Board, App.Snake);
  }
})();
