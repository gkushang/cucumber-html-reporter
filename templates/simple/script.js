function toggleScreenshot(e){
    if(this.innerText === "Screenshot -"){
        this.innerText = "Screenshot +";
        this.nextElementSibling.style.display = "none";
    } else {
        this.innerText = "Screenshot -";
        this.nextElementSibling.style.display = "block";
    }
}

var toggleEls = document.querySelectorAll("a.toggle");

for(var i = 0; i < toggleEls.length; i++){
    toggleEls[i].addEventListener("click", toggleScreenshot);
}
