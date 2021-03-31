// The default state and reducer used in index.tsx

import { iAmacState, skinPayload, upgradeButtonPayload } from "./interfaces";
import { getArrayNumber, calcCost } from "./utility";

export const defaultState: iAmacState = {
  amacoins: 0,
  clickReward: 1,
  upgrades: [],
  skin: 0,
  skins: [true],
};

export function reducer(
  state: iAmacState,
  action: { type: string; payload?: unknown }
): iAmacState {
  const coins = state.amacoins;
  switch (action.type) {
    case "click":
      return { ...state, amacoins: coins + state.clickReward };
    case "upgrade": {
      const payload = action.payload as upgradeButtonPayload;
      const upgrade = payload.upgrade;
      const upgrades = state.upgrades;
      const userAmount = getArrayNumber(upgrades, payload.index);
      const cost = calcCost(upgrade, userAmount);

      if (coins >= cost) {
        upgrades[payload.index] = userAmount + 1;
        return {
          ...state,
          amacoins: coins - cost,
          clickReward: state.clickReward + upgrade.boost,
          upgrades,
        };
      } else {
        return state;
      }
    }
    case "skinBuy": {
      const payload = action.payload as skinPayload;
      const skins = state.skins;
      const cost = payload.skinCost;

      if (coins >= cost) {
        skins[payload.index] = true;
        return { ...state, amacoins: coins - cost, skins, skin: payload.index };
      }
      return state;
    }
    case "skinEquip": {
      // See what I did there
      const skindex = action.payload as number;
      return { ...state, skin: skindex };
    }
    // TODO: This
    case "invest":
      return state;
    case "redeem":
      return state;
    case "pageLoad":
      return action.payload as iAmacState;
    default:
      throw new Error();
  }
}
