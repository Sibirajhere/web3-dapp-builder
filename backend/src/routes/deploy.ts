import { Router } from 'express';
import fs from 'fs-extra';
import path from 'path';
import { execSync } from 'child_process';
import { ethers } from 'ethers';

const router = Router();
const provider = new ethers.JsonRpcProvider('https://eth-sepolia.g.alchemy.com/v2/nIVxztXmFOR_jcABGdLcu');

// ⚠️ Make sure this private key belongs to an account funded by Hardhat local node
const LOCAL_PRIVATE_KEY = '905f7712405cc99d8e14c42944d8d4cc221b6ca9e6341590da55ed1ca3b0b04a';
const signer = new ethers.Wallet(LOCAL_PRIVATE_KEY, provider);


router.post('/deploy', async (req, res) => {
  const { contractSource, contractName, constructorArgs = [] } = req.body;

  console.log("📥 Incoming deploy request:", { contractName });

  if (!contractSource || !contractName) {
    return res.status(400).json({ error: 'Missing contractSource or contractName' });
  }

  const contractsDir = path.resolve(__dirname, '../../contracts');
  const filePath = path.join(contractsDir, `${contractName}.sol`);

  try {
    // 📝 Step 1: Save .sol file
    await fs.ensureDir(contractsDir);
    await fs.writeFile(filePath, contractSource);
    console.log(`✅ Wrote contract to ${filePath}`);

    // 🛠️ Step 2: Compile with Hardhat
    console.log(`🔧 Compiling contract...`);
    execSync('npx hardhat compile', {
      cwd: path.resolve(__dirname, '../..'), // project root
      stdio: 'inherit',
    });
    console.log(`✅ Compilation complete`);

    // 📦 Step 3: Load compiled artifact
    const artifactPath = path.resolve(
      __dirname,
      `../../artifacts/contracts/${contractName}.sol/${contractName}.json`
    );

    if (!(await fs.pathExists(artifactPath))) {
      throw new Error(`Compiled artifact not found at ${artifactPath}`);
    }

    const artifact = await fs.readJson(artifactPath);
    console.log(`✅ Loaded artifact`);

    // 🚀 Step 4: Deploy the contract
    const factory = new ethers.ContractFactory(artifact.abi, artifact.bytecode, signer);
    const contract = await factory.deploy(...constructorArgs);
    await contract.waitForDeployment();

    const address = await contract.getAddress();
    console.log(`🎉 Contract deployed at ${address}`);

    return res.json({
      success: true,
      address,
      abi: artifact.abi,
    });

  } catch (err: any) {
    console.error('❌ Deployment error:', err);
    return res.status(500).json({ error: err.message || 'Unknown error' });
  }
});

export default router;
