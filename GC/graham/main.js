var App = App || {};

$(() => {
  $('[data-toggle="popover"]').popover();
  $('[data-toggle="tooltip"]').tooltip();
  App.Canvas.init();
  $(window).resize(App.Canvas.refit);
  App.Stage.init(App.Canvas);
  App.Stage.modeAdd();

  $('#canv').click(e => {
    App.Stage.handleClick(e.originalEvent.offsetX, e.originalEvent.offsetY);
  });

  $('#place-dots').click(() => {
    App.Stage.modeAdd();
  });

  $('#erase-dots').click(() => {
    App.Stage.modeDelete();
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

  $(document).keypress(e => {
    switch (e.which) {
      case 32:    // Space
        App.Stage.runAnimation();
        break;
      case 97:    // A
        App.Stage.modeAdd();
        break;
      case 100:   // D
        App.Stage.modeDelete();
        break;
      case 112:   // P
        App.Stage.manualStep(false);
        break;
      case 110:   // N
        App.Stage.manualStep();
        break;
      case 115:   // S
        App.Stage.gotoFirst();
        break;
      case 101:   // E
        App.Stage.gotoLast();
    }
  });

});
