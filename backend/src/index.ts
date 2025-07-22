import express from 'express';
import { ethers } from 'ethers';

import dotenv from 'dotenv';
import cors from 'cors';
import deployRoute from './routes/deploy';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/zypher', deployRoute);

// Health Check
app.get('/', (req, res) => {
  res.send('Zypher Backend Running ✅');
});

// ✅ Start server (ONLY ONCE)
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
