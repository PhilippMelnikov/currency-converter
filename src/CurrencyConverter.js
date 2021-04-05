export default class CurrencyConverter {
  constructor(rates) {
    this.rates = rates;
  }

  setRates(rates) {
    this.rates = rates;
  }

  convert(from, to, value) {
    const fromRate = this.rates[from];
    const toRate = this.rates[to];

    if (!fromRate || !toRate) throw new Error('Unknown currency!');

    return +(toRate / fromRate * value).toFixed(2);
  }
}
