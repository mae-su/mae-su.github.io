(function () { //https://discourse.webflow.com/t/force-refresh-page-when-user-taps-browser-back-button/159352/2 removes vanilla JS cached states
	window.onpageshow = function(event) {
		if (event.persisted) {
			window.location.reload();
		}
	};
})();
var cesiumindex = 2;
var lastInteract = -100;
var projects = ['machine room kiosk v2','machine room kiosk v1','signs @ mhs'],
    motto = ["a lighter and more complete security kiosk.<br>","a new gandalf for the machine room.", 'some CNC machined signs for  millburn high school.'],
    signpics = ['url(sign-1.jpg)', 'url(sign-2.jpg)'],
    kioskpics = ['url(kiosk-1.jpg)', 'url(kiosk-2.jpg)', 'url(kiosk-3.jpg)'],
    kioskv2pics = ['url(kioskv2.webp)']
    bodies = [kioskv2body,signbody, kioskbody],
    images = [kioskv2pics,kioskpics, signpics],
    index = 0;
window.onload = function () {
    setTimeout(() => { document.getElementById("curtain").classList.remove("active"); }, 100);
    setTimeout(() => { document.getElementById("curtain").classList.add("hidden"); }, 1750);
    newDisplay(0);
    document.body.scrollTo(17, 0);
}
function fadeTransition(text, container, time, newcontent) {
    container.style.opacity = 0;
    container.style.visibility = "visible";
    setTimeout(() => {
        text.innerHTML = newcontent;
        container.style.opacity = 1;
    }, time);
}
function newDisplay(ind) {
    
    const tel = document.querySelector('#title');
    const mel = document.querySelector('#motto');
    const mts = new TextScramble(mel);
    const tts = new TextScramble(tel);

    if (images[ind][0] == "staticcolor") {
        document.getElementById("background").style.opacity = "0";
        setTimeout(() => {
            document.getElementById("cesiumLearnMore").style.opacity = "1";
        }, 1000);
        setTimeout(() => {
            document.getElementById("cesiumCAD").style.opacity = "1";
        }, 1500);

    } else {
        document.getElementById("background").style.opacity = "1";
        document.getElementById("cesiumLearnMore").style.opacity = "0";
        document.getElementById("cesiumCAD").style.opacity = "0";
        document.getElementById("background").style.backgroundImage = images[ind][0];
    }

    tts.setText(projects[ind]);
    mts.setText(motto[ind]);
    if (bodies[ind] == 'NULL') { document.getElementById("scrollover").style.opacity = 0;
    setTimeout(() => {
        document.getElementById("scrollover").style.visibility = "hidden";
    }, 3000);
    }
    else { 
        fadeTransition(document.getElementById("headline"), document.getElementById("scrollover"), 1000, bodies[ind]);
    }


    //fadeTransition(document.getElementById("title"),1000,projects[ind]);
    //fadeTransition(document.getElementById("motto"),1000,motto[ind]);
}


function left() {
    if (index == 0) {
        index = projects.length - 1;
    } else {
        --index;
    }
    console.log(index);
    newDisplay(index);
    lastInteract = Math.floor(Date.now() / 1000);
}

function right() {
    if (index == (images.length - 1)) { index = 0 } else { ++index; }
    console.log(index);
    newDisplay(index);
    lastInteract = Math.floor(Date.now() / 1000);
}

function exittocesium(opt) {
    document.getElementById("curtain").classList.remove("hidden");
    document.getElementById("curtain").classList.add("active");
    
    if(opt = 0){
        setTimeout(() => {
            window.location.href = '../cesium/';;
        }, 500);
    }
    if(opt = 1){
        setTimeout(() => {
            window.location.href = '../cesium/index.html?cad';
        }, 500);
    }
}
//sidebar
function openNav() {
    var sidebarButton = document.getElementById("sidebarButton");

    sidebarButton.classList.remove("tracking-in-expand");
    sidebarButton.classList.add("tracking-out-contract");
    setTimeout(() => { sidebarButton.style.visibility = "hidden"; document.getElementById("sidebar").style.width = "200px"; }, 250);
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
    var sidebarButton = document.getElementById("sidebarButton");
    sidebarButton.classList.remove("tracking-out-contract");
    document.getElementById("sidebar").style.width = "0";
    setTimeout(() => { sidebarButton.style.visibility = "visible"; sidebarButton.classList.add("tracking-in-expand"); }, 250);
}