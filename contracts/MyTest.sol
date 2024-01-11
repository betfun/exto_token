// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
import "hardhat/console.sol";

contract  MyTest {
  uint256 public unlockTime;
  address payable public owner;
  
  constructor(uint256 _unlockTime) payable{
    require(
      block.timestamp < _unlockTime,
      "Unlock time should be in the future"
    );

    unlockTime = _unlockTime;
    owner = payable(msg.sender);
  }

  function  withdraw() public view returns (uint256) {
    console.log("Unlock time is %o and block timestamp is %o", unlockTime, block.timestamp);
    console.log(address(this).balance);
    console.log(1 ether);
    return unlockTime;
  }
}