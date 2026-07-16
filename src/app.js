const express = require('express')
const cookieParser = require('cookie-parser')
const passport = require("./config/passport");

const authRoutes = require('./routes/auth.routes.js')
const accountRoutes = require('./routes/account.routes.js')
const transactionRoutes = require('./routes/transaction.routes.js')

const app = express()

// Middleware to parse JSON request bodies
app.use(express.json())

// Middleware to parse cookies
app.use(cookieParser())

// Initialize Passport.js
app.use(passport.initialize());

app.use('/api/auth', authRoutes)
app.use('/api/accounts', accountRoutes)
app.use('/api/transactions', transactionRoutes)

module.exports = app