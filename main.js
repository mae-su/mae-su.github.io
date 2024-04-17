const bgDelay = 12000
SWIPE_THRESHOLD = 78;
var navLayers;
var debugDiv;
var debugHoverStatus;
var debugLog;
let particlesDiv;
var locale='en';

// const response = await fetch('./locales/fr.json'); for implementation once setLocale is made
const currentLocale = {
  ".red": ".rouge",
  "my name is": "je m'appelle",
  "projects":"projets",
  "about me":"infos",
  "back":"retours",
  
  "twilight velocity":"vitesse",
  "a car speeds past a rain covered bench.":"une voiture passe devant un banc couvert de pluie.",
  "Downtown Millburn, NJ":"Centre-ville de Millburn, New Jersey",
  "destination":"destination",
  "a calm river under the night sky.":"une rivière calme sous les étoiles",
  "Rochester, NY":"Rochester, New York",
  "angular intake":"à un angle",
  "the most advanced assembly i've made.":"",

  "kiosk v2":"kiosque v2",
  "a high end security solution.":"une solution de sécurité, haut de gamme."
};

function delay(time) {//get elements by child of nav div instead??
  return new Promise(resolve => setTimeout(resolve, time));
}
function addBodyClass(name) {
  document.body.classList.add(name)
}

function rmBodyClass(name) {
  document.body.classList.remove(name)
}

function toggleBodyClass(name) {
  document.body.classList.toggle(name)
}

function setMenuSize(size) {
  var i = document.documentElement.style.getPropertyValue("--nav-size");
  document.documentElement.style.setProperty('--nav-size', size)
}

function applyThemePreference() {
  if(window.location.href.endsWith('fr')){ //to be exported to a function
    locale='fr';
    document.getElementById('banner').style.setProperty('--right-max','49%')
    globalTranslate() //for now this is just french. this can be changed later.
    console.log('frenchified')
  }

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
  document.addEventListener("wheel", function (event) {
    if (Math.abs(event.deltaY) > SWIPE_THRESHOLD) {
      if (event.deltaY < 0) {
        returnToLanding()
      } else if (event.deltaY > 0) {
        goToSubPage('aboutMe')
      }
    }
  });
}

function localeTranslate(text){
  if(locale !== 'en'){
    if (currentLocale.hasOwnProperty(text)) {
      return currentLocale[text];
    } else {
      console.log(`"${text}" did not have a translation for the current locale.`)
      return text
    }
  } else{
    return text
  }
  
}
function temporaryRedirectNotice(){ /* some very temporary spaghetti code i implore you to ignore*/
  document.querySelector('.sp_projects #top>div').style.opacity = 0;
  document.querySelector('.sp_projects #mid>div').style.opacity = 0;
  delay(625).then(() => {
    document.documentElement.style.setProperty('--nav-size', '35rem');
    document.documentElement.style.setProperty('--tray-width','3.4rem')
  })
  delay(1000).then(() => {
    document.querySelector('.sp_projects #top>div').innerText = 'Exciting changes are coming soon.';
    document.querySelector('.sp_projects #mid>div').innerHTML = '<span style="font-weight:500">Redirecting to old site...</span>';
    document.querySelector('.sp_projects #top>div').style.opacity = 0.75;
    document.querySelector('.sp_projects #mid>div').style.opacity = 1;
    delay(1000).then(() => {
      delay(1500).then(() => {
        document.querySelector('.sp_projects #top>div').style.opacity = 0;
        document.documentElement.style.setProperty('--maered','#000000')
        document.querySelector('.sp_projects #mid>div').style.opacity = 0;
        
      })
      delay(2000).then(() => {window.location.href = "./projects/"})
      
    })
  })
}

function globalTranslate() {
  const allTextNodes = document.body.querySelectorAll('.l');
  for (const textNode of allTextNodes) {
    
    const text = textNode.textContent.trim();
    
    if (currentLocale.hasOwnProperty(text)) {
      textNode.textContent = localeTranslate(text)
    }
  }
}

function returnToLanding(page) {
  if(page == null){
    document.body.classList = [];
  }
  particlesDiv.classList.add('p_deleting')
  delay(750).then(() => {
    particlesDiv.innerHTML = ''
    leftPosHist = []
    topPosHist = []
    particlesDiv.classList.remove('p_deleting')
  }) 
}

