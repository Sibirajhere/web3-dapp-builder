// SPDX-License-Identifier: MIT
      pragma solidity ^0.8.0;

      import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

      contract dce is ERC20 {
          constructor() ERC20("dce", "[[[") {
              _mint(msg.sender, 5 * 10 ** decimals());
          }
      }