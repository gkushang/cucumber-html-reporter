function toggleScreenshot(e) {
  if (this.innerText === 'Screenshot -') {
    this.innerText = 'Screenshot +';
    this.nextElementSibling.style.display = 'none';
  } else {
    this.innerText = 'Screenshot -';
    this.nextElementSibling.style.display = 'block';
  }
}

let toggleEls = document.querySelectorAll('a.toggle');

for (let i = 0; i < toggleEls.length; i++) {
  toggleEls[i].addEventListener('click', toggleScreenshot);
}
