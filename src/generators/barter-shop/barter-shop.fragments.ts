import { parseIngredients, type HasId } from "#hg";
import { type HasRestock, type HasFixedTrades, type HasTradePools } from "./barter-shop.types.js";

export const withDisplayNameKey = ({ id }: HasId) => ({ DisplayNameKey: `server.barter.${id}.title` });

export const withRestock = ({ restock: [refresh, restock] }: HasRestock) => ({
  RefreshInterval: {
    Days: refresh
  },
  RestockHour: restock
});

export const withTrades = ({ fixedTrades, tradePools }: HasFixedTrades & HasTradePools) => ({
  TradeSlots: [
    ...(fixedTrades
      ? fixedTrades.map(({ input, output, stock }) => ({
          type: "Fixed",
          trade: {
            output: parseIngredients(output),
            input: parseIngredients(input),
            stock
          }
        }))
      : []),
    ...(tradePools
      ? tradePools.map(({ slots, trades }) => ({
          type: "Pool",
          slotCount: slots,
          trades: trades.map(({ weight, input, output, stock }) => ({
            weight,
            output: parseIngredients(output),
            input: parseIngredients(input),
            stock
          }))
        }))
      : [])
  ]
});
