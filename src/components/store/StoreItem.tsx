import { Button, Box, Text, Image } from "@chakra-ui/react";
import React from "react";
import { StoreItemProps } from "../../misc/interfaces";
import { AmacIcon } from "../AmacIcon";

export const StoreItem: React.FC<StoreItemProps> = ({
  dispatch,
  dispatchArgs,
  cost,
  img,
  name,
  balance,
  extra,
  colorScheme,
}) => {
  return (
    <Button
      height="5em"
      padding="2"
      width="100%"
      justifyContent="space-around"
      onClick={() => dispatch(dispatchArgs)}
      colorScheme={colorScheme}
    >
      <Image src={img} fit="cover" maxHeight="100%" draggable="false" />
      <Box mx="3" textAlign="left">
        <Text fontSize="2xl">{name}</Text>
        <Text fontSize="sm" alignItems="center" d="inline-flex">
          {cost} <AmacIcon /> {extra}
        </Text>
      </Box>
      <Text fontSize="xxx-large">{balance}</Text>
    </Button>
  );
};
