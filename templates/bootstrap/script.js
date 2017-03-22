$(document).ready(function() {
    $('.collapse').on('hide.bs.collapse', function(e) {
        e.stopPropagation();
        $(this).prev().removeClass('open');
    }).on('show.bs.collapse', function(e) {
        e.stopPropagation();
        $(this).prev().addClass('open');
    });

    $('a.toggle').on('click', function() {
        if ($(this).text() === 'Screenshot -') {
            $(this).text('Screenshot +');
            $('.screenshot-box').hide();
        } else {
            $(this).text('Screenshot -');
            $('.screenshot-box').show();
        }
    });
    var $generated = $('.generated-on');

    $generated.text('Generated ' + moment($generated.text()).fromNow());
});
