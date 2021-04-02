import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme";
import { AppProps } from "next/app";
import { ChainId, Config, DAppProvider } from "@usedapp/core";

const config: Config = {
  readOnlyChainId: ChainId.xDai,
  readOnlyUrls: {
    // TODO: Fix this
    [ChainId.xDai]: "https://xdai.1hive.org/",
  },
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DAppProvider config={config}>
      <ChakraProvider resetCSS theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </DAppProvider>
  );
}

export default MyApp;
