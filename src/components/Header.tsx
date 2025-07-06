// src/components/Header.tsx
import React from 'react';
import WalletConnect from './WalletConnect';

const Header: React.FC = () => {
  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 24px',
        borderBottom: '1px solid #ccc',
        backgroundColor: '#f9f9f9',
      }}
    >
      <h1 style={{ margin: 0 }}>🔧 Web3 dApp Builder</h1>
      <WalletConnect />
    </header>
  );
};

export default Header;
