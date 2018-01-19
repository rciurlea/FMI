$(() => {
  $(document).on('mouseenter', '.tab', e => {
    $(e.target).addClass('tab-hovering');
  });

  $(document).on('mouseleave', '.tab', e => {
    $(e.target).removeClass('tab-hovering');
  });

  $(document).on('click', '.tab', e => {
    let idx = $(e.target).index();
    $(e.target).addClass('tab-selected');
    $(e.target).siblings().removeClass('tab-selected');
    $(e.target).parent().parent().children('.tab-window').children().eq(idx).show();
    $(e.target).parent().parent().children('.tab-window').children().not(`:eq(${idx})`).hide();
  });

  $('.tab-bar .tab').first().addClass('tab-selected');
  $('.tab-window .tab-content').first().show();
  $('.tab-window .tab-content').not(':eq(0)').hide();
});
