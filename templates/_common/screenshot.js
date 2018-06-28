$('a.toggle').on('click', function() {

    if ($(this).text() === 'Show Info -') {
        $(this).text('Show Info +');
    } else if ($(this).text() === 'Show Info +') {
        $(this).text('Show Info -');
    }

    if ($(this).text() === 'Show Error -') {
        $(this).text('Show Error +');
    } else if ($(this).text() === 'Show Error +') {
        $(this).text('Show Error -');
    }

    if ($(this).text() === 'Screenshot -') {
        $(this).text('Screenshot +');
        $(this).next('a.screenshot').find('img').hide();
    } else if($(this).text() === 'Screenshot +') {
        $(this).text('Screenshot -');
        $(this).next('a.screenshot').find('img').show();
    }
});
