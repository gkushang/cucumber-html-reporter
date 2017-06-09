window.onload = function() {

    //  Accordion hide/show
    var accordionTitles = document.getElementsByClassName('accordion-title');

    //  Convert node list to array
    Array.prototype.slice.call(accordionTitles).forEach(function(title) {

        title.onclick = function() {
            var content = next(title),
                style = window.getComputedStyle(content),
                display = style.getPropertyValue('display');

            if (display === 'block') {
                content.style.display = 'none';
            } else {
                content.style.display = 'block';
            }
            return false;
        }
    });

    //  Update build time to since
    var buildTimeElem = document.getElementById("buildTime");
    buildTimeElem.innerHTML = 'Built ' + moment(buildTimeElem.innerHTML).fromNow();
};

/* 
 Credit to John Resig for this function 
 taken from Pro JavaScript techniques 
 */
function next(elem) {
    do {
        elem = elem.nextSibling;
    } while (elem && elem.nodeType !== 1);
    return elem;
}

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
