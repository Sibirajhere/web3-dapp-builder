// SPDX-License-Identifier: MIT
      pragma solidity ^0.8.0;

      import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

      contract SIB is ERC20 {
          constructor() ERC20("SIB", "SS$$") {
              _mint(msg.sender, 0.1 * 10 ** decimals());
          }
      }