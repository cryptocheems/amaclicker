import { Box, Text } from "@chakra-ui/layout";
import { UserStatsProps } from "../interfaces";

function formatNumber(amount: number) {
  // return amount.toFixed(1);
  return amount;
}

export const UserStats: React.FC<UserStatsProps> = ({ amacoins, clickReward }) => {
  // TODO: Maybe use Stat instead
  return (
    <Box position="fixed" top="1rem" left="1rem">
      <Text>Amacoins: {formatNumber(amacoins)}</Text>
      <Text>Coins Per Click: {formatNumber(clickReward)}</Text>
    </Box>
  );
};
