let experts = [];
let activeExpertIndex = 0;

const mainImg = document.getElementById("experts-current");
const card = document.getElementById("expert-card");
const carousel = document.getElementById("experts-carousel");

const mainPrevBtn = document.getElementById("experts-main-prev");
const mainNextBtn = document.getElementById("experts-main-next");
const mainProgressExperts = document.getElementById("experts-main-progress");

const carPrevBtn = document.getElementById("experts-car-prev");
const carNextBtn = document.getElementById("experts-car-next");
const carProgress = document.getElementById("experts-car-progress");
const expertsMain = document.querySelector(".experts_main");


fetch("./data/data4.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    experts = data.experts;

    createCarousel();
    showExpert(0);
  });

function createButton(i){
    const btn = document.createElement("button");
    btn.className = "experts_item";
    btn.type = "button";

    const img = document.createElement("img");
    img.src = experts[i].photo;
    img.alt = experts[i].name;
    img.className = "experts_item_img";

    const name = document.createElement("span");
    name.className = "experts_item_name";
    name.textContent = experts[i].name;

    btn.appendChild(img);
    btn.appendChild(name);

    btn.addEventListener("click", function () {
      showExpert(i);
    });
    return btn;
}

function createCarousel() {
  carousel.innerHTML = "";

  for (let step = 0; step < experts.length; step++) {
    const index = (activeExpertIndex + step) % experts.length;
    if(index!==activeExpertIndex){
        carousel.appendChild(createButton(index));
    }
  }
}

function showExpert(index) {
  activeExpertIndex = index;
  const expert = experts[index];

  expertsMain.style.opacity = "0";
  carousel.style.opacity = "0";

  setTimeout(() => {
    mainImg.src = expert.photo;
    mainImg.alt = expert.name;

    card.innerHTML = `
      <div class="experts_card_container">
        <h3 class="experts_card_title">${expert.name}</h3>
        <p class="experts_card_text">${expert.description}</p>
      </div>
    `;

    updateProgress();
    createCarousel();

    expertsMain.style.opacity = "1";
    carousel.style.opacity = "1";
  }, 500);
}



function updateProgress() {
  const percent = ((activeExpertIndex + 1) / experts.length) * 100;
  mainProgressExperts.style.width = percent + "%";
  carProgress.style.width = percent + "%";
}

function expertsPrev() {
  activeExpertIndex = (activeExpertIndex - 1 + experts.length) % experts.length;
  showExpert(activeExpertIndex);
}

function expertsNext() {
  activeExpertIndex = (activeExpertIndex + 1) % experts.length;
  showExpert(activeExpertIndex);
}

mainPrevBtn.addEventListener("click",  expertsPrev);
mainNextBtn.addEventListener("click", expertsNext);
carPrevBtn.addEventListener("click",  expertsPrev);
carNextBtn.addEventListener("click", expertsNext);

