const express = require('express');
const { authMiddleware } = require('../middleware/auth.middleware.js');
const { createAccountController, getUserAccountsController, getAccountBalanceController } = require('../controllers/account.controller.js');

const router = express.Router();

/**
 * - POST /api/accounts
 * - Create a new account 
 * - Protected route, requires authentication
 */

router.post('/', authMiddleware,createAccountController);

/**
 * - GET /api/accounts
 * - Get all accounts of the logged-in user
 * - Protected route
 */
router.get('/',authMiddleware,getUserAccountsController)

/**
 * - GET /api/accounts/balance/:accountId
 */
router.get('/balance/:accountId',authMiddleware,getAccountBalanceController)

module.exports = router;
