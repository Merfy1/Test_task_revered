const cardInfo = {
  'card1': { currency: '$', time: '/Months' },
  'card2': { currency: '$', time: '/Months' },
  'card3': { currency: '$', time: '/Months' },
};

function changeCurrency(event, cardId) {
  const card = document.getElementById(cardId);
  const currentSymbol = cardInfo[cardId].currency;
  const currentTime = cardInfo[cardId].time;
  const currencies = ['$', '€', '₽'];
  const currentIndex = currencies.indexOf(currentSymbol);
  const nextIndex = (currentIndex + 1) % currencies.length;
  const nextSymbol = currencies[nextIndex];
  const exchangeRates = {
      '$': 1,
      '€': 0.92,
      '₽': 89,
  };
  const defaultPrice = parseFloat(card.querySelector('.price').getAttribute('data-default-price'));
  const convertedPrice = defaultPrice * exchangeRates[nextSymbol];
  card.querySelector('.symbol').textContent = nextSymbol;
  card.querySelector('.price').textContent = convertedPrice.toFixed(2).replace(/\.0+$/, '');
  cardInfo[cardId].currency = nextSymbol;
  if (currentTime === '/Days') {
      toggleTime(event, cardId);
  }
}

function toggleTime(event, cardId) {
  const card = document.getElementById(cardId);
  const currentTime = cardInfo[cardId].time
  if (currentTime === '/Months') {
      const currentSymbol = cardInfo[cardId].currency;
      const defaultPrice = parseFloat(card.querySelector('.price').getAttribute('data-default-price'));
      const exchangeRates = {
        '$': 1,
        '€': 0.92,
        '₽': 89,
      };
      const exchangeRate = currentSymbol === '$' ? 1 : exchangeRates[currentSymbol];
      const pricePerDay = (defaultPrice * exchangeRate) / 30;
      card.querySelector('.time').textContent = '/Days';
      card.querySelector('.price').textContent = pricePerDay.toFixed(2).replace(/\.0+$/, ''); // Remove trailing zeros
  } else {
      const currentSymbol = cardInfo[cardId].currency;
      const defaultPrice = parseFloat(card.querySelector('.price').getAttribute('data-default-price'));
      const exchangeRates = {
        '$': 1,
        '€': 0.92,
        '₽': 89,
      };
      const convertedPrice = defaultPrice * exchangeRates[currentSymbol];
      card.querySelector('.time').textContent = '/Months';
      card.querySelector('.price').textContent = convertedPrice.toFixed(2).replace(/\.0+$/, ''); // Remove trailing zeros
  }
  cardInfo[cardId].time = (currentTime === '/Months') ? '/Days' : '/Months';
}