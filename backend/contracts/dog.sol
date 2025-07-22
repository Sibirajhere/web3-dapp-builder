// SPDX-License-Identifier: MIT
      pragma solidity ^0.8.0;

      import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

      contract dog is ERC20 {
          constructor() ERC20("dog", "FYP") {
              _mint(msg.sender, 1 * 10 ** decimals());
          }
      }