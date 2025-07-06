export interface ContractConfig {
  type: 'ERC20' | 'ERC721';
  name: string;
  symbol: string;
  supply?: number;
  baseURI?: string;
}

export const generateContract = (config: ContractConfig): Promise<string> => {
  let contract = '';

  if (config.type === 'ERC20') {
    contract = `
      // SPDX-License-Identifier: MIT
      pragma solidity ^0.8.0;

      import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

      contract ${config.name} is ERC20 {
          constructor() ERC20("${config.name}", "${config.symbol}") {
              _mint(msg.sender, ${config.supply || 1000} * 10 ** decimals());
          }
      }
    `;
  } else {
    contract = `
      // SPDX-License-Identifier: MIT
      pragma solidity ^0.8.0;

      import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

      contract ${config.name} is ERC721URIStorage {
          uint256 public tokenCount;

          constructor() ERC721("${config.name}", "${config.symbol}") {}

          function mint(string memory tokenURI) public returns (uint256) {
              tokenCount++;
              _mint(msg.sender, tokenCount);
              _setTokenURI(tokenCount, tokenURI);
              return tokenCount;
          }
      }
    `;
  }

  return Promise.resolve(contract.trim());
};
