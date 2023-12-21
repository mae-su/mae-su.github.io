document.title = ".blue | nonstandard.";
let pageInitTime = new Date();
const STREAM_TIMING = 5000;
SWIPE_THRESHOLD = 78;

function introComplete() {
  let currentTime = new Date();
  return (currentTime - pageInitTime >= STREAM_TIMING);
}

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
z}

function addBodyClass(name) {
  document.body.classList.add(name)
}

function rmBodyClass(name) {
  document.body.classList.remove(name)
}

document.addEventListener('keydown', function (event) {
  if (event.key === 'd' || event.key === 'D') {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
      localStorage.setItem('darkMode', 'enabled');
    } else {
      localStorage.setItem('darkMode', 'disabled');
    }
  }
});

async function fetchHTMLWithProgress(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "text";
    xhr.addEventListener("progress", (event) => {
      if (event.lengthComputable) {
        const percentComplete = Math.round((event.loaded / event.total) * 100);
        console.log(`Loading: ${percentComplete}%`);
      } else {
        console.log("Loading...");
      }
    });
    xhr.addEventListener("load", () => {
      resolve(xhr.response);
    });
    xhr.addEventListener("error", () => {
      reject(new Error("There was a network error."));
    });
    xhr.send();
  });
}

async function loadSiteContent(stream_div){
  const fetchedHTML = await fetchHTMLWithProgress("./content/stream.html");
  if (introComplete()) {
    injectSiteContent(stream_div,fetchedHTML)
  } else {
    let remainingTime = STREAM_TIMING - (new Date() - pageInitTime);
    console.log(`Time to inject: ${remainingTime}`);
    setTimeout(() => {
      injectSiteContent(stream_div,fetchedHTML)
    }, remainingTime);
  }  
}

document.addEventListener('DOMContentLoaded', async function () {
  if (localStorage.getItem('darkMode') === 'enabled') {
    addBodyClass('dark-mode');
    console.log('Restored dark mode preference.')
  } else if (localStorage.getItem('darkMode') === 'disabled') {
    rmBodyClass('dark-mode')
    console.log('Restored light mode preference.')
  } else if (!(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    addBodyClass('dark-mode')
    console.log('Dark mode preference preferred.')
  }
  const DEBUG = String(document.location.href).includes('debug.html');
  var stream_div = document.getElementById('stream')
  if (DEBUG) {
    window.onerror = function (error) { document.title = ".blue | error"; };
    console.log('Debug mode detected.')
    if (String(document.location.href).includes('inject')) {
      console.log('-- Simulating injection --')
      document.title = ".b | simulating injection";
      console.log('- Removing \'stream\' elements.')
      stream_div.innerHTML = ''
      console.log('- Attempting to fetch ./content/stream.html')
      await loadSiteContent(stream_div)
    }
  } else{
    loadSiteContent(stream_div)
  }
  

}, false);

function injectSiteContent(stream_div, fetchedHTML){
  stream_div.innerHTML += fetchedHTML;
  rmBodyClass('_preMainScreen')
  document.addEventListener("wheel", function(event) {
    console.log(event.deltaX)
    if (Math.abs(event.deltaX)>SWIPE_THRESHOLD){
      if (event.deltaX > 0) {
        console.log("Swiped left");
        addBodyClass('_projectsView');
      } else if (event.deltaX < 0) {
        console.log("Swiped right");
        rmBodyClass('_projectsView');
      }
    }
  });
  
}


function preloadVideo(url) {
  const video = document.createElement('video');
  video.src = url;
  video.controls = true;
  video.preload = 'auto';

  let intervalId;

  // Function to update progress
  const updateProgress = () => {
      if (video.buffered.length > 0) {
          const bufferedEnd = video.buffered.end(video.buffered.length - 1);
          const duration = video.duration;
          const percent = (bufferedEnd / duration) * 100;
          console.log(`Loading: ${percent.toFixed(2)}%`);

          if (percent >= 100) {
              clearInterval(intervalId);
              console.log('Video fully loaded');
              document.body.appendChild(video);
          }
      }
  };

  intervalId = setInterval(updateProgress, 500);

}
