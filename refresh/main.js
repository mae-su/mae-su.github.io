const bgDelay = 12000

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

function addBodyClass(name) {
  document.body.classList.add(name)
}

function rmBodyClass(name) {
  document.body.classList.remove(name)
}

function setMenuSize(size){
  var i = document.documentElement.style.getPropertyValue("--trianglesize");
  document.documentElement.style.setProperty('--trianglesize',size)
  return i;
}

document.addEventListener('keydown', function (event) {
  if (event.key === 'd' || event.key === 'D') {
    document.body.classList.toggle('light-mode');
    localStorage.setItem('lightMode', 'disabled');
    if (document.body.classList.contains('light-mode')) {
    } else {
      localStorage.setItem('lightMode', 'enabled');
    }
  }
});

document.addEventListener('DOMContentLoaded', async function () {
  const isFirefox = !navigator.userAgent.toLowerCase().includes('firefox');
  if (localStorage.getItem('darkMode') === 'enabled') {
    rmBodyClass('light-mode')
    console.log('Restored dark mode preference.')
  } else if (localStorage.getItem('darkMode') === 'disabled') {
    addBodyClass('light-mode');
    console.log('Restored light mode preference.')
  } else if (!(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    rmBodyClass('light-mode')
    console.log('Dark mode preference preferred.')
  }
  if(!isFirefox){
    let resizeTimer;
  
    window.addEventListener("resize", () => { //source: https://css-tricks.com/stop-animations-during-window-resizing/
      document.documentElement.classList.add("resizing");
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        document.documentElement.classList.remove("resizing");
      }, 125);
    });
  }
  setMenuSize("30vmin");
  document.documentElement.classList.add('interactable')
  const bg2div = document.getElementById('bg2');
  delay(750).then(() => bg2div.style.opacity = 1)
  changeBackground()
}, false);

async function loadBGDetails() {
  const response = await fetch('./css/backgrounds/details.json');
  return await response.json();
}

let currentBackground = 1;

async function changeBackground() {
  const nextBackground = currentBackground === 1 ? 2 : 1;

  const details = await loadBGDetails();
  const nextDetails = details[(currentBackground - 1) % details.length];

  const img = new Image();
  img.onload = function () {
    nextBGDiv = document.getElementById(`bg${nextBackground}`)
    currentBGDiv = document.getElementById(`bg${currentBackground}`)
    nextBGDiv.style.backgroundImage = `url(${nextDetails.url})`;

    nextBGDiv.style.opacity = 1;
    currentBGDiv.style.opacity = 0;

    currentBackground = nextBackground;
    delay(bgDelay).then(() => changeBackground())
  }
  img.src = nextDetails.url;
};





function navButton(page) {
  document.body.classList.add(page)
  document.body.classList.add('pageOpen')
}