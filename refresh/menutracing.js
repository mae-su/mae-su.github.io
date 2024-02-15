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