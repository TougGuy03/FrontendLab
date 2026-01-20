let directions = [];
let activeIndex = 0;
let directionBtns = [];

const buttons = document.getElementById("direction-buttons");
const title = document.getElementById("direction-title");
const days = document.getElementById("direction-days");
const duration = document.getElementById("direction-duration");
const text = document.getElementById("direction-text");
const imgEl = document.getElementById("direction-img");
const prevBtn = document.getElementById("direction-button-prev");
const nextBtn = document.getElementById("direction-button-next");
const progress = document.getElementById("direction-progress");
const infoBlock = document.querySelector(".directions_inf");
const infoImg = document.querySelector(".directions_inf");



fetch("./data/data1.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    directions = data.directions;

    createButtons();
    showDirection(0); 
  });

function createButtons() {
  for (let i = 0; i < directions.length; i++) {
    const btn = document.createElement("button");
    btn.textContent = directions[i].button;
    btn.className = "direction_btn";

    btn.addEventListener("click", function () {
      showDirection(i);
    });

    buttons.appendChild(btn);
     directionBtns.push(btn);
  }
}

function showDirection(index) {

  activeIndex = index;
  const direction = directions[index];

  infoBlock.style.opacity = 0;
   imgEl.style.opacity = 0;
  setTimeout(() => {


    title.textContent = direction.title;
    days.textContent = "Проходит по: " + direction.days;
    duration.textContent = "Длительность: " + direction.duration;

    text.innerHTML = "";
    for (let i = 0; i < direction.text.length; i++) {
      const p = document.createElement("p");
      p.textContent = direction.text[i];
      text.appendChild(p);
    }

    const percent = ((activeIndex + 1) / directions.length) * 100;
    progress.style.width = percent + "%";

    for (let i = 0; i < directionBtns.length; i++) {
      directionBtns[i].classList.remove("direction_btn_active");
    }
    directionBtns[index].classList.add("direction_btn_active");
    infoBlock.style.opacity = 1;
    imgEl.style.opacity = 1;
  }, 100);

   imgEl.onload = () => {
    setTimeout(() => {
    imgEl.style.opacity = 1;
    },200)
  };

  imgEl.src = direction.imageUrl;
  imgEl.alt = direction.title;
}

prevBtn.addEventListener("click", () => {
  activeIndex--;

  if (activeIndex < 0) {
    activeIndex = directions.length - 1;
  }

  showDirection(activeIndex);
});

nextBtn.addEventListener("click", () => {
  activeIndex++;

  if (activeIndex >= directions.length) {
    activeIndex = 0;
  }

  showDirection(activeIndex);
});
