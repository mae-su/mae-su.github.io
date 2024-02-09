const bgDelay = 12000
var navLayers;

function delay(time) {//get elements by child of nav div instead??
  return new Promise(resolve => setTimeout(resolve, time));
}
function addBodyClass(name) {
  document.body.classList.add(name)
}

function rmBodyClass(name) {
  document.body.classList.remove(name)
}

function setMenuSize(size) {
  var i = document.documentElement.style.getPropertyValue("--nav-size");
  document.documentElement.style.setProperty('--nav-size', size)
}

// function repaintMenu() {// paints an SVG polygon over each of the menu's hover regions
//   var i = document.documentElement.style.getPropertyValue("--tray-outer-point-calc");
//   const layers = ['top','mid']
//   console.log(layers)
  
//   for (let i = 0; i < layers.length; i++) {

//       const computedStyle = window.getComputedStyle(document.getElementById(layers[i]));
//       console.log(computedStyle.getPropertyValue('clip-path'))
//       const hoverPointsRaw = computedStyle.getPropertyValue('clip-path').match(/(?:[-+]?(?:\d*\.\d+|\d+)(?:%|px)?)/g);

//       if (hoverPointsRaw !== null) {
//         console.log(hoverPointsRaw);
//         let hoverPoints = []
//         const constant = 4.8;
        
//         for (let term of hoverPointsRaw) {
//           if (term.includes('px')) {
//             const value = parseFloat(term);
//             hoverPoints.push(value);
//           } else if (term.includes('%')) {
//             const value = parseFloat(term.replace('%', '')) * constant;
//             hoverPoints.push(value);
//           }
//         }
//         console.log(hoverPoints)
//         svgNS = "http://www.w3.org/2000/svg"
//         var hoverSVG = document.createElementNS(svgNS, "svg");
//         hoverSVG.setAttribute("width", "100%");
//         hoverSVG.setAttribute("height", "100%");

//         const hoverPoly = document.createElementNS(svgNS, "polygon");
//         hoverPoly.setAttribute("points", hoverPoints.join(" "));
//         hoverSVG.appendChild(hoverPoly);
        
//         hoverSVG.classList.add('hoverBound')
//         document.getElementById("nav").appendChild(hoverSVG);
//       }
      
//   }
// }

function applyThemePreference() {
  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  }
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
  window.addEventListener('scroll', function () {
    const scrolledPast90vh = window.scrollY > 0.1;
    const navDiv = this.document.getElementById('nav')
    if (scrolledPast90vh) {
      addBodyClass('aboutMe')
      addBodyClass('pageOpen')
      this.document.getElementById('stretcher').scrollIntoView({behavior: 'smooth'});
    } else{
      rmBodyClass('aboutMe')
      rmBodyClass('pageOpen')
    }
  });
}

function goToSubPage(page) {
  addBodyClass('subPageOpen');
  addBodyClass(`sp_${page}`);
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
  applyThemePreference()
  // requestIdleCallback(repaintMenu)

  let resizeTimer;
  window.addEventListener("resize", () => { //source: https://css-tricks.com/stop-animations-during-window-resizing/
    document.documentElement.classList.add("resizing");
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      document.documentElement.classList.remove("resizing");
    }, 125);
  });

  const bg2div = document.getElementById('bg2');
  delay(750).then(() => {
    bg2div.style.opacity = 1;
    document.getElementById(`bgDetails`).style.opacity = 1
  })
  changeBackground()
}, false);

async function loadBGDetails() {
  const response = await fetch('./css/backgrounds/details.json');
  return await response.json();
}

let currentBackground = 1;
let currentImage = 0;
async function changeBackground() {
  const nextBackground = currentBackground === 1 ? 2 : 1;
  const details = await loadBGDetails();
  if (currentImage === details.length) {
    currentImage = 0;
  }
  const nextDetails = details[currentImage];

  const img = new Image();
  img.onload = function () {
    nextBGDiv = document.getElementById(`bg${nextBackground}`)
    currentBGDiv = document.getElementById(`bg${currentBackground}`)

    nextBGDiv.style.backgroundPosition = nextDetails.alignment
    nextBGDiv.style.backgroundSize = "cover"
    nextBGDiv.style.backgroundImage = `url(${nextDetails.url})`;


    nextBGDiv.style.opacity = 1;
    currentBGDiv.style.opacity = 0;
    currentBackground = nextBackground;

    titleDiv = document.getElementById(`bgTitle`)
    titleDiv.textContent = nextDetails.name;
    descDiv = document.getElementById(`bgDesc`)
    descDiv.textContent = nextDetails.description;
    settingDiv = document.getElementById(`bgSetting`)
    settingDiv.textContent = nextDetails.setting;

    currentImage += 1
    delay(bgDelay).then(() => changeBackground())
  }
  img.src = nextDetails.url;
};





function navButton(page) {
  document.body.classList.add(page)
  document.body.classList.add('pageOpen')
}