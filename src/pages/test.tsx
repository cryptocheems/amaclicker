import { useEthers, useEtherBalance, useContractCall, useTokenBalance } from "@usedapp/core";
import { Button, Text } from "@chakra-ui/react";
import { formatEther } from "@ethersproject/units";
import amacoin from "../artifacts/Amacoin.json";
import amaclicker from "../artifacts/Amaclicker.json";
import { Interface } from "@ethersproject/abi";

const test: React.FC = () => {
  const { activateBrowserWallet, account } = useEthers();
  const etherBalance = useEtherBalance(account);
  const AMAC = "0x9B7d837cb309716783dD38214182d0b7a7e506d2";

  const tokenBalance = useTokenBalance("0x18D9b6a9797D728989547F9d7d82250e4A830cA8", AMAC);

  const defaultOperators = useContractCall({
    abi: new Interface(amacoin.abi),
    address: AMAC,
    args: [],
    method: "defaultOperators",
  });

  const amacoinAddress = useContractCall({
    abi: new Interface(amaclicker.abi),
    address: "0x18D9b6a9797D728989547F9d7d82250e4A830cA8",
    args: [],
    method: "amacoin",
  });

  return (
    <>
      <Button onClick={activateBrowserWallet}>Connect</Button>
      <Text>
        {account}: {etherBalance && formatEther(etherBalance)}
      </Text>
      <Text>AMAC: {tokenBalance && formatEther(tokenBalance)}</Text>
      <Text>{defaultOperators}</Text>
      <Text>{amacoinAddress}</Text>
    </>
  );
};

export default test;
