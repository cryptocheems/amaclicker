// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/token/ERC777/ERC777.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// TODO: Comment things properly

// The Ownable is so the Amaclicker contract can be updated
// and minimum CHEEMS amount so if the price increases a lot it's still useable
contract Amacoin is ERC777, Ownable {
  address public amaclicker;
  IERC20 private cheemscoin;
  uint256 public minCheems = 10**18;

  // Default operator is Amaclicker contract
  // TODO: Make not beta
  constructor(address[] memory defaultOperators, IERC20 _cheemscoin)
    ERC777("Beta Amacoin", "bAMAC", defaultOperators)
  {
    // TODO: Mint to cheems holders and chris
    amaclicker = defaultOperators[0];
    cheemscoin = _cheemscoin;
  }

  function mint(address account, uint256 amount) external {
    require(msg.sender == amaclicker, "Only Amaclicker contract can mint");
    require(cheemscoin.balanceOf(msg.sender) > minCheems, "Must have Cheemscoin");
    _mint(account, amount, "", "");
  }

  function updateAmaclicker(address _amaclicker) external onlyOwner {
    amaclicker = _amaclicker;
  }

  function setMinCheems(uint256 amount) external {
    minCheems = amount;
  }
}
