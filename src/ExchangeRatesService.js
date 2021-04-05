import { EXCHANGE_RATES_URL } from './constants';

export default class ExchangeRatesService {
  getRates = async () => {
    const request = await fetch(EXCHANGE_RATES_URL);
    const res = await request.json();
    return res.rates;
  }
}
