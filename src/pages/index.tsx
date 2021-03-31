import { Button, Heading, Image, Link, Text, VStack } from "@chakra-ui/react";
import Head from "next/head";
import { Container } from "../components/Container";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { useEffect, useReducer } from "react";
import { UserStats } from "../components/UserStats";
import { StoreItem } from "../components/StoreItem";
import { upgradesInfo } from "../misc/info";
import { defaultState, reducer } from "../misc/state";

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
        _hover={{ transform: "scale(1.05, 1.1)" }}
        _active={{ transform: "scale(1.3, 0.9)" }}
      >
        <Image src="amac.svg" />
      </Button>

      <VStack borderWidth="thin" width="22em" p="2.5" borderRadius="2xl">
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
