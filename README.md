🧪 Zypher Contract Lab
No-Code Smart Contract Generator + Sepolia Deployment Toolkit

Zypher Contract Lab empowers users to generate, deploy, and interact with Ethereum smart contracts without writing a single line of code.

It’s built for hackathon teams, beginner devs, and rapid prototyping, combining wallet connect, Solidity code generation, backend deployment, and live interaction UI — all in one seamless flow.

🚀 Features
✅ No-code smart contract code generator (via UI form or prompt)

🔐 Wallet connect with MetaMask (EIP-1193 support)

⚙️ Backend deploys generated code to Sepolia via Hardhat + Ethers

💻 Live frontend preview of deployed contracts (read/write)

🔄 Dynamic Solidity code handling & Hot-reloading

🧱 Auto-generated minimal UI for each deployed contract

🔧 Express + Hardhat server handling deployments and logs

🏗️ Tech Stack
Layer	Stack
Frontend	React + Vite + TailwindCSS
Wallet Connect	wagmi + ethers + MetaMask
Backend	Node.js + Express
Blockchain SDK	ethers.js
Smart Contracts	Solidity + Hardhat
Network	Sepolia Testnet (via Infura)
Other Tools	dotenv, cors, nodemon



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






⚙️ Prerequisites
Node.js (>=18.x)

MetaMask installed in your browser

Infura/Alchemy Sepolia RPC key

A funded wallet with Sepolia ETH (for deployment gas)

🛠️ Installation & Setup
First, clone the project from GitHub. Just open your terminal and type:
git clone https://github.com/yourname/zypher-contract-lab.git
Then move into the project folder with:
cd zypher-contract-lab

Now, install all the dependencies. From the root folder, type:
npm install
Then go into the backend folder using:
cd backend
and install its dependencies too:
npm install

Once that’s done, go to the frontend folder by doing:
cd ../frontend
and again run:
npm install

After installing everything, set up your environment variables.
In the root directory, create a .env file. Inside it, paste the following lines (with your own values):

PRIVATE_KEY=your_wallet_private_key
RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY

This gives Hardhat the credentials and endpoint it needs to deploy contracts to Sepolia testnet.

Now, if you want, you can compile your contracts ahead of time. From the root directory, just run:
npx hardhat compile

To start the backend server, go into the backend folder (if you’re not already in it) and type:
npm run dev
This will start the Express server locally on port 3000.

Then open a new terminal window, go to the frontend folder, and type:
npm run dev
That’ll start your React + Vite frontend on port 5173.

📤 How the Flow Works (Quick Summary)
You open the frontend, fill out a simple form to define your contract.
The UI shows you the generated Solidity code.
When you hit "Deploy", your inputs are sent to the backend.
The backend compiles and deploys the contract to Sepolia using Hardhat + Ethers.
Once deployed, it sends back the contract address and transaction hash.
A minimal UI appears for you to interact with the deployed contract right away.

🧪 Example of Deploy API (If You’re Testing)
The backend accepts a POST request at /api/deploy.
You just send a JSON payload like this:
message: "Hello Web3!"

The response will contain:
success: true
address: "0x..."
txHash: "0x..."


📤 How Deployment Works
User fills the form to generate a Solidity contract (e.g., message, ERC20).

Code is shown for preview + customization (optional).

On “Deploy”, frontend sends code or parameters to the backend.

Backend uses Hardhat + Ethers to deploy it to Sepolia.

Deployment address + tx hash is returned and shown to user.

A mini frontend UI is auto-generated to interact with the contract.

📦 API (Backend)
POST /api/deploy
Deploys the smart contract with params.

Payload:
json
Copy
Edit
{
  "message": "Hello Web3!"
}
Response:
json
Copy
Edit
{
  "success": true,
  "address": "0xDeployedAddressHere",
  "txHash": "0xTransactionHashHere"
}
🔮 Upcoming Improvements
 Deploy using user’s own wallet (via signer)

 Support ERC-721 and ERC-1155 generation

 Drag-and-drop smart contract builder

 Live Solidity editor before deploy

 Deployment logs, gas info, and status tracking

 Multichain support (Polygon, Base, Optimism)
