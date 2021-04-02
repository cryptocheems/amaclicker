// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.3;

// TODO: Make these uints smaller

struct upgrade {
  uint256 cost;
  uint256 boost;
}

struct investment {
  uint256 cost;
  uint256 reward;
  // How many blocks until you can claim the reward
  uint256 time;
}

struct boughtInvestment {
  // Minimum block to redeem the investment
  uint256 redeemBlock;
  // Index of the investment in investmentsInfo
  uint256 id;
}
