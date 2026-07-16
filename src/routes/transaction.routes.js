const express = require('express');
const router = express.Router();
const {authMiddleware, authSystemUserMiddleware} = require('../middleware/auth.middleware.js');

const { createTransaction, createInitialFundsTransaction } = require('../controllers/transaction.controller.js');

/**
 * - POST /api/transactions
 * - Create a new transaction for the authenticated user.
 */

router.post('/',authMiddleware, createTransaction);

/**
 * - POST /api/transactions/system/initial-funds
 * - Create initial funds transaction from system user
 */

router.post("/system/initial-funds", authSystemUserMiddleware,createInitialFundsTransaction)

module.exports = router;