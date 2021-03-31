// This is where all the information about all the things you can buy is
// E.g upgrades, investments, skins

import { investment, item, upgrade } from "./interfaces";
import { htm } from "./utility";

export const upgradesInfo: upgrade[] = [
  {
    name: "Gift Card",
    cost: 19.99,
    boost: 0.1,
    img: "giftcard.png",
  },
  {
    name: "Cone",
    cost: 1000,
    boost: 10,
    img: "cone.png",
  },
];

export const investmentsInfo: investment[] = [
  {
    name: "Stream on Twitch",
    cost: 100,
    reward: 500,
    time: htm(5),
    img: "twitch.webp",
  },
  {
    name: "Buy Cheemscoin",
    cost: 10_000,
    reward: 100_000,
    time: htm(24),
    img: "cheemscoin.png",
  },
];

export const skinsInfo: item[] = [
  {
    name: "Default",
    cost: 0,
    img: "amac.svg",
  },
  {
    name: "Amogus",
    cost: 1000,
    img: "amogus.png",
  },
  {
    name: "Trollface",
    cost: 10_000,
    img: "trollface.png",
  },
  {
    name: "Cheemscoin Pet",
    cost: 1_000_000,
    img: "cheemscoinpet.gif",
  },
];
