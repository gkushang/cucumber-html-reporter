$(document).ready(function() {
    $('a.toggle').on('click', function() {
        if ($(this).text() === 'Screenshot -') {
            $(this).text('Screenshot +');
            $(this).siblings('a.screenshot').find('img').hide();
        } else {
            $(this).text('Screenshot -');
            $(this).siblings('a.screenshot').find('img').show();
        }
    });
});
