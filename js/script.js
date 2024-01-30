function toggleBillingPeriod(timeElement) {
    const cards = document.querySelectorAll('.card-price');
    const isMonthly = timeElement.textContent.includes('Months');
  
    cards.forEach(card => {
      const priceElement = card.querySelector('.price');
      const perMonth = JSON.parse(priceElement.dataset.perMonth);
  
      if (isMonthly) {
        priceElement.textContent = calculateDailyPrice(priceElement.textContent);
        timeElement.textContent = '/Days';
        priceElement.dataset.perMonth = 'false';
      } else {
        priceElement.textContent = getDefaultPrice(card);
        timeElement.textContent = '/Months';
        priceElement.dataset.perMonth = 'true';
      }
    });
  }
  
  function calculateDailyPrice(monthlyPrice) {
    return Math.round(parseFloat(monthlyPrice) / 30);
  }
  
  function changeCurrency(card) {
    const priceElement = card.querySelector('.price');
    const currencySymbol = card.querySelector('.symbol');
  
    if (currencySymbol.textContent === '$') {
      currencySymbol.textContent = '₽';
      priceElement.textContent = convertToRubles(priceElement.dataset.defaultPrice);
    } else if (currencySymbol.textContent === '₽') {
      currencySymbol.textContent = '€';
      priceElement.textContent = convertToEuros(priceElement.dataset.defaultPrice);
    } else {
      currencySymbol.textContent = '$';
      if (JSON.parse(priceElement.dataset.perMonth)) {
        priceElement.textContent = getDefaultPrice(card);
      } else {
        priceElement.textContent = calculateDailyPrice(priceElement.dataset.defaultPrice);
      }
    }
  }
  
  function changeCurrencySymbol(symbolElement) {
    const card = symbolElement.closest('.card-price');
    changeCurrency(card);
  }
  
  function getDefaultPrice(card) {
    return parseFloat(card.querySelector('.price').getAttribute('data-default-price'));
  }
  
  function convertToRubles(priceInDollars) {
    return Math.round(parseFloat(priceInDollars) * 89);
  }
  
  function convertToEuros(priceInDollars) {
    return Math.round(parseFloat(priceInDollars) * 0.92);
  }
  