// ✅ FILE: src/routes/deploy.ts
import express from 'express';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.post('/deploy', async (req, res) => {
  const { solidityCode, contractName } = req.body;

  if (!solidityCode || !contractName) {
    return res.status(400).json({ error: 'Missing contractName or solidityCode' });
  }

  const contractsDir = path.join(__dirname, '../../contracts');
  const contractPath = path.join(contractsDir, 'Generated.sol');

  try {
    // Step 1: Save solidity code to contracts/Generated.sol
    fs.writeFileSync(contractPath, solidityCode);

    // Step 2: Compile and deploy using Hardhat script
    exec(`npx hardhat run scripts/deploy.ts --network sepolia`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Deployment error: ${error}`);
        return res.status(500).json({ error: 'Deployment failed', details: stderr });
      }

      // Step 3: Extract deployed contract address from stdout
      const match = stdout.match(/Contract deployed to: (0x[a-fA-F0-9]{40})/);
      if (match && match[1]) {
        res.json({ address: match[1] });
      } else {
        res.status(500).json({ error: 'Deployment output invalid', output: stdout });
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
