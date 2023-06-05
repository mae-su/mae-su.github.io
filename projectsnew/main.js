const CACHE_NAME = 'red-projects-cache';
// Create a new Image object
var img = new Image();

// Set the src attribute to the URL of the cached image
img.src = "./assets/drive.jpg";

// Add an onload event listener to the Image object
window.onload = function () {
  // Get a reference to the image container element
  var container = document.getElementById("image");

  // Create a new img element and set its src attribute to the cached image URL
  var cachedImage = document.createElement("img");
  cachedImage.src = img.src;

  // Append the img element to the container element
  container.appendChild(cachedImage);
}