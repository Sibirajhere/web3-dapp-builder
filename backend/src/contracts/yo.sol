// SPDX-License-Identifier: MIT
      pragma solidity ^0.8.0;

      import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

      contract yo is ERC20 {
          constructor() ERC20("yo", "$$F") {
              _mint(msg.sender, 1 * 10 ** decimals());
          }
      }