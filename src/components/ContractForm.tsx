import React, { useState } from 'react';
import { generateContract } from '../utils/generateContract';
import axios from 'axios';

const ContractForm: React.FC = () => {
  const [contractType, setContractType] = useState<'ERC20' | 'ERC721'>('ERC20');
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [supply, setSupply] = useState<number | ''>(''); // ERC20
  const [baseURI, setBaseURI] = useState('');             // ERC721

  const [contractCode, setContractCode] = useState<string>(''); // Generated code
  const [deployedAddress, setDeployedAddress] = useState<string | null>(null);
  const [isDeploying, setIsDeploying] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const config = {
      type: contractType,
      name,
      symbol,
      supply: contractType === 'ERC20' ? supply as number : undefined,
      baseURI: contractType === 'ERC721' ? baseURI : undefined,
    };

    const code = await generateContract(config);
    setContractCode(code);
    setDeployedAddress(null); // Clear previous
  };

  const handleDeploy = async () => {
    if (!contractCode || !name) return alert("Generate the contract first!");

    try {
      setIsDeploying(true);
      const res = await axios.post('http://localhost:3000/zypher/deploy', {
        contractSource: contractCode,
        contractName: name,
        constructorArgs: [], // optional: can be handled dynamically
      });

      setDeployedAddress(res.data.address);
    } catch (err) {
      console.error("❌ Deployment failed:", err);
      alert("❌ Deployment failed. See console.");
    } finally {
      setIsDeploying(false);
    }
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

        {contractType === 'ERC20' && (
          <div>
            <label>Total Supply:</label>
            <input type="number" value={supply} onChange={(e) => setSupply(Number(e.target.value))} />
          </div>
        )}

        {contractType === 'ERC721' && (
          <div>
            <label>Base URI:</label>
            <input type="text" value={baseURI} onChange={(e) => setBaseURI(e.target.value)} />
          </div>
        )}

        <button type="submit">Generate Contract</button>
      </form>

      {/* ✅ Show Preview if available */}
      {contractCode && (
        <div style={{ marginTop: '20px' }}>
          <h3>🔍 Smart Contract Preview:</h3>
          <textarea
            readOnly
            value={contractCode}
            style={{
              width: '100%',
              height: '300px',
              background: '#f5f5f5',
              fontFamily: 'monospace',
              padding: '10px',
              border: '1px solid #ccc',
              whiteSpace: 'pre-wrap'
            }}
          />

          <button
            onClick={handleDeploy}
            disabled={isDeploying}
            style={{
              marginTop: '15px',
              padding: '10px 20px',
              fontWeight: 'bold',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            {isDeploying ? 'Deploying...' : '🚀 Deploy Contract'}
          </button>

          {deployedAddress && (
            <div style={{ marginTop: '10px', color: 'green' }}>
              ✅ Deployed at: <code>{deployedAddress}</code>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ContractForm;
