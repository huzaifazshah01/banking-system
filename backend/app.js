const express = require('express');
const cors = require('cors');
require("dotenv").config();

const authRoutes = require('./routes/authRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const bankerRoutes = require('./routes/bankerRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/banker', bankerRoutes);

module.exports = app;