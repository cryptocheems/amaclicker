import { Box, Text } from "@chakra-ui/layout";
import toDecimals from "round-to-decimal";
import { UserStatsProps } from "../misc/interfaces";

function formatNumber(amount: number) {
  return toDecimals(amount, 2);
}

export const UserStats: React.FC<UserStatsProps> = ({ amacoins, clickReward }) => {
  // TODO: Maybe use Stat instead
  return (
    <Box position="fixed" top="1rem" left="1rem">
      <Text>Amacoins: {formatNumber(amacoins)}</Text>
      <Text>Coins Per Click (CPC): {formatNumber(clickReward)}</Text>
    </Box>
  );
};
