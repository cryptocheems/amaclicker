import { Button, Heading, Image, Link, Text, VStack } from "@chakra-ui/react";
import Head from "next/head";
import { Container } from "../components/Container";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { useEffect, useReducer } from "react";
import { UserStats } from "../components/UserStats";
import { iAmacState, upgrade, upgradeButtonPayload } from "../interfaces";
import { StoreItem } from "../components/StoreItem";
import { calcCost, getArrayNumber } from "../utility";

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
        position="absolute"
        top="1"
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
        _hover={{ transform: "scale(2.9, 0.5)" }}
        _active={{ transform: "scale(0.5, 3)" }}
      >
        <Image src="amacPFP.png" />
      </Button>

      <VStack borderWidth="thin" width="20em" p="2.5" borderRadius="2xl">
        <Heading>Store</Heading>
        <Heading fontSize="lg" w="100%" ml="2">
          Upgrades
        </Heading>
        {upgradesInfo.map((upgrade, index) => (
          <StoreItem
            upgrade={upgrade}
            state={state}
            index={index}
            dispatch={dispatch}
            key={index}
          />
        ))}
        <Heading fontSize="lg" w="100%" ml="2">
          Investments (wip)
        </Heading>
      </VStack>

      <Text position="absolute" bottom="1">
        Checkout Amaclittle on{" "}
        <Link
          href="https://www.twitch.tv/amaclittle"
          isExternal
          textColor="purple.600"
          fontWeight="semibold"
        >
          Twitch
        </Link>
      </Text>
    </Container>
  );
};

export default Index;
