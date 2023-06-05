window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}
window.onload = function () {
    setTimeout(() => { document.getElementById("curtain").classList.remove("active"); }, 100);
    setTimeout(() => { document.getElementById("curtain").classList.add("hidden"); }, 1750);
    setTimeout(() => {document.getElementById("sidebarButton").style.opacity=1;},2250);
    
}
function jumpCad(){
    const urlParams = new URLSearchParams(window.location.search);
    if(urlParams.has('cad')){
        console.log("jump to cad")
        setTimeout(() => {document.getElementById("cadEmbed").scrollIntoView({behavior: 'smooth'});},2000);
    }
}

function exittopage(href) {
    document.getElementById("curtain").classList.remove("hidden");
    document.getElementById("curtain").classList.add("active");
    setTimeout(() => {
        window.location.href = href;
    }, 1000);
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