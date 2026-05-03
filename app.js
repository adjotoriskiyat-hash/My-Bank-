require('dotenv').config();
require('express-async-errors');
const express = require('express');
const connectDB = require('./config/db');

const authRoutes = require('./modules/auth/auth.route');
const accountRoutes = require('./modules/account/account.route');
const transactionRoutes = require('./modules/transaction/transaction.route');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to HUB Bank Nova API!' });
});

app.use('/api/auth', authRoutes);
app.use('/api/account', accountRoutes);
app.use('/api/transaction', transactionRoutes);

app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ message: err.message || 'Something went wrong' });
});

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
  });
});
