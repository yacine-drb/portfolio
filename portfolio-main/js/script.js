// LANGUAGE TOGGLE
const toggleBtn = document.getElementById("langToggle");
let currentLang = "en";

toggleBtn.addEventListener("click", () => {
  currentLang = currentLang === "en" ? "fr" : "en";
  toggleBtn.textContent = currentLang === "en" ? "FR" : "EN";

  document.querySelectorAll("[data-en]").forEach(el => {
    el.textContent = el.getAttribute(`data-${currentLang}`);
  });
});

// GALLERY
const galleries = [
["assets/projects/rayanox/1.jpg","assets/projects/rayanox/2.jpg","assets/projects/rayanox/3.jpg"],
["assets/projects/gestiflotte/1.jpg","assets/projects/gestiflotte/2.jpg","assets/projects/gestiflotte/3.jpg"],
["assets/projects/tradefair/1.jpg","assets/projects/tradefair/2.jpg","assets/projects/tradefair/3.jpg"]
];

let currentGallery = 0;
let currentIndex = 0;

function openGallery(index){
currentGallery=index;
currentIndex=0;
document.getElementById("galleryModal").style.display="flex";
document.getElementById("modalImage").src=galleries[index][0];
}

function closeGallery(){
document.getElementById("galleryModal").style.display="none";
}

function changeImage(direction){
currentIndex+=direction;
if(currentIndex<0) currentIndex=galleries[currentGallery].length-1;
if(currentIndex>=galleries[currentGallery].length) currentIndex=0;
document.getElementById("modalImage").src=galleries[currentGallery][currentIndex];
}
