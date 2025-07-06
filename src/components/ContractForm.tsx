import React, { useState } from 'react';
import { generateContract } from '../utils/generateContract';

const ContractForm: React.FC = () => {
  const [contractType, setContractType] = useState<'ERC20' | 'ERC721'>('ERC20');
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [supply, setSupply] = useState<number | ''>(''); // ERC20
  const [baseURI, setBaseURI] = useState('');             // ERC721

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const config = {
    type: contractType,
    name,
    symbol,
    supply: contractType === 'ERC20' && supply !== '' ? Number(supply) : undefined,
    baseURI: contractType === 'ERC721' ? baseURI : undefined,
  };

  const contractCode = await generateContract(config);
  console.log('📝 Final Contract Code:\n', contractCode);
};

  return (
    <div>
      <h2>Create Your Contract</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Contract Type:</label>
          <select value={contractType} onChange={(e) => setContractType(e.target.value as 'ERC20' | 'ERC721')}>
            <option value="ERC20">ERC20 (Fungible)</option>
            <option value="ERC721">NFT (ERC721)</option>
          </select>
        </div>

        <div>
          <label>Token Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div>
          <label>Token Symbol:</label>
          <input type="text" value={symbol} onChange={(e) => setSymbol(e.target.value)} />
        </div>

        {/* ✅ Conditional Inputs */}
        {contractType === 'ERC20' && (
          <div>
            <label>Total Supply:</label>
            <input
              type="number"
              value={supply}
              onChange={(e) => setSupply(Number(e.target.value))}
            />
          </div>
        )}

        {contractType === 'ERC721' && (
          <div>
            <label>Base URI:</label>
            <input
              type="text"
              value={baseURI}
              onChange={(e) => setBaseURI(e.target.value)}
            />
          </div>
        )}

        <button type="submit">Generate Contract</button>
      </form>
    </div>
  );
};

export default ContractForm;
