import { builder, json } from "#hg";
import { withDisplayNameKey, withRestock, withTrades } from "./barter-shop.fragments.js";
import { type BarterShopCfg } from "./barter-shop.types.js";

export const barterShop = builder((cfg: BarterShopCfg, { paths: { barterShop } }) =>
  json(`${barterShop.json}/${cfg.id}`, [withDisplayNameKey(cfg), withRestock(cfg), withTrades(cfg)])
);
