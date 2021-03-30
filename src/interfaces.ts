export interface UserStatsProps {
  amacoins: number;
  clickReward: number;
}

export interface upgrade {
  name: string;
  cost: number;
  boost: number;
  userAmount: number;
}

export interface upgradeButtonPayload {
  upgrade: upgrade;
  index: number;
}

export interface iAmacState extends UserStatsProps {
  upgrades: upgrade[];
}
