import { Box, Button, Heading, Image, Text, VStack } from "@chakra-ui/react";
import Head from "next/head";
import toDecimals from "round-to-decimal";
import { Container } from "../components/Container";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { useEffect, useReducer } from "react";
import { UserStats } from "../components/UserStats";
import { iAmacState, upgrade, upgradeButtonPayload } from "../interfaces";
import { StoreItem } from "../components/StoreItem";

const upgradesInfo: upgrade[] = [
  {
    name: "Gift Card",
    cost: 19.99,
    boost: 0.1,
    img: "giftcard.png",
  },
  {
    name: "Cone",
    cost: 1000,
    boost: 10,
    img: "cone.png",
  },
];

const defaultState: iAmacState = {
  amacoins: 0,
  clickReward: 1,
  upgrades: [],
};

export const calcCost = (upgrade: upgrade, amount: number) =>
  toDecimals(upgrade.cost * 1.01 ** amount, 2);
export const getArrayNumber = (array: number[], index: number) => array[index] ?? 0;

function reducer(state: iAmacState, action: { type: string; payload?: unknown }): iAmacState {
  const coins = state.amacoins;
  switch (action.type) {
    case "click":
      return { ...state, amacoins: coins + state.clickReward };
    case "upgrade":
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
      <Head>
        <link rel="shortcut icon" href="favicon.ico" />
        <title>Amaclicker</title>
        <meta name="description" content="Just click to get the coin of the best twitch streamer" />
      </Head>

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
      <Button
        onClick={() => dispatch({ type: "click" })}
        fontSize="9xl"
        borderRadius="full"
        height="2em"
        width="2em"
      >
        <Image src="amacPFP.png" />
      </Button>

      <VStack borderWidth="thin" width="20em">
        <Heading>Store</Heading>
        {upgradesInfo.map((upgrade, index) => (
          <StoreItem upgrade={upgrade} state={state} index={index} dispatch={dispatch} />
        ))}
      </VStack>
    </Container>
  );
};

export default Index;
