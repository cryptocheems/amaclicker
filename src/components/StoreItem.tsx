import { Button, Box, Text, Image } from "@chakra-ui/react";
import React from "react";
import { StoreItemProps } from "../misc/interfaces";
import { calcCost, getArrayNumber } from "../misc/utility";
import { AmacIcon } from "./AmacIcon";

export const StoreItem: React.FC<StoreItemProps> = ({ upgrade, state, index, dispatch }) => {
  const bal = getArrayNumber(state.upgrades, index);

  return (
    <Button
      height="5em"
      padding="2"
      width="100%"
      justifyContent="space-around"
      onClick={() => dispatch({ type: "upgrade", payload: { upgrade, index } })}
    >
      <Image src={upgrade.img} fit="cover" maxHeight="100%" />
      <Box mx="3" textAlign="left">
        <Text fontSize="2xl">{upgrade.name}</Text>
        <Text fontSize="sm" /* TODO: replace Ā with logo */ alignItems="center" d="inline-flex">
          {calcCost(upgrade, bal)} <AmacIcon /> +{upgrade.boost} CPC
        </Text>
      </Box>
      <Text fontSize="xxx-large">{bal}</Text>
    </Button>
  );
};
