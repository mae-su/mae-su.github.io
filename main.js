const urlParams = new URLSearchParams(window.location.search);
const defaultInteractableTimeout = 1000;
const defBG = "url(./bg.jpg) no-repeat center";
let resizeTimer;
var isDebugMode = false;
var noredirect = false;
var donotadjust = false;
window.onload = function () {
  dynamicNavTimeline();
  const urlParams = new URLSearchParams(window.location.search);
    if(urlParams.has("about")){
      console.log("aboutme direct");
      delay(2000).then(() => expandAboutMenu());
    }
    if(urlParams.has("debug")){
      console.log("DEBUG ENABLED");
      isDebugMode = true;
    }
    if(urlParams.has("noredir")){
      console.log("DEBUG ENABLED: No redirect.");
      noredirect = true;
      isDebugMode = true;
    }    
    
}

window.addEventListener("resize", () => {
  document.body.classList.add("resize-animation-stopper");
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    document.body.classList.remove("resize-animation-stopper");
  }, 125);
});

document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape' && document.documentElement.classList != "_default _defaultInteractable") {
    console.log("Escaped.")
    siteState();
  }
});

function expandProjectsMenu() {
  siteState('_projectsMenu _menu');
  debug("menu expand called");
  donotadjust = true;
  delay(1500).then(() => {window.location.href = "./projects/"});
}

function expandAboutMenu() {
  siteState('_aboutMenu _menu');
  debug("menu expand called");
}

function dynamicNavTimeline(){
  document.getElementById("nav").style.opacity=1;
  setMenuSize("30vmin");
  delay(6000).then(() => {if(!donotadjust){setMenuSize("27vmin")}});
}

function cacheProjects(){
  
}

//UTILS//

function siteState(state = '_default'){
  document.documentElement.classList = '';
  document.documentElement.classList = state;
  if(state == '_default'){
    document.body.style.background = defBG;
    document.body.style.backgroundSize= "cover";
    delay(defaultInteractableTimeout).then(() => document.documentElement.classList.add('_defaultInteractable'))
  }
  else{
    delay(1300).then(() => document.body.style.background = "rgb(18, 18, 18)");
  }
}

function setMenuSize(size){
  var i = document.documentElement.style.getPropertyValue("--trianglesize");
  document.documentElement.style.setProperty('--trianglesize',size)
  return i;
}

function userParam(term) {
  if (urlParams.has(term)) { return true } else { return false }
}

function debug(msg){
  if(userParam("DEBUG")){
    console.info(msg)
  }
}

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}