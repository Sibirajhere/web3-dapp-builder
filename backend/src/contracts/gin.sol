// SPDX-License-Identifier: MIT
      pragma solidity ^0.8.0;

      import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

      contract gin is ERC20 {
          constructor() ERC20("gin", "DEC") {
              _mint(msg.sender, 1 * 10 ** decimals());
          }
      }