// export const getBaseUSD = async () => {
//   const baseUSD = await fetch('https://api.exchangeratesapi.io/latest?base=USD');

//   const dataBaseUSD = await baseUSD.json();

//   return dataBaseUSD;
// };

export const getAllCurrency = async () => {
  const baseCurrency = await fetch('https://api.exchangeratesapi.io/latest');

  const dataBaseCurrency = await baseCurrency.json();

  return dataBaseCurrency;
}