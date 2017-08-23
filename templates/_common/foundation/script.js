window.onload = function() {

    //  Accordion hide/show
    var accordionTitles = document.getElementsByClassName('accordion-title');

    //  Convert node list to array
    Array.prototype.slice.call(accordionTitles).forEach(function(title) {

        title.onclick = function() {

            var content = nextElement(title);
            var style = window.getComputedStyle(content);
            var display = style.getPropertyValue('display');

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
function nextElement(elem) {
    do {
        elem = elem.nextSibling;
    } while (elem && elem.nodeType !== 1);

    return elem;
}
