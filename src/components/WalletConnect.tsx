import React, { useEffect, useState } from 'react';

declare global {
  interface Window {
    ethereum?: any;
  }
}

interface WalletConnectProps {
  onConnect?: (address: string) => void;
}

const WalletConnect: React.FC<WalletConnectProps> = ({ onConnect }) => {
  const [account, setAccount] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!window.ethereum) {
      setError('🦊 MetaMask is not installed.');
      return;
    }

    const handleAccountsChanged = (accounts: string[]) => {
      setAccount(accounts[0] || null);
    };

    const handleChainChanged = () => {
      window.location.reload();
    };

    window.ethereum.on('accountsChanged', handleAccountsChanged);
    window.ethereum.on('chainChanged', handleChainChanged);

    return () => {
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      window.ethereum.removeListener('chainChanged', handleChainChanged);
    };
  }, []);

  const connectWallet = async () => {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]);
      setError(null);
      onConnect?.(accounts[0]);
    } catch (err) {
      setError('🛑 Connection rejected.');
    }
  };

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!account && !error && (
        <button onClick={connectWallet}>🔌 Connect Wallet</button>
      )}

      {account && (
        <p>✅ Connected: {account.slice(0, 6)}...{account.slice(-4)}</p>
      )}
    </div>
  );
};

export default WalletConnect;
