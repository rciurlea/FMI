var App = App || {};

(function() {
  // La incarcarea ferestrei initializez "lumea" si pornesc animatia
  window.onload = () => {
    App.World.init();
    App.World.run();
  }
})();
