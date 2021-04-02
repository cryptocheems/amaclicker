// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.3;

import "./Amacoin.sol";

contract Amaclicker {
  Amacoin public amacoin;
  mapping(address => uint256) public clickRewards;

  // TODO: Make this in memory instead
  address[] private defaultOperators;

  constructor() {
    defaultOperators.push(address(this));
    amacoin = new Amacoin(defaultOperators);
    delete defaultOperators;
  }

  // TODO: require caller to own cheemscoin
  function click() external {
    amacoin.mint(msg.sender, clickRewards[msg.sender] + 1 * 10**18);
  }
}
