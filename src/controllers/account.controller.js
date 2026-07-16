const Account = require("../models/account.model.js");

/**
 * - POST /api/accounts
 * - Create a new account 
 * - Protected route, requires authentication
 */
async function createAccountController(req, res) {
  const { _id } = req.user;

  const account = await Account.create({ user: _id });

  res.status(201).json({
    account,
    message: "Account created successfully",
  });
}

/**
 * - GET /api/accounts
 * - Get all accounts of the logged-in user
 * - Protected route
 */
async function getUserAccountsController(req,res){
  const accounts = await Account.find({user: req.user._id});

  res.status(200).json({
    accounts
  })
}

/**
 * - GET /api/accounts/balance/:accountId
 */
async function getAccountBalanceController(req,res){
  const {accountId} = req.params

  const account = await Account.findOne({
    _id: accountId,
    user:req.user._id
  })

  if(!account){
    return res.status(404).json({
      message:"Account Not found"
    })
  }

  const balance = await account.getBalance();

  res.status(200).json({
    accountId:account._id,
    balance:balance
  })
}

module.exports = {
  createAccountController,
  getUserAccountsController,
  getAccountBalanceController
};
