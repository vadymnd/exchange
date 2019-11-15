export const getAllCurrencyRates = async () => {
  const baseCurrencyRates = await fetch('https://api.exchangeratesapi.io/latest');

  const dataBaseCurrencyRates = await baseCurrencyRates.json();

  return dataBaseCurrencyRates.rates;
}

export const getAllCurrency = async () => {
  const baseCurrency = await fetch('https://api.exchangeratesapi.io/latest');

  const dataBaseCurrency = await baseCurrency.json();

  return dataBaseCurrency;
}

// export const getSecondSelectValue = async () => {
//   return await document.querySelector('.second-select').value;
// }