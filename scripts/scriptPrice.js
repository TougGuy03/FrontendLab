let prices = [];

const priceOnce = document.getElementById("price-once");
const priceList = document.getElementById("price-list");

fetch("./data/data2.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    prices = data.priceList;
    renderPrices();
  });

function renderPrices() {
  for (let i = 0; i < prices.length; i++) {
    const item = prices[i];

    if (item.id === "single") {
      priceOnce.innerHTML = `
        <div class="price_card_single">
          <div class="price_single_value">${item.price}₽</div>
          <div class="price_single_divider"></div>
          <div class="price_single_label"><span class="single_count">1</span> занятие</div>
        </div>
      `;
    }
    else {
      priceList.innerHTML += `
        <div class="price_card">
          <div class="price_card_top">
            <div class="price_card_left_part">
              ${item.count ? `<div class="price_count">${item.count}</div>` : ""}
              <div class="price_label">
                ${item.label}
              </div>
            </div>

            <div class="price_card_total">
              ${item.price}₽
            </div>
          </div>
          <div class="price_card_divider"></div>
          <div class="price_card_bottom">
            <div class="price_one_label"><span class="price_card_one">1</span> занятие</div>
            <div class="price_one_price ${
                typeof item.onePrice === "number"
                    ? "price_one_price--number"
                    : "price_one_price--text"
                }">
                ${
                    typeof item.onePrice === "number"
                    ? item.onePrice + "₽"
                    : item.onePrice
                }
                </div>
          </div>
        </div>
      `;
    }
  }
}
