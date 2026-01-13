let directions = [];
let activeIndex = 0;

const buttons = document.getElementById("direction-buttons");
const title = document.getElementById("direction-title");
const days = document.getElementById("direction-days");
const duration = document.getElementById("direction-duration");
const text = document.getElementById("direction-text");
const imgEl = document.getElementById("direction-img");
const prevBtn = document.getElementById("direction-button-prev");
const nextBtn = document.getElementById("direction-button-next");
const progress = document.getElementById("direction-progress");

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
  }
}

function showDirection(index) {
  activeIndex = index;
  const direction = directions[index];

  title.textContent = direction.title;
  days.textContent = "Проходит по: " + direction.days;
  duration.textContent = "Длительность: " + direction.duration;

  text.innerHTML = "";
  for (let i = 0; i < direction.text.length; i++) {
    const p = document.createElement("p");
    p.textContent = direction.text[i];
    text.appendChild(p);
  }
  
  imgEl.src = direction.imageUrl;
  imgEl.alt = direction.title;
   const percent = ((activeIndex + 1) / directions.length) * 100;
  progress.style.width = percent + "%";
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
