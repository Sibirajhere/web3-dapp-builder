// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract {{CONTRACT_NAME}} is ERC721URIStorage {
    uint256 private _tokenIdCounter;

    constructor() ERC721("{{TOKEN_NAME}}", "{{TOKEN_SYMBOL}}") {}

    function mint(string memory uri) public {
        _safeMint(msg.sender, _tokenIdCounter);
        _setTokenURI(_tokenIdCounter, uri);
        _tokenIdCounter += 1;
    }
}
