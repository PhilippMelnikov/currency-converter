export default class App {
  constructor(echangeRatesService, currencyConverter) {
    this.echangeRatesService = echangeRatesService;
    this.currencyConverter = currencyConverter;
    this.from = 'USD';
    this.to = 'EUR';
    this.value = 0;
  }

  init = () => {
    document.addEventListener("DOMContentLoaded", () => {
      this.setRates();
      this.setListeners();
      setInterval(this.setRates, 60 * 60 * 1000);
      document.querySelector('input').focus();
    });
  }

  setRates = async () => {
    const rates = await this.echangeRatesService.getRates();
    this.currencyConverter.setRates(rates);
    this.fillOptions(rates);
  }

  fillOptions = (rates) => {
    const options = Object.keys(rates)
      .map(currency => `<option value="${currency}">${currency}</option>`)
      .join('');
    document.querySelectorAll('select').forEach((select, idx) => {
      select.innerHTML = options;
      select.querySelector(`[value="${idx === 0 ? this.from : this.to}"]`).setAttribute('selected', true);
    })
  }

  setListeners = () => {
    const selectEls = document.getElementsByTagName('select');
    for (let i = 0; i < selectEls.length; i++) {
      const el = selectEls[i];
      el.addEventListener('change', this.onCurrencySelect);
    }

    document.querySelector('input').addEventListener('input', this.onInputChange)
  }

  onCurrencySelect = (e) => {
    const { name, value } = e.target;
    this[name] = value;
    this.convert();
  }

  onInputChange = (e) => {
    const { value } = e.target;
    const val = value.endsWith(',') || value.endsWith('.') ? value.slice(0, -1) : value;

    const res = +val.trim().replace(',', '.');
    if (isNaN(res)) {
      document.querySelector('input').value = this.value;
      return;
    }
    this.value = res;
    this.convert();
  }

  convert = () => {
    const res = this.currencyConverter.convert(this.from, this.to, this.value);
    document.querySelector('#result').innerHTML = res.toString();
  }
}
