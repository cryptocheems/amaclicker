import { useColorMode, Grid, GridProps } from "@chakra-ui/react";

export const Container = (props: GridProps) => {
  const { colorMode } = useColorMode();

  const bgColor = { light: "gray.50", dark: "gray.900" };

  return (
    // * If colors are wrong I need to add
    // const color = { light: "black", dark: "white" };
    // and
    // color={color[colorMode]}
    <Grid
      templateColumns="3fr 1fr 3fr"
      placeItems="center"
      bg={bgColor[colorMode]}
      gap="4"
      {...props}
    />
  );
};
