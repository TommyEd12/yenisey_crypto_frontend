interface Token {
  address: string;
  name: string;
  symbol: string;
  volume: number;
  cap: number;
  availableSupply: number;
  "volume-1d-current": number;
  "volume-1d-previous": number;
  "volume-7d-current": number;
  "volume-7d-previous": number;
  "volume-30d-current": number;
  "volume-30d-previous": number;
  "cap-1d-current": number;
  "cap-1d-previous": number;
  "cap-1d-previous-ts": number;
  "cap-7d-current": number;
  "cap-7d-previous": number;
  "cap-7d-previous-ts": number;
  "cap-30d-current": number;
  "cap-30d-previous": number;
  "cap-30d-previous-ts": number;
  price: Price;
}

interface Price {
  rate: number;
  diff: number;
  diff7d: number;
  ts: number;
  marketCapUsd: number;
  availableSupply: number;
  volume24h: number;
  volDiff1: number;
  volDiff7: number;
  volDiff30: number;
  diff30d: number;
}
export interface changedToken {
  currencyName: string;
  created: string;
  contract: string;
  volume: number;
  percentageChange: number;
  valueChange: number;
}
export interface opsToken {
  currencyName: string;
  created: string;
  contract: string;
  countOps: number;
  percentageChange: number;
  valueChange: number;
}

export default Token;
