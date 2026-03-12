import { type HasId } from "@";

export type FixedTrade = {
  input: string | string[];
  output: string;
  stock: number;
};

export type TradePool = {
  slots: number;
  trades: (Omit<FixedTrade, "stock"> & { weight: number; stock: number[] })[];
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
