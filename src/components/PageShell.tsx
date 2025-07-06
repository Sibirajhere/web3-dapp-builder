// src/components/PageShell.tsx
import React from 'react';

const PageShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <main
      style={{
        maxWidth: '960px',
        margin: '24px auto',
        padding: '0 16px',
      }}
    >
      {children}
    </main>
  );
};

export default PageShell;
