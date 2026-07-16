const express = require('express')
const { userRegisterController, userLoginController, userLogoutController } = require('../controllers/auth.controller.js')
const {googleCallback} = require("../controllers/googleAuth.controller.js");
const router = express.Router()
const passport = require("../config/passport.js");

/*POST /api/auth/register */
router.post('/register', userRegisterController)
router.post('/login', userLoginController)

/**
 * - POST /api/auth/logout 
 * - user logout Controller
 */

router.post("/logout", userLogoutController)

router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile", "email"],
    })
);

router.get(
    "/google/callback",
    passport.authenticate("google", {
        session: false,
        failureRedirect: "/api/auth/login",
    }),
    googleCallback
);

module.exports = router