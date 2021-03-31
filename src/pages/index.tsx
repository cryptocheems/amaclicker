import { Button, GridItem, Heading, Image, Link, Text, VStack } from "@chakra-ui/react";
import Head from "next/head";
import { Container } from "../components/Container";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { useEffect, useReducer } from "react";
import { UserStats } from "../components/UserStats";
import { skinsInfo, upgradesInfo } from "../misc/info";
import { defaultState, reducer } from "../misc/state";
import { SectionTitle } from "../components/store/SectionTitle";
import { StoreUpgrade } from "../components/store/StoreUpgrade";
import { StoreItem } from "../components/store/StoreItem";

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
      <GridItem colStart={2}>
        <Button
          onClick={() => dispatch({ type: "click" })}
          fontSize="9xl"
          borderRadius="full"
          height="2em"
          width="2em"
          _hover={{ transform: "scale(1.05, 1.1)" }}
          _active={{ transform: "scale(1.3, 0.9)" }}
        >
          <Image src={skinsInfo[state.skin].img} draggable="false" />
        </Button>
      </GridItem>

      <VStack borderWidth="thin" width="25em" p="2.5" borderRadius="2xl">
        <Heading>Store</Heading>
        <SectionTitle>Upgrades</SectionTitle>
        {upgradesInfo.map((upgrade, index) => (
          <StoreUpgrade
            upgrade={upgrade}
            state={state}
            index={index}
            dispatch={dispatch}
            key={index}
          />
        ))}
        <SectionTitle>Investments</SectionTitle>
        <SectionTitle>Skins</SectionTitle>
        {skinsInfo.map((skin, index) => (
          <StoreItem
            cost={skin.cost}
            key={index}
            dispatch={dispatch}
            dispatchArgs={
              state.skins[index]
                ? { type: "skinEquip", payload: index }
                : { type: "skinBuy", payload: { skinCost: skin.cost, index } }
            }
            img={skin.img}
            name={skin.name}
            colorScheme={state.skin === index ? "green" : state.skins[index] ? "orange" : undefined}
          />
        ))}
      </VStack>

      <Text position="absolute" bottom="2">
        Check out Amaclittle on{" "}
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
