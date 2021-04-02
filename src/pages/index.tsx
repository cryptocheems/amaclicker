import {
  Button,
  Flex,
  GridItem,
  Heading,
  Image,
  Link,
  Stat,
  StatHelpText,
  StatNumber,
  Text,
  VStack,
} from "@chakra-ui/react";
import Head from "next/head";
import { Container } from "../components/Container";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { useEffect, useReducer, useState } from "react";
import { UserStats } from "../components/UserStats";
import { investmentsInfo, skinsInfo, upgradesInfo } from "../misc/info";
import { defaultState, reducer } from "../misc/state";
import { SectionTitle } from "../components/store/SectionTitle";
import { StoreUpgrade } from "../components/store/StoreUpgrade";
import { StoreItem } from "../components/store/StoreItem";
import { mth } from "../misc/utility";
import { AmacIcon } from "../components/AmacIcon";

const Index = () => {
  const [state, dispatch] = useReducer(reducer, defaultState);
  const [now, setNow] = useState(new Date().getTime());

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
    setNow(new Date().getTime());
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
        left="1"
        bottom="1"
        onClick={() => {
          // TODO: Delete this button
          localStorage.setItem("state", JSON.stringify(defaultState));
          location.reload();
        }}
      >
        Reset State
      </Button>

      <GridItem borderWidth="thin" borderRadius="2xl" p="2.5">
        <Heading textAlign="center">Investments</Heading>
        <Flex maxW="35em" flexWrap="wrap" maxH="36em" overflowY="scroll">
          {state.investments.map((investment, i) => {
            if (investment) {
              const iInfo = investmentsInfo[investment.id];
              const redeemTime = investment.redeemTime;

              return (
                <Button
                  height="5em"
                  m="1"
                  padding="2"
                  onClick={() => dispatch({ type: "redeem", payload: i })}
                >
                  <Image
                    src={iInfo.img}
                    filter={redeemTime > now ? "grayscale(90%)" : undefined}
                    fit="cover"
                    maxHeight="100%"
                    draggable="false"
                  />
                  <Stat key={i}>
                    <StatNumber fontSize="3xl" alignContent="center" display="inline-flex">
                      {iInfo.reward} <AmacIcon size={8} />
                    </StatNumber>
                    <StatHelpText>{new Date(redeemTime).toLocaleString()}</StatHelpText>
                  </Stat>
                </Button>
              );
            }
            return null;
          })}
        </Flex>
      </GridItem>

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

      <VStack
        borderWidth="thin"
        width="27em"
        p="2.5"
        borderRadius="2xl"
        maxH="40em"
        overflowY="scroll"
      >
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
        {investmentsInfo.map((investment, index) => (
          <StoreItem
            dispatch={dispatch}
            key={index}
            img={investment.img}
            cost={investment.cost}
            name={investment.name}
            extra={
              <Text placeContent="center" display="flex">
                {mth(investment.time)} hours; {investment.reward}
                <AmacIcon />
                reward
              </Text>
            }
            // TODO: This
            dispatchArgs={{ type: "invest", payload: { investment, index } }}
          />
        ))}
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

      <Text position="absolute" bottom="2" textAlign="center" w="100%">
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
