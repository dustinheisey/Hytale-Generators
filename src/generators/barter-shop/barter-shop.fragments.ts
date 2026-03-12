import { parseIngredient, parseIngredients, type HasId } from "@";
import { type HasRestock, type HasFixedTrades, type HasTradePools } from "./barter-shop.types";

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
            output: parseIngredient(output),
            input: parseIngredients(Array.isArray(input) ? input : [input]),
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
            output: parseIngredient(output),
            input: parseIngredients(Array.isArray(input) ? input : [input]),
            stock
          }))
        }))
      : [])
  ]
});
