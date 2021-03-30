import { Button } from "@chakra-ui/react";
import { Container } from "../components/Container";

import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { useEffect, useReducer } from "react";
import { UserStats } from "../components/UserStats";

interface iAmacState {
  amacoins: number;
  clickReward: number;
}

interface upgrade {
  cost: number;
  boost: number;
}

const defaultState: iAmacState = {
  amacoins: 0,
  clickReward: 1,
};

function reducer(state: iAmacState, action: { type: string; payload?: unknown }): iAmacState {
  const coins = state.amacoins;
  switch (action.type) {
    case "click":
      return { ...state, amacoins: coins + state.clickReward };
    case "upgrade":
      if (coins >= 20) {
        return { ...state, amacoins: coins - 20, clickReward: state.clickReward + 0.1 };
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

      <Button onClick={() => dispatch({ type: "upgrade" })}>
        Upgrade (cost: 20 amac, +0.1 amac)
      </Button>

      <DarkModeSwitch />

      <Button onClick={() => dispatch({ type: "click" })} fontSize="8xl" padding="100">
        A
      </Button>
    </Container>
  );
};

export default Index;
