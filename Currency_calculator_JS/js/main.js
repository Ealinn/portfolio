const $currencyInput = document.querySelector("#currency-input");
const $currencyButton = document.querySelector("#currency-button");
const $radioBuy = document.querySelector("#radio-buy");
const $radioSell = document.querySelector("#radio-sell");
const $currencyResult = document.querySelector("#currency-result");
const $currencySelect = document.querySelector("#currency-select");

async function currencyCalculator() {
  const response = await fetch(
    "https://old.bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json"
  );
  const data = await response.json();

  const usd = data.find((item) => item.cc === "USD");
  const euro = data.find((item) => item.cc === "EUR");

  const dollarBuy = usd.rate * 1.008;
  const euroBuy = euro.rate * 1.008;
  const dollarSell = usd.rate * 0.996;
  const euroSell = euro.rate * 0.996;

  const inputValue = $currencyInput.value;

  if ($radioBuy.checked) {
    if ($currencySelect.value === "dollar-to-hrivna") {
      $currencyResult.textContent = inputValue * dollarBuy;
    } else if ($currencySelect.value === "euro-to-hrivna") {
      $currencyResult.textContent = inputValue * euroBuy;
    } else if ($currencySelect.value === "hrivna-to-dollar") {
      $currencyResult.textContent = inputValue * (1 / dollarBuy);
    } else if ($currencySelect.value === "hrivna-to-euro") {
      $currencyResult.textContent = inputValue * (1 / euroBuy);
    }
  } else if ($radioSell.checked) {
    if ($currencySelect.value === "dollar-to-hrivna") {
      $currencyResult.textContent = inputValue * dollarSell;
    } else if ($currencySelect.value === "euro-to-hrivna") {
      $currencyResult.textContent = inputValue * euroSell;
    } else if ($currencySelect.value === "hrivna-to-dollar") {
      $currencyResult.textContent = inputValue * (1 / dollarSell);
    } else if ($currencySelect.value === "hrivna-to-euro") {
      $currencyResult.textContent = inputValue * (1 / euroSell);
    }
  }
}

$currencyButton.addEventListener("click", currencyCalculator);
