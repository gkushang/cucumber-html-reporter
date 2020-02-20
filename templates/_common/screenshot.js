$('a.toggle').on('click', function(e) {
    e.preventDefault();

    if (!$(this).hasClass('collapse')) {
        if ($(this).text() === 'Screenshot -') {
            // $(this).text('Screenshot +');
            $(this).next('a.screenshot').find('img').hide();
        } else if($(this).text() === 'Screenshot +') {
            // $(this).text('Screenshot -');
            $(this).next('a.screenshot').find('img').show();
        }
    }

    if ($(this).text().includes(' -')) {
        $(this).text($(this).text().replace(' -', ' +'));
    } else {
        $(this).text($(this).text().replace(' +', ' -'));
    }
});
