import { Box, Text } from "@chakra-ui/layout";

interface UserStatsProps {
  amacoins: number;
  clickReward: number;
}

function formatNumber(amount: number) {
  return amount.toFixed(1);
}

export const UserStats: React.FC<UserStatsProps> = ({ amacoins, clickReward }) => {
  // TODO: Maybe use Stat instead
  return (
    <Box position="fixed" top="1rem" left="1rem">
      <Text>Amacoins: {formatNumber(amacoins)}</Text>
      <Text>CPC: {formatNumber(clickReward)}</Text>
    </Box>
  );
};
