const $imgs = document.querySelectorAll(".gal-wrapper img");
let currentImage = $imgs.length - 1;

const slider = (images, currentImage) => {
  images.forEach((el) => {
    return el.classList.add("hide-slide");
  });
  images[currentImage].classList.remove("hide-slide");
};

document.querySelector(".prev").addEventListener("click", () => {
  if (!currentImage) {
    currentImage = $imgs.length - 1;
  } else {
    currentImage--;
  }
  slider($imgs, currentImage);
});

document.querySelector(".next").addEventListener("click", () => {
  if (currentImage + 1 === $imgs.length) {
    currentImage = 0;
  } else {
    currentImage++;
  }
  slider($imgs, currentImage);
});
