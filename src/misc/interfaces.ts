export interface UserStatsProps {
  amacoins: number;
  clickReward: number;
}

export interface item {
  name: string;
  cost: number;
  img: string;
}

export interface upgrade extends item {
  // * Note: cost is a base cost
  boost: number;
}

export interface investment extends item {
  // For the onchain time it will be in blocks (~5 seconds on xDai)
  // Offchain it will be milliseconds
  time: number;
  // Not including cost
  reward: number;
}

export interface boughtInvestment {
  // In milliseconds
  redeemTime: number;
  // Index in the array of investments
  id: number;
}

export interface iAmacState extends UserStatsProps {
  upgrades: number[];
  // index of skin
  skin: number;
  // unlocked skins
  skins: boolean[];
  investments: boughtInvestment[];
}

export interface upgradeButtonPayload {
  upgrade: upgrade;
  index: number;
}

export interface skinPayload {
  skinCost: number;
  index: number;
}

export interface investPayload {
  investment: investment;
  index: number;
}

type dispatchArgs = {
  type: string;
  payload?: unknown;
};

type dispatch = (value: dispatchArgs) => void;

type colorScheme =
  | (string & {})
  | "green"
  | "whiteAlpha"
  | "blackAlpha"
  | "gray"
  | "red"
  | "orange"
  | "yellow"
  | "teal"
  | "blue"
  | "cyan"
  | "purple"
  | "pink"
  | "linkedin"
  | "facebook"
  | "messenger"
  | "whatsapp"
  | "twitter"
  | "telegram";

export interface StoreItemProps extends item {
  balance?: number;
  extra?: any;
  colorScheme?: colorScheme;
  dispatchArgs: dispatchArgs;
  dispatch: dispatch;
}

export interface StoreUpgradeProps extends upgradeButtonPayload {
  state: iAmacState;
  dispatch: dispatch;
}
