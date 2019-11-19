export const getAllCurrencyRates = async () => {
  const baseCurrencyRates = await fetch('https://api.exchangeratesapi.io/latest');

  const dataBaseCurrencyRates = await baseCurrencyRates.json();
  
  dataBaseCurrencyRates.rates.EUR = 1;
  
  return dataBaseCurrencyRates.rates;
}

export const getAllCurrency = async () => {
  const baseCurrency = await fetch('https://api.exchangeratesapi.io/latest');

  const dataBaseCurrency = await baseCurrency.json();

  return dataBaseCurrency;
}