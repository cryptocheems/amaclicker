// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.3;

import "./Amacoin.sol";
import "./Structs.sol";

contract Amaclicker {
  Amacoin public amacoin;

  // User info
  mapping(address => uint256) public clickRewards;
  mapping(address => uint256[]) public upgrades;
  mapping(address => boughtInvestment[]) public investments;
  mapping(address => bool[]) public skins;

  // TODO: Finish these
  // Items info
  upgrade[] public upgradesInfo;
  investment[] public investmentsInfo;
  uint256[] public skinsInfo = [0, 1000 * 10**18, 10000 * 10**18];

  constructor(IERC20 cheemscoin) {
    address[] memory defaultOperators = new address[](1);
    defaultOperators[0] = address(this);
    amacoin = new Amacoin(defaultOperators, cheemscoin);
    amacoin.transferOwnership(msg.sender);

    // Initialise items info
    upgradesInfo.push(upgrade(19.99 * 10**18, 0.1 * 10**18));
    upgradesInfo.push(upgrade(1000 * 10**18, 10 * 10**18));
    investmentsInfo.push(investment(10 * 10**18, 40 * 10**18, 72));
  }

  function click() external {
    amacoin.mint(msg.sender, clickRewards[msg.sender] + 10**18);
  }

  modifier purchase(uint256 cost) {
    require(amacoin.balanceOf(msg.sender) >= cost, "Not enough amacoins");
    _;
    amacoin.operatorBurn(msg.sender, cost, "", "");
  }

  function buyUpgrade(uint256 upgradeIndex) external purchase(upgradesInfo[upgradeIndex].cost) {
    upgrade memory up = upgradesInfo[upgradeIndex];

    upgrades[msg.sender][upgradeIndex] += 1;
    clickRewards[msg.sender] += up.boost;
  }

  function buyInvestment(uint256 investmentIndex)
    external
    purchase(investmentsInfo[investmentIndex].cost)
  {
    investments[msg.sender].push(
      boughtInvestment(block.number + investmentsInfo[investmentIndex].time, investmentIndex)
    );
  }

  function buySkin(uint256 skindex) external purchase(skinsInfo[skindex]) {
    skins[msg.sender][skindex] = true;
  }

  // boughtInvestments
  function redeem(uint256 index) external {
    boughtInvestment memory inv = investments[msg.sender][index];
    require(block.number >= inv.redeemBlock, "Investment not matured");

    amacoin.mint(msg.sender, investmentsInfo[inv.id].reward);
    delete investments[msg.sender][index];
  }
}
