import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const ContractFactory = await ethers.getContractFactory("MyContract");
  const contract = await ContractFactory.deploy();

  // Wait for the contract to be mined
  await contract.waitForDeployment();

  // Get the deployed contract address
  const address = await contract.getAddress();

  console.log("Contract deployed at:", address);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
