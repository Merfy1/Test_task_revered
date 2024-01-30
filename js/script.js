const cardInfo = {
  'card1': { currency: '$', time: '/Months', defaultPrice: 30 },
  'card2': { currency: '$', time: '/Months', defaultPrice: 276 },
  'card3': { currency: '$', time: '/Months', defaultPrice: 420 },
};

function changeCurrency() {
  const currencies = ['$', '₽', '€'];

  // Switch currency for all cards
  document.querySelectorAll('.card-price').forEach((card) => {
      const cardId = card.id;
      const currentSymbol = cardInfo[cardId].currency;
      const currentIndex = currencies.indexOf(currentSymbol);
      const nextIndex = (currentIndex + 1) % currencies.length;
      const nextSymbol = currencies[nextIndex];

      const exchangeRates = {
          '$': 1,
          '₽': 74.5, // Example exchange rate for Ruble
          '€': 0.85, // Example exchange rate for Euro
      };

      const defaultPrice = cardInfo[cardId].defaultPrice;
      const convertedPrice = defaultPrice * exchangeRates[nextSymbol];

      cardInfo[cardId].currency = nextSymbol;

      card.querySelector('.symbol').textContent = nextSymbol;
      card.querySelector('.price').textContent = (cardInfo[cardId].time === '/Days') ?
          calculatePricePerDay(defaultPrice, nextSymbol).toFixed(2).replace(/\.0+$/, '') :
          convertedPrice.toFixed(2).replace(/\.0+$/, '');
  });
}

function toggleTime() {
  // Switch between Months and Days for all cards
  document.querySelectorAll('.card-price').forEach((card) => {
      const cardId = card.id;
      const currentTime = cardInfo[cardId].time;

      const newTime = (currentTime === '/Months') ? '/Days' : '/Months';
      cardInfo[cardId].time = newTime;

      card.querySelector('.time').textContent = newTime;

      updatePrices(cardId);
  });
}

function calculatePricePerDay(defaultPrice, currentSymbol) {
  const exchangeRates = {
      '$': 1,
      '₽': 74.5, // Example exchange rate for Ruble
      '€': 0.85, // Example exchange rate for Euro
  };
  const exchangeRate = currentSymbol === '$' ? 1 : exchangeRates[currentSymbol];
  return (defaultPrice * exchangeRate) / 30;
}

function updatePrices(cardId) {
  const currentSymbol = cardInfo[cardId].currency;
  const defaultPrice = cardInfo[cardId].defaultPrice;

  document.querySelectorAll('.card-price').forEach((card) => {
      card.querySelector('.price').textContent = (cardInfo[cardId].time === '/Days') ?
          calculatePricePerDay(defaultPrice, currentSymbol).toFixed(2).replace(/\.0+$/, '') :
          (defaultPrice * exchangeRates[currentSymbol]).toFixed(2).replace(/\.0+$/, '');
  });
}

const cardsWrapper = document.querySelector('.cards');
cardsWrapper.addEventListener('click', function(event) {
  const cardElement = event.target.closest('.card-price');
  if (cardElement) {
      if (event.target.classList.contains('symbol')) {
          changeCurrency(event, cardElement.id);
      } else if (event.target.classList.contains('time')) {
          toggleTime(event, cardElement.id);
      }
  }
});