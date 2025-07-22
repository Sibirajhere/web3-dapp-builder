# 🧪 Zypher Contract Lab

**No-Code Smart Contract Generator + Sepolia Deployment Toolkit**

Zypher Contract Lab empowers users to generate, deploy, and interact with Ethereum smart contracts without writing a single line of code.

It's built for hackathon teams, beginner devs, and rapid prototyping, combining wallet connect, Solidity code generation, backend deployment, and live interaction UI — all in one seamless flow.

## 🚀 Features

- ✅ No-code smart contract code generator (via UI form or prompt)
- 🔐 Wallet connect with MetaMask (EIP-1193 support)
- ⚙️ Backend deploys generated code to Sepolia via Hardhat + Ethers
- 💻 Live frontend preview of deployed contracts (read/write)
- 🔄 Dynamic Solidity code handling & Hot-reloading
- 🧱 Auto-generated minimal UI for each deployed contract
- 🔧 Express + Hardhat server handling deployments and logs

## 🏗️ Tech Stack

| Layer | Stack |
|-------|-------|
| Frontend | React + Vite + TailwindCSS |
| Wallet Connect | wagmi + ethers + MetaMask |
| Backend | Node.js + Express |
| Blockchain SDK | ethers.js |
| Smart Contracts | Solidity + Hardhat |
| Network | Sepolia Testnet (via Infura) |
| Other Tools | dotenv, cors, nodemon |

## 📂 Folder Structure

```bash
zypher-contract-lab/
├── contracts/                # Holds generated smart contracts
│   └── MyContract.sol
├── scripts/                  # Hardhat deploy scripts
│   └── deploy.js
├── backend/
│   ├── index.js              # Express server
│   ├── routes/
│   │   └── deploy.js         # POST /api/deploy
│   └── utils/
│       └── compileContract.js (optional)
├── frontend/                 # React Vite app (UI + Wallet Connect)
│   ├── ...
├── hardhat.config.js
├── .env
├── package.json
└── README.md
```

## ⚙️ Prerequisites

- Node.js (>=18.x)
- MetaMask installed in your browser
- Infura/Alchemy Sepolia RPC key
- A funded wallet with Sepolia ETH (for deployment gas)

## 🛠️ Installation & Setup

### 1. Clone the Repo

```bash
git clone https://github.com/yourname/zypher-contract-lab.git
cd zypher-contract-lab
```

### 2. Install Dependencies

Install root and backend deps:

```bash
npm install
cd backend
npm install
```

Then go to frontend:

```bash
cd ../frontend
npm install
```

### 3. Setup Environment Variables

Create a `.env` in the root directory:

```env
PRIVATE_KEY=your_wallet_private_key
RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
```

⚠️ **Keep this file secret. Do not commit it.**

### 4. Compile Contracts (Optional)

```bash
npx hardhat compile
```

### 5. Run Backend (Express + Hardhat)

```bash
cd backend
npm run dev
```

Runs the backend at `http://localhost:3000` with hot-reloading.

### 6. Run Frontend (React + Vite)

```bash
cd frontend
npm run dev
```

Starts the frontend at `http://localhost:5173`.

## 📤 How Deployment Works

1. User fills the form to generate a Solidity contract (e.g., message, ERC20).
2. Code is shown for preview + customization (optional).
3. On "Deploy", frontend sends code or parameters to the backend.
4. Backend uses Hardhat + Ethers to deploy it to Sepolia.
5. Deployment address + tx hash is returned and shown to user.
6. A mini frontend UI is auto-generated to interact with the contract.

## 📦 API (Backend)

### POST /api/deploy

Deploys the smart contract with params.

**Payload:**
```json
{
  "message": "Hello Web3!"
}
```

**Response:**
```json
{
  "success": true,
  "address": "0xDeployedAddressHere",
  "txHash": "0xTransactionHashHere"
}
```

## 🔮 Upcoming Improvements

- [ ] Deploy using user's own wallet (via signer)
- [ ] Support ERC-721 and ERC-1155 generation
- [ ] Drag-and-drop smart contract builder
- [ ] Live Solidity editor before deploy
- [ ] Deployment logs, gas info, and status tracking
- [ ] Multichain support (Polygon, Base, Optimism)

## 👨‍💻 Ideal For

- Hackathon participants needing fast contract deployment
- Beginners learning Solidity
- dApp builders testing MVPs
- Educators and bootcamp instructors

## 🧠 Behind the Name

Zypher Contract Lab is a subproject of the Zypher ecosystem, focused on no-code Web3 tools. This is not related to Zypher SDK (which focuses on ZK-proof generation). This repo is exclusively for smart contract generation and deployment.

## 🪪 License

MIT — use it freely, modify it, and improve it.