function goToSubPage(page) {
  
  addBodyClass('sp');
  if (!document.body.classList.contains(`sp_${page}`)) {

    addBodyClass(`sp_${page}`);
    clearTimeout(bgTimeoutID);

    if (page === 'aboutMe') {
      updateSelectWidth();
      delay(500).then(() => spawnParticles())
    }
    if (page==='projects'){
      if (particlesDiv != null){
        particlesDiv.classList.add('p_deleting')
      }
      document.body.classList.remove('sp_aboutMe')
      temporaryRedirectNotice()
      
    }
  }
}

let leftPosHist = [];
let topPosHist = [];

function doRejectParticle(left, top) {//check if particle is too close to another one, return true to reject its position
//in other words, prevents overlapping lines and makes their spacing more consistent
  for (const n of leftPosHist) {
    if (Math.abs(n - left) <= 5) {
      return true;
    }
  }

  for (const n of topPosHist) {
    if (Math.abs(n - top) <= 5) {
      return true;
    }
  }

  return false; 
}

function newParticle(left, top, particlesDiv) {
  if (doRejectParticle(left, top)) {
    return; 
  }

  leftPosHist.push(left);
  topPosHist.push(top);

  const div = document.createElement('div');
  const color = Math.random() > 0.5 ? 'var(--maered)' : 'var(--white)';
  div.style.cssText = `
    left: ${left}%;
    top: calc(${top}% + 5rem);
    --opacity: ${Math.random()};
    background-color: ${color};
  `;

  particlesDiv.appendChild(div);
}

function spawnParticles() {
  particlesDiv = document.getElementById('particles');
  for (let i = 0; i < 75; i++) {
    let left = Math.random() * 90 + 5;
    let top = Math.random() * 70 + 10;
    newParticle(left, top, particlesDiv);
  }
}

//shortcuts

document.addEventListener('keydown', function (event) {
  
  // if (event.key === 'd' || event.key === 'D') {
  //   document.body.classList.toggle('light-mode');
  //   localStorage.setItem('lightMode', 'disabled');
  //   if (document.body.classList.contains('light-mode')) {
  //   } else {
  //     localStorage.setItem('lightMode', 'enabled');

  //   }
  // }
  if ((event.key === 'd' || event.key === 'D') && event.altKey && event.shiftKey) {
    document.body.classList.toggle('debug');
    if (document.body.classList.contains('debug')) {
      debugDiv = document.createElement('div')
      debugDiv.classList.add('debugLayer')

      debugHoverStatus = document.createElement('span')
      debugHoverStatus.id = 'debugHoverStatus'

      debugLog = document.createElement('span')
      debugLog.id = 'debugLog'
      debugDiv.appendChild(debugLog)
      debugDiv.appendChild(debugHoverStatus)
      debugDiv.classList.toString()
      document.body.appendChild(debugDiv)
      document.body.addEventListener('mouseover', (event) => {

        debugHoverStatus.innerText = `${event.target} #${event.target.id} .${event.target.classList.toString().replace(' ', ' .')}`
      });
    } else {
      debugDiv.remove()
      document.body.removeEventListener('mouseover', (event) => {
        debugHoverStatus.innerText = `${event.target} #${event.target.id} .${event.target.classList.toString().replace(' ', ' .')}`
      });
    }
  }
});

//on load

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
  delay(750).then(() => {
    document.getElementById(`bgDetails`).style.opacity = 1
  })
  changeBackground()
}, false);

// Background stuff

async function loadBGDetails() {
  const response = await fetch('./media/backgrounds/details.json');
  return await response.json();
}

let bgTimeoutID;
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
    
    titleDiv.textContent = localeTranslate(nextDetails.name);
    descDiv = document.getElementById(`bgDesc`)
    descDiv.textContent = localeTranslate(nextDetails.description);
    settingDiv = document.getElementById(`bgSetting`)
    settingDiv.textContent = localeTranslate(nextDetails.setting);

    currentImage += 1
    bgTimeoutID = setTimeout(() => changeBackground(), bgDelay);
  }
  img.src = nextDetails.url;
};





function navButton(page) {
  document.body.classList.add(page)
  document.body.classList.add('pageOpen')
}