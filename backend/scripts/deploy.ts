import { ethers } from "hardhat";
import fs from "fs";
import path from "path";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("🚀 Deploying with account:", deployer.address);

  // Dynamically read the Solidity contract
  const contractPath = path.join(__dirname, "../contracts/Generated.sol");
  const solidityCode = fs.readFileSync(contractPath, "utf8");

  // Extract the contract name
  const match = solidityCode.match(/contract\s+(\w+)/);
  if (!match) throw new Error("❌ No contract name found in Generated.sol");

  const contractName = match[1];
  console.log("📄 Detected Contract:", contractName);

  // Compile and deploy
  const ContractFactory = await ethers.getContractFactory(contractName);
  const contract = await ContractFactory.deploy();

  await contract.waitForDeployment();
  const address = await contract.getAddress();

  console.log("✅ Contract deployed at:", address);
}

main().catch((err) => {
  console.error("❌ Deployment failed:", err);
  process.exit(1);
});
