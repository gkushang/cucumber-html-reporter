$(document).ready(function () {
  $('.collapse')
    .on('hide.bs.collapse', function (e) {
      e.stopPropagation();
      $(this).prev().removeClass('open');
    })
    .on('show.bs.collapse', function (e) {
      e.stopPropagation();
      $(this).prev().addClass('open');
    });

  let $generated = $('.generated-on');

  let timestamp = $generated.text();
  $generated.text('Report generated ' + moment(timestamp).fromNow());
  $generated.prop('title', new Date(timestamp).toISOString());
});

function toggle(className) {
  let x = $(className);
  if (x.css('display') === 'none') {
    x.css('display', 'block');
  } else {
    x.css('display', 'none');
  }
}
