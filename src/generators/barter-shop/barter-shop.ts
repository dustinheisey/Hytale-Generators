import { builder, json,withCommon } from "@";
import { withDisplayNameKey, withRestock, withTrades } from "./barter-shop.fragments";
import { type BarterShopCfg } from "./barter-shop.types";

export const barterShop = builder((cfg: BarterShopCfg, { paths: { barterShop } }) =>
  json(`${barterShop.json}/${cfg.id}`, [withCommon(cfg), withDisplayNameKey(cfg), withRestock(cfg), withTrades(cfg)])
);
