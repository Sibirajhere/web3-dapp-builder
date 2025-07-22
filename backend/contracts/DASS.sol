// SPDX-License-Identifier: MIT
      pragma solidity ^0.8.0;

      import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

      contract DASS is ERC20 {
          constructor() ERC20("DASS", "DA$$") {
              _mint(msg.sender, 11 * 10 ** decimals());
          }
      }