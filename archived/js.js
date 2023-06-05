
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}
/* If browser back button was used, flush cache */
(function () { //https://discourse.webflow.com/t/force-refresh-page-when-user-taps-browser-back-button/159352/2 removes vanilla JS cached states
	window.onpageshow = function(event) {
		if (event.persisted) {
			window.location.reload();
		}
	};
})();
function showElement(elem) {
    console.log(" showing " + elem);
    elem.classList.remove("opacity-out");
    elem.style.opacity = "1";
    elem.classList.add("opacity-in");
}
function hideElement(elem) {
    console.log(" hiding " + elem);
    elem.classList.remove("opacity-in");
    elem.classList.add("opacity-out")
    elem.style.opacity = "0";
}

function checkdebug(){
    const urlParams = new URLSearchParams(window.location.search);
    if(urlParams.has('debug')){
        console.log("DEBUG MODE ENABLED")
        return true;
    }
    else{
        return false;
    }    
}
function checkhighlights(){
    const urlParams = new URLSearchParams(window.location.search);
    if(urlParams.has('highlights')){
        console.log("jumping to highlights")
        return true;
    }
    else{
        return false;
    }    
}
function checkbrief(){
    const urlParams = new URLSearchParams(window.location.search);
    if(urlParams.has('b')){
        console.log("brief mode")
        return true;
    }
    else{
        return false;
    }    
}

function expandInfo(opt) {
    hideElement(document.getElementById("motto"));
    hideElement(document.getElementById("greeting"));
    hideElement(document.getElementById("socials"));
    let root = document.documentElement;
    
    switch(opt){
        case 0:
            console.log("case 0")
            document.getElementsByClassName("aboutnav")[0].style.top = "41%";
            document.getElementById("aboutmeDesc").classList.remove("disableMouse");
            document.getElementById("highlightsDesc").classList.add("disableMouse");
            document.getElementById("experienceDesc").classList.add("disableMouse");
            document.getElementById("aboutme").style.opacity = 1;
            document.getElementById("highlights").classList.remove("opacity-in");
            document.getElementById("highlights").style.opacity = 0.5;
            document.getElementById("experience").classList.remove("opacity-in");
            document.getElementById("experience").style.opacity = 0.5;
            document.getElementById("highlightsDesc").style.opacity = 0;
            document.getElementById("experienceDesc").style.opacity = 0;
            setTimeout(() => {document.getElementById("aboutmeDesc").style.opacity = 1;}, 400);
            document.body.style.backgroundImage = 'url("aboutme.jpg")'
            root.style.setProperty('--text','#a3e687');
            root.style.setProperty('--emphasis','#a3e687');
            break;
        case 1:
            console.log("case 1")
            document.getElementsByClassName("aboutnav")[0].style.top = "36%";
            document.getElementById("aboutmeDesc").classList.add("disableMouse");
            document.getElementById("highlightsDesc").classList.remove("disableMouse");
            document.getElementById("experienceDesc").classList.add("disableMouse");
            document.getElementById("highlights").style.opacity = 1;
            document.getElementById("aboutme").classList.remove("opacity-in");
            document.getElementById("aboutme").style.opacity = 0.5;
            document.getElementById("experience").classList.remove("opacity-in");
            document.getElementById("experience").style.opacity = 0.5;
            setTimeout(() => {document.getElementById("highlightsDesc").style.opacity = 1;}, 400);
            document.getElementById("experienceDesc").style.opacity = 0;
            document.getElementById("aboutmeDesc").style.opacity = 0;
            document.body.style.backgroundImage = 'url("drive.jpg")'
            root.style.setProperty('--text','#ACB2D4');
            root.style.setProperty('--emphasis','#ACB2D4');
            break;
        case 2:
            console.log("case 2")
            document.getElementsByClassName("aboutnav")[0].style.top = "45%";
            document.getElementById("aboutmeDesc").classList.add("disableMouse");
            document.getElementById("highlightsDesc").classList.add("disableMouse");
            document.getElementById("experienceDesc").classList.remove("disableMouse");
            document.getElementById("experience").style.opacity = 1;
            document.getElementById("aboutme").classList.remove("opacity-in");
            document.getElementById("aboutme").style.opacity = 0.5;
            document.getElementById("highlights").classList.remove("opacity-in");
            document.getElementById("highlights").style.opacity = 0.5;
            document.getElementById("highlightsDesc").style.opacity = 0;
            setTimeout(() => {document.getElementById("experienceDesc").style.opacity = 1;}, 400);
            document.getElementById("aboutmeDesc").style.opacity = 0;
            document.body.style.backgroundImage = 'url("experience.jpg")'
            root.style.setProperty('--text','#ffffff');
            root.style.setProperty('--emphasis','#ffffff');
            break;
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
function toggleBack() {
    var socials = document.getElementsByClassName("socials");
    for (var i = 0; i < socials.length; i++) {
        socials.item(i).classList.toggle('z-10');
    }
    document.getElementById("sidebarButton").classList.toggle('z-10');
    var sidenav = document.getElementsByClassName("sidenav");
    for (var i = 0; i < sidenav.length; i++) {
        sidenav.item(i).classList.toggle('z1')
    }
    for (var i = 0; i < sidenav.length; i++) {
        sidenav.item(i).classList.toggle('z-10')
    }
    document.getElementById("introduction").classList.toggle("z-10");
    document.getElementsByClassName("aboutnav")[0].classList.toggle('z-10');
    document.getElementById("splash").style.zIndex = 100;
    
}

function redirect(redir){
  window.location.href = redir;
}

function closepage(redir) { //send elements back for curtain to overlay and show splash
    var curtain = document.getElementById('curtain');
    toggleBack();
    curtain.classList.toggle('active');
    var splash = document.getElementById("splash");
    setTimeout(() => {
        splash.classList.add("tracking-in-expand");
    }, 500);
    setTimeout(() => {
        splash.classList.remove("tracking-in-expand");
        splash.classList.add("tracking-out-contract");
    }, 2500);
    console.log("page closed. handing over");
    setTimeout(() => {
        window.location.href = redir;
    }, 3000);
}
function run() {
    let root = document.documentElement;
    root.style.setProperty('--text','#d6c9bf');
    root.style.setProperty('--emphasis','#d6c9bf');
    const greetings = ['hey!', 'hi!', 'hey there!', 'hi!!'];
    const randomGreeting = Math.floor(Math.random() * greetings.length);
    const navdelay = 100;
    const skiptoHighlights = checkhighlights();
    var fullType = 7500 + (greetings[randomGreeting].length * 2 * 55 + navdelay);
    const cls = {
        introduction : document.getElementById('introduction'),
    }
    const obj = {
        greeting : document.getElementById('greeting'),
    }
    const debug = checkdebug();
    const brief = checkbrief();
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        // true for mobile device
        document.getElementById("projectsnav").remove();
        // entirely removes the projects page
        document.getElementById("highlights").innerHTML = "<br><b>highlights & links</b>"
        document.getElementById("experience").innerHTML = "<br><br>experience"
      }
      if(!(brief||skiptoHighlights)){
        document.getElementById("sensitive").remove()
        document.getElementById("sensitive2").remove()
    }
    var viewport = document.querySelector('meta[name="viewport"]');

    if (viewport) {
    viewport.content = "initial-scale=1";
    }
    document.getElementById("aboutmeDesc").classList.add("disableMouse");
    document.getElementById("highlightsDesc").classList.add("disableMouse");
    document.getElementById("experienceDesc").classList.add("disableMouse");
    
    
    cls.introduction.style.opacity = "0";
    
    console.log(" typing " + greetings[randomGreeting]);
    setTimeout(() => {showElement(document.getElementById("sidebarButton"));},500);
    if(debug||skiptoHighlights||brief){fullType=0}
    if(skiptoHighlights){
        showElement(introduction);
    } else{
        
        if(brief){
            showElement(introduction);
        } else{
            setTimeout(() => {
                var typewriter = new Typewriter(obj.greeting, {
                    loop: false,
                    delay: 55,
                });
                cls.introduction.style.opacity = "1";
                typewriter
                    .pauseFor(1000)
                    .typeString(greetings[randomGreeting])
                    .pauseFor(1500)
                    .deleteChars(greetings[randomGreeting].length)
                    .pauseFor(375)
                    .typeString("my name is mae.")
                    .pauseFor(375)
                    .start();
            }, 1150);
            setTimeout(() => {showElement(document.getElementById("github"));},750);
            setTimeout(() => { showElement(document.getElementById("instagram")); }, 1000);
            setTimeout(() => { showElement(document.getElementById("discord")); }, 1250);
        }
        
        setTimeout(() => {
            showElement(document.getElementById("motto"))
        }, fullType);
        
    }
    setTimeout(() => {showElement(document.getElementById("aboutme"))}, fullType );
    setTimeout(() => {showElement(document.getElementById("highlights"))}, fullType + 250 );
    setTimeout(() => {showElement(document.getElementById("experience"))}, fullType + 500 );
    
    if(skiptoHighlights){expandInfo(1)}
}
