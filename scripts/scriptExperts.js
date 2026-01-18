let experts = [];
let activeExpertIndex = 0;

const mainImg = document.getElementById("experts-current");
const card = document.getElementById("expert-card");
const carousel = document.getElementById("experts-carousel");

const expertsPrevBtn = document.getElementById("experts-button-prev");
const expertsNextBtn = document.getElementById("experts-button-next");
const expertsProgress = document.getElementById("experts-progress");

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
}


function updateProgress() {
  const percent = ((activeExpertIndex + 1) / experts.length) * 100;
  expertsProgress.style.width = percent + "%";
}

expertsPrevBtn.addEventListener("click", () => {
  activeExpertIndex--;

  if (activeExpertIndex < 0) {
    activeExpertIndex = experts.length - 1;
  }

  showExpert(activeExpertIndex);
});

expertsNextBtn.addEventListener("click", () => {
  activeExpertIndex++;

  if (activeExpertIndex >= experts.length) {
    activeExpertIndex = 0;
  }

  showExpert(activeExpertIndex);
});

