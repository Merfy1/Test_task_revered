const cards = document.querySelectorAll('.card-price')
const cardsPriceAtUsd = {
  card1: 30,
  card2: 276,
  card3: 420,
};

const CURRENCIES = Object.freeze({
  USD: '$',
  EUR: '€',
  RUB: '₽'
})

const exchangeRates = {
      '$': 1,
      '₽': 89,
      '€': 0.92,
  };

let isPerMonth = true;
let currency = CURRENCIES.USD

function getNextCurrency(currentCurrency) {
  const currencyValues = Object.values(CURRENCIES);
  const currentIndex = currencyValues.indexOf(currentCurrency);

  // If the current currency is not found or is the last one, return the first currency
  if (currentIndex === -1 || currentIndex === currencyValues.length - 1) {
    return currencyValues[0];
  }

  // Otherwise, return the next currency in the list
  return currencyValues[currentIndex + 1];
}

function changeCurrency() {
  currency = getNextCurrency(currency);

  cards.forEach((card) => {
      const priceKey = card.id;
      const convertedPrice = cardsPriceAtUsd[priceKey] * exchangeRates[currency];

      card.querySelector('.symbol').textContent = currency;
      card.querySelector('.price').textContent = !isPerMonth ?
          calculatePricePerDay(priceKey).toFixed(2).replace(/\.0+$/, '') :
          convertedPrice.toFixed(2).replace(/\.0+$/, '');
  });
}

function toggleTime() {
  // Switch between Months and Days for all cards
  cards.forEach((card) => {
      const newTime = isPerMonth ? '/Days' : '/Months';
      card.querySelector('.time').textContent = newTime;
  });

  isPerMonth = !isPerMonth;
  updatePrices();
}

function updatePrices() {
  cards.forEach((card) => {
      const priceKey = card.id
      card.querySelector('.price').textContent = isPerMonth
          ? (cardsPriceAtUsd[priceKey] * exchangeRates[currency]).toFixed(2).replace(/\.0+$/, '')
          : calculatePricePerDay(priceKey).toFixed(2).replace(/\.0+$/, '');
  });
}

function calculatePricePerDay(priceKey) {
  const exchangeRate = exchangeRates[currency];
  return (cardsPriceAtUsd[priceKey] * exchangeRate) / 30;
}

const cardsWrapper = document.querySelector('.cards');
cardsWrapper.addEventListener('click', function({ target }) {
  const cardElement = target.closest('.card-price');
  if (cardElement) {
      if (target.classList.contains('symbol')) {
          changeCurrency();
      } else if (event.target.classList.contains('time')) {
          toggleTime();
      }
  }
});
document.addEventListener('DOMContentLoaded', function() {
  const cards = document.querySelectorAll('.card');
  cards.forEach((card, index) => {
      setTimeout(() => {
          card.classList.add('visible');
      }, index * 200); // Измените задержку по вашему усмотрению
  });
});