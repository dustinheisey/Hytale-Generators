import { type HasId } from "#hg";

export type FixedTrade = {
  input: string | string[];
  output: string;
  stock: number;
};

export type TradePool = {
  slots: number;
  trades: (FixedTrade & { weight: number })[];
};

export type RestockDays = number;
export type RestockHour = number;
export type HasRestock = { restock: [RestockDays, RestockHour] };
export type HasFixedTrades = {
  fixedTrades?: FixedTrade[];
};

export type HasTradePools = {
  tradePools?: TradePool[];
};

export type BarterShopCfg = HasId & HasRestock & HasFixedTrades & HasTradePools;
