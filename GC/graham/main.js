var App = App || {};

$(() => {
  App.Canvas.init();
  $(window).resize(App.Canvas.refit);
  App.Stage.init(App.Canvas);

  $('#canv').click(e => {
    App.Stage.addPoint(e.originalEvent.offsetX, e.originalEvent.offsetY);
  });

  $('#start-playback').click(() => {
    App.Stage.runAnimation();
  });

  $('#wipe-everything').click(() => {
    App.Stage.reset();
  });

  $('#step-forward').click(() => {
    App.Stage.manualStep();
  });

  $('#step-backward').click(() => {
    App.Stage.manualStep(false);
  });

  $('#goto-first').click(() => {
    App.Stage.gotoFirst();
  });

  $('#goto-last').click(() => {
    App.Stage.gotoLast();
  });

  $('.fps').click(e => {
    $('#fps-display').html(e.target.innerHTML);
    App.Stage.setFPS(parseInt(e.target.innerHTML.slice(0,-3), 10));
  });

});
