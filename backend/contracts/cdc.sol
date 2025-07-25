// SPDX-License-Identifier: MIT
      pragma solidity ^0.8.0;

      import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

      contract cdc is ERC721URIStorage {
          uint256 public tokenCount;

          constructor() ERC721("cdc", "DCE") {}

          function mint(string memory tokenURI) public returns (uint256) {
              tokenCount++;
              _mint(msg.sender, tokenCount);
              _setTokenURI(tokenCount, tokenURI);
              return tokenCount;
          }
      }