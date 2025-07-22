// SPDX-License-Identifier: MIT
      pragma solidity ^0.8.0;

      import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

      contract fubs is ERC20 {
          constructor() ERC20("fubs", "BSG7") {
              _mint(msg.sender, 7 * 10 ** decimals());
          }
      }