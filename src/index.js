import App from './App';
import ExchangeRatesService from './ExchangeRatesService';
import CurrencyConverter from './CurrencyConverter';

const exchangeRatesService = new ExchangeRatesService();
const currencyConverter = new CurrencyConverter();
const app = new App(exchangeRatesService, currencyConverter);
app.init();