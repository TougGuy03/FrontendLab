const slides = [
  "./img/section1/mainImg1.jpg",
  "./img/section1/mainImg2.jpg",
  "./img/section1/mainImg3.jpg",
];

let slideIndex = 0;

const img = document.getElementById("main-section-img");
const counter = document.getElementById("main-section-counter");
const mainProgress = document.getElementById("main-section-slider-progress");
const prev = document.getElementById("main-section-prev");
const next = document.getElementById("main-section-next");

function renderSlide() {
  counter.textContent = slideIndex + 1;

  mainProgress.style.width = ((slideIndex + 1) / slides.length) * 100 + "%";

  img.style.opacity = 0;
  setTimeout(() => {
    img.src = slides[slideIndex];
    img.onload = () => (img.style.opacity = 1);
  }, 150);
}

prev.addEventListener("click", () => {
  slideIndex = (slideIndex - 1 + slides.length) % slides.length;
  renderSlide();
});

next.addEventListener("click", () => {
  slideIndex = (slideIndex + 1) % slides.length;
  renderSlide();
});

renderSlide();