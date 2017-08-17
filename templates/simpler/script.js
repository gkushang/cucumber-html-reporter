window.onload = function() {

    //  Accordion hide/show
    var accordionTitles = document.getElementsByClassName('accordion-title');

    //  Convert node list to array
    Array.prototype.slice.call(accordionTitles).forEach(function(title) {

        title.onclick = function() {

            var content = title.nextElementSibling;
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

    // Update build time to since
    // var buildTimeElem = document.getElementById("buildTime");
    // buildTimeElem.innerHTML = 'Built ' + moment(buildTimeElem.innerHTML).fromNow();
};

function toggleScreenshot(e){
    if(this.innerText === "Screenshot -"){
        this.innerText = "Screenshot +";
        this.nextElementSibling.querySelector(".screenshot").style.display = "none";
    } else {
        this.innerText = "Screenshot -";
        this.nextElementSibling.querySelector(".screenshot").style.display = "block";
    }
}

var toggleEls = document.querySelectorAll("a.toggle");

for(var i = 0; i < toggleEls.length; i++){
    toggleEls[i].addEventListener("click", toggleScreenshot);
}
