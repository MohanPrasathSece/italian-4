import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import signupHandler from './api/auth/signup.js';
import loginHandler from './api/auth/login.js';
import contactHandler from './api/contact.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Pass requests to the Vercel serverless function handlers
app.all('/api/auth/signup', async (req, res) => {
  await signupHandler(req, res);
});

app.all('/api/auth/login', async (req, res) => {
  await loginHandler(req, res);
});

app.all('/api/contact', async (req, res) => {
  await contactHandler(req, res);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`[API Server] Running locally on http://localhost:${PORT}`);
});
