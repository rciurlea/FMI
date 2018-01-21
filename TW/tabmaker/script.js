// Dupa ce documentul a fost incarcat
$(() => {
  // Cand cursorul intra peste un tab ii aplicam clasa CSS corespunzatoare
  $(document).on('mouseenter', '.tab', e => {
    $(e.target).addClass('tab-hovering');
  });

  // Stergem clasa cand cursorul paraseste tabul
  $(document).on('mouseleave', '.tab', e => {
    $(e.target).removeClass('tab-hovering');
  });

  // Pentru fiecare click pe un tab
  $(document).on('click', '.tab', e => {
    // Tin minte al catelea tab era
    let idx = $(e.target).index();
    // Ii adaug clasa CSS corespunzatoare
    $(e.target).addClass('tab-selected');
    // Sterg clasa CSS de selectare de pe toti fratii tabului
    $(e.target).siblings().removeClass('tab-selected');
    // Ma asigur ca div-ul cu continut aferent tabului selectat e afisat
    $(e.target).parent().parent().children('.tab-window').children().eq(idx).show();
    // Ascund toate celelalte div-uri cu continut
    $(e.target).parent().parent().children('.tab-window').children().not(`:eq(${idx})`).hide();
  });

  // La initializare ma asigur ca afisez primul tab ca fiind selectat
  $('.tab-bar .tab').first().addClass('tab-selected');
  $('.tab-window .tab-content').first().show();
  $('.tab-window .tab-content').not(':eq(0)').hide();
});
