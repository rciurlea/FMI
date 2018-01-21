var App = App || {};

$(() => {
  App.Canvas.init();
  $(window).resize(App.Canvas.refit);
  App.Stage.init(App.Canvas);

  $('#canv').click(e => {
    console.log(e.originalEvent.offsetX, e.originalEvent.offsetY);
    App.Stage.addPoint(e.originalEvent.offsetX, e.originalEvent.offsetY);
  });


});
