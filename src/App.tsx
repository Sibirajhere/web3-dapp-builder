// src/App.tsx
import React from 'react';
import Header from './components/Header';
import PageShell from './components/PageShell';
import ContractForm from './components/ContractForm';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <PageShell>
        <h2>Welcome, Builder! 👷</h2>
        <p>
          This tool helps you create & deploy your own ERC20/NFT dApp without writing a single line of blockchain code.
        </p>

        {/* ✅ S3 Contract Form is inserted here */}
        <ContractForm />
      </PageShell>
    </>
  );
};

export default App;
