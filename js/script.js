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
      priceElement.textContent = priceElement.dataset.defaultPrice;
    }
  }
  
  function changeCurrencySymbol(symbolElement) {
    const card = symbolElement.closest('.card-price');
    changeCurrency(card);
  }
  
  function convertToRubles(priceInDollars) {
    return Math.round(parseFloat(priceInDollars) * 89);
  }
  
  function convertToEuros(priceInDollars) {
    return Math.round(parseFloat(priceInDollars) * 0.92);
  }
  