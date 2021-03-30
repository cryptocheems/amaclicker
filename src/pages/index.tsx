import { Button, Image } from "@chakra-ui/react";
import { Container } from "../components/Container";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { useEffect, useReducer } from "react";
import { UserStats } from "../components/UserStats";
import { iAmacState, upgradeButtonPayload } from "../interfaces";

const defaultState: iAmacState = {
  amacoins: 0,
  clickReward: 1,
  upgrades: [
    {
      name: "Doge",
      cost: 20,
      boost: 0.1,
      userAmount: 0,
    },
    {
      name: "Cheems",
      cost: 1000,
      boost: 10,
      userAmount: 0,
    },
  ],
};

function reducer(state: iAmacState, action: { type: string; payload?: unknown }): iAmacState {
  const coins = state.amacoins;
  switch (action.type) {
    case "click":
      return { ...state, amacoins: coins + state.clickReward };
    case "upgrade":
      const payload = action.payload as upgradeButtonPayload;
      const upgrade = payload.upgrade;
      const upgrades = state.upgrades;

      const cost = upgrade.cost * (1 + upgrade.userAmount / 100);
      console.log(cost);

      if (coins >= cost) {
        const currentUpgrade = upgrades[payload.index];
        const userAmount = currentUpgrade.userAmount + 1;
        upgrades[payload.index] = { ...currentUpgrade, userAmount };
        return {
          ...state,
          amacoins: coins - cost,
          clickReward: state.clickReward + upgrade.boost,
          upgrades,
        };
      } else {
        return state;
      }
    case "pageLoad":
      return action.payload as iAmacState;
    default:
      throw new Error();
  }
}

const Index = () => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  // Called when page loads
  useEffect(() => {
    const localState = localStorage.getItem("state");
    if (localState) {
      dispatch({ type: "pageLoad", payload: JSON.parse(localState) });
    }
  }, []);

  // Called whenever state changes
  useEffect(() => {
    localStorage.setItem("state", JSON.stringify(state));
  }, [state]);

  return (
    <Container height="100vh">
      <UserStats amacoins={state.amacoins} clickReward={state.clickReward} />

      <DarkModeSwitch />
      <Button
        onClick={() => {
          // TODO: Delete this button
          localStorage.setItem("state", JSON.stringify(defaultState));
          location.reload();
        }}
      >
        Reset State
      </Button>
      <Button onClick={() => dispatch({ type: "click" })} fontSize="8xl" padding="20">
        <Image src="amacPFP.png" width="150px" />
      </Button>

      {state.upgrades.map((upgrade, index) => (
        <Button onClick={() => dispatch({ type: "upgrade", payload: { upgrade, index } })}>
          {upgrade.name} (cost: {upgrade.cost} amac, +{upgrade.boost} amac, bal:{" "}
          {upgrade.userAmount})
        </Button>
      ))}
    </Container>
  );
};

export default Index;
