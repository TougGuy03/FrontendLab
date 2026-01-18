
  let reviews = [];
  let reviewActiveIndex = 0;

  const reviewCarousel = document.getElementById("review-carousel");
  const btnReviewPrev = document.getElementById("review-button-prev");
  const btnReviewNext = document.getElementById("review-button-next");
  const reviewProgress = document.getElementById("reviews-progress");

  let track;
  let shift = 0;

  fetch("./data/data5.json")
    .then((response) => response.json())
    .then((data) => {
      reviews = data.reviews;

      track = document.createElement("div");
      track.className = "review_track";
      reviewCarousel.appendChild(track);

      for (let i = 0; i < reviews.length; i++) {
        const rev = reviews[i];

        const card = document.createElement("div");
        card.className = "review_card";


        card.innerHTML = `
          <div class="review_card_svg">${rev.svg}</div>
          <div class="review_card_textBox">
            <h3 class="review_card_name">${rev.name}</h3>
            <div class="review_card_divider"></div>
            <div class="review_card_text">${rev.text}</div>
            </div>
            <div class="review_card_bottom">
              <a href="#" class="review_card_more">Подробнее</a>
              <span class="review_card_date">${rev.date}</span>
            </div>
        `;

        track.appendChild(card);
      }

      track.insertBefore(track.lastElementChild, track.firstElementChild);

      setActive(track.children[1]);
      requestAnimationFrame(() => {
      recalcShift();
      setRest();
      setProgress();
    });
    });

  function setActive(el) {
    const active = track.querySelector(".review_card_is_active");
    if (active) active.classList.remove("review_card_is_active");
    el.classList.add("review_card_is_active");
  }

  function recalcShift() {
    const card = track.querySelector(".review_card");

    const gap = parseFloat(getComputedStyle(track).gap);
    shift = card.offsetWidth + gap;
  }

  function setRest() {
    track.classList.remove("review_track_is_animating");
    track.style.transform = `translateX(${-shift}px)`;
  }

  function setProgress() {
    reviewProgress.style.width = ((reviewActiveIndex + 1) / reviews.length) * 100 + "%";
  }

  function reviewNext() {
    setActive(track.children[2]);

    track.classList.add("review_track_is_animating");
    track.style.transform = `translateX(${-shift * 2}px)`;

  
    track.addEventListener(
      "transitionend",
      () => {
        track.appendChild(track.firstElementChild);

        setRest();

        setActive(track.children[1]);

        reviewActiveIndex = (reviewActiveIndex + 1) % reviews.length;
        setProgress();

      },
      { once: true }
    );
  }

  function reviewPrev() {
   
    track.classList.remove("review_track_is_animating");

    track.insertBefore(track.lastElementChild, track.firstElementChild);

    track.style.transform = `translateX(${-shift * 2}px)`;
    

    setActive(track.children[1]);

    requestAnimationFrame(() => {
        track.classList.add('review_track_is_animating');
        track.style.transform = `translateX(${-shift}px)`;
    });

    reviewActiveIndex = (reviewActiveIndex - 1 + reviews.length) % reviews.length;
    setProgress();

  }

  btnReviewNext.addEventListener("click", (e) => {
    reviewNext();
  });

  btnReviewPrev.addEventListener("click", (e) => {
    reviewPrev();
  });

