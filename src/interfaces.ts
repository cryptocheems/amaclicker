export interface UserStatsProps {
  amacoins: number;
  clickReward: number;
}

export interface upgrade {
  name: string;
  // * Note: this is a base cost
  cost: number;
  boost: number;
  img: string;
}

export interface investment {
  name: string;
  cost: number;
  // For the onchain time it will be in blocks (~5 seconds on xDai)
  // Offchain it will be milliseconds
  time: number;
  // Not including cost
  reward: number;
}

export interface upgradeButtonPayload {
  upgrade: upgrade;
  index: number;
}

export interface iAmacState extends UserStatsProps {
  upgrades: number[];
}

export interface StoreItemProps extends upgradeButtonPayload {
  state: iAmacState;
  dispatch: (value: { type: string; payload?: unknown }) => void;
}
