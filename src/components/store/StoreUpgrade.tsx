import { StoreUpgradeProps } from "../../misc/interfaces";
import { calcCost, getArrayNumber } from "../../misc/utility";
import { StoreItem } from "./StoreItem";

export const StoreUpgrade: React.FC<StoreUpgradeProps> = ({ state, index, upgrade, dispatch }) => {
  const bal = getArrayNumber(state.upgrades, index);
  return (
    <StoreItem
      cost={calcCost(upgrade, bal)}
      dispatch={dispatch}
      dispatchArgs={{ type: "upgrade", payload: { upgrade, index } }}
      img={upgrade.img}
      name={upgrade.name}
      balance={bal}
      extra={`+${upgrade.boost} CPC`}
    />
  );
};
