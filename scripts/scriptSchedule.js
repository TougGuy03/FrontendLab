let scheduleDays = [];
let activeDayIndex = 0;

const schedule = document.getElementById("schedule-main");

const btnMon = document.getElementById("btn-mon");
const btnTus = document.getElementById("btn-tus");
const btnWen = document.getElementById("btn-wen");
const btnThs = document.getElementById("btn-ths");
const btnFrd = document.getElementById("btn-frd");
const btnSat = document.getElementById("btn-sat");

const scheduleButtons = [btnMon, btnTus, btnWen, btnThs, btnFrd, btnSat];

fetch("./data/data3.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    scheduleDays = data.days;
    showDay(0); 
  });

scheduleButtons.forEach(function (btn, index) {
  btn.addEventListener("click", function () {
    showDay(index);
  });
});

function showDay(index) {
  activeDayIndex = index;

  for (let i = 0; i < scheduleButtons.length; i++) {
    scheduleButtons[i].classList.remove("tab-active");
  }
  scheduleButtons[index].classList.add("tab-active");

    schedule.style.opacity = "0";

    setTimeout(() =>{

      const day = scheduleDays[index];
    
      schedule.innerHTML = "";
      schedule.innerHTML =`
          <div class="schedule_row_head">
                        <span>Направление</span>
                        <span>Время</span>
                        <span>Длительность</span>
                    </div>
      `
    
      for (let i = 0; i < day.items.length; i++) {
        const item = day.items[i];
    
        const row = document.createElement("div");
        row.className = "schedule_row";
    
        row.innerHTML = `
          <div class="schedule_col_title">${item.title}<span class="schedule_col_title_trainer">${item.trainer}</span></div>
          <div class="schedule_col_time">${item.time}</div>
          <div class="schedule_col_durationMin">${item.durationMin} мин</div>
          <div class="schedule_col_duration_hour">${item.durationHour}</div>
          <div class="schedule_col_trainer">${item.trainer}</div>
          <div class="schedule_actions">
             <button class="schedule_book_btn" type="button" id="schedule-book-btn" >
                       <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_816_6233)">
                        <path d="M9 16.5H16.5M13.3274 2.04434C13.6759 1.6958 14.1486 1.5 14.6415 1.5C14.8856 1.5 15.1272 1.54807 15.3527 1.64147C15.5782 1.73487 15.7831 1.87176 15.9557 2.04434C16.1282 2.21692 16.2651 2.42179 16.3585 2.64728C16.4519 2.87276 16.5 3.11443 16.5 3.35849C16.5 3.60255 16.4519 3.84422 16.3585 4.0697C16.2651 4.29519 16.1282 4.50006 15.9557 4.67264L5.0044 15.6239L1.5 16.5L2.3761 12.9956L13.3274 2.04434Z" stroke="#98958B" stroke-linecap="round" stroke-linejoin="round"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_816_6233">
                        <rect width="18" height="18" fill="white"/>
                        </clipPath>
                        </defs>
                        </svg>
                </button>
            <button class="schedule_phone_btn" type="button" id="schedule-phone-btn" >
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.4775 13.7475C16.4775 14.0175 16.4175 14.295 16.29 14.565C16.1625 14.835 15.9975 15.09 15.78 15.33C15.4125 15.735 15.0075 16.0275 14.55 16.215C14.1 16.4025 13.6125 16.5 13.0875 16.5C12.3225 16.5 11.505 16.32 10.6425 15.9525C9.78 15.585 8.9175 15.09 8.0625 14.4675C7.2 13.8375 6.3825 13.14 5.6025 12.3675C4.83 11.5875 4.1325 10.77 3.51 9.915C2.895 9.06 2.4 8.205 2.04 7.3575C1.68 6.5025 1.5 5.685 1.5 4.905C1.5 4.395 1.59 3.9075 1.77 3.4575C1.95 3 2.235 2.58 2.6325 2.205C3.1125 1.7325 3.6375 1.5 4.1925 1.5C4.4025 1.5 4.6125 1.545 4.8 1.635C4.995 1.725 5.1675 1.86 5.3025 2.055L7.0425 4.5075C7.1775 4.695 7.275 4.8675 7.3425 5.0325C7.41 5.19 7.4475 5.3475 7.4475 5.49C7.4475 5.67 7.395 5.85 7.29 6.0225C7.1925 6.195 7.05 6.375 6.87 6.555L6.3 7.1475C6.2175 7.23 6.18 7.3275 6.18 7.4475C6.18 7.5075 6.1875 7.56 6.2025 7.62C6.225 7.68 6.2475 7.725 6.2625 7.77C6.3975 8.0175 6.63 8.34 6.96 8.73C7.2975 9.12 7.6575 9.5175 8.0475 9.915C8.4525 10.3125 8.8425 10.68 9.24 11.0175C9.63 11.3475 9.9525 11.5725 10.2075 11.7075C10.245 11.7225 10.29 11.745 10.3425 11.7675C10.4025 11.79 10.4625 11.7975 10.53 11.7975C10.6575 11.7975 10.755 11.7525 10.8375 11.67L11.4075 11.1075C11.595 10.92 11.775 10.7775 11.9475 10.6875C12.12 10.5825 12.2925 10.53 12.48 10.53C12.6225 10.53 12.7725 10.56 12.9375 10.6275C13.1025 10.695 13.275 10.7925 13.4625 10.92L15.945 12.6825C16.14 12.8175 16.275 12.975 16.3575 13.1625C16.4325 13.35 16.4775 13.5375 16.4775 13.7475Z" stroke="#98958B" stroke-miterlimit="10"/>
                            </svg>
                </button>
          </div>
        `;
    
        schedule.appendChild(row);
        schedule.style.opacity = "1";
      }
    }, 500 );

}
