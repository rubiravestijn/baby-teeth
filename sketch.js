let img2, img3, img4, cryingBaby;
let draggingImg = null;
let offsetX, offsetY;
let img2Inside = false, img4Inside = false; // Track if both images are inside

document.body.style.backgroundColor = "rgb(255, 233, 168)"; // Set background color

// Function to check if two images overlap
function checkOverlap(img) {
  const cryingBabyRect = cryingBaby.getBoundingClientRect();
  const imgRect = img.getBoundingClientRect();

  return (
    imgRect.left < cryingBabyRect.right &&
    imgRect.right > cryingBabyRect.left &&
    imgRect.top < cryingBabyRect.bottom &&
    imgRect.bottom > cryingBabyRect.top
  );
}

// Function to check if both images are inside when the user stops dragging
function checkRedirect() {
  if (img2Inside && img4Inside) {
    setTimeout(() => {
      window.location.href = "newpage.html"; // Redirect to new page
    }, 500); // Small delay for smoother experience
  }
}

// Function to make an image draggable
function makeDraggable(img) {
  img.style.position = "absolute";
  img.style.cursor = "grab"; 

  img.addEventListener("pointerdown", (event) => {
    draggingImg = img;
    offsetX = event.clientX - img.offsetLeft;
    offsetY = event.clientY - img.offsetTop;

    img.style.cursor = "grabbing";
    event.preventDefault();
  });

  document.addEventListener("pointermove", (event) => {
    if (draggingImg) {
      draggingImg.style.left = `${event.clientX - offsetX}px`;
      draggingImg.style.top = `${event.clientY - offsetY}px`;

      // Update overlap status for babytooth and tooth2
      if (draggingImg === img2) img2Inside = checkOverlap(img2);
      if (draggingImg === img4) img4Inside = checkOverlap(img4);
    }
  });

  document.addEventListener("pointerup", () => {
    if (draggingImg) {
      draggingImg.style.cursor = "grab"; 
      
      // Check overlap one last time after dragging stops
      if (draggingImg === img2) img2Inside = checkOverlap(img2);
      if (draggingImg === img4) img4Inside = checkOverlap(img4);

      checkRedirect(); // Only redirect if both images are inside
    }
    draggingImg = null;
  });
}

// 🔹 Add crying baby gif (not draggable)
cryingBaby = document.createElement("img");
cryingBaby.src = "crying-baby.gif";
cryingBaby.style.position = "absolute";
cryingBaby.style.width = "800px";
cryingBaby.style.left = "50px"; 
cryingBaby.style.top = "50px";
document.body.appendChild(cryingBaby);

// 🔹 Create and add the second image (draggable)
img2 = document.createElement("img");
img2.src = "babytooth.png";
img2.style.width = "100px";
img2.style.left = "900px";
img2.style.top = "100px";
document.body.appendChild(img2);
makeDraggable(img2);

// 🔹 Create and add the third image (not needed for check)
img3 = document.createElement("img");
img3.src = "dummy.png";
img3.style.width = "600px";
img3.style.left = "150px";
img3.style.top = "350px";
document.body.appendChild(img3);
makeDraggable(img3);

// 🔹 Create and add the fourth image (draggable)
img4 = document.createElement("img");
img4.src = "tooth2.png";
img4.style.width = "120px";
img4.style.left = "1100px";
img4.style.top = "100px";
document.body.appendChild(img4);
makeDraggable(img4);