// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/token/ERC777/ERC777.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// TODO: Comment things properly

// The Ownable is so the Amaclicker contract can be updated
contract Amacoin is ERC777, Ownable {
  address public amaclicker;

  // Default operator is Amaclicker contract
  // TODO: Make not beta
  constructor(address[] memory defaultOperators) ERC777("Beta Amacoin", "bAMAC", defaultOperators) {
    // TODO: Mint to cheems holders and chris
    amaclicker = defaultOperators[0];
  }

  function mint(address account, uint256 amount) public {
    require(msg.sender == amaclicker, "Only Amaclicker contract can mint");
    _mint(account, amount, "", "");
  }

  function updateAmaclicker(address _amaclicker) public onlyOwner {
    amaclicker = _amaclicker;
  }
}
