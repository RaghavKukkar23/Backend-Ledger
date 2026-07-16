const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const User = require("../models/user.model.js");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;

        // 1. Check if user already signed up with Google
        let user = await User.findOne({ googleId: profile.id });

        if (user) {
          return done(null, user);
        }

        // 2. Check if email/password account already exists
        user = await User.findOne({ email });

        if (user) {
          // Link Google account
          user.googleId = profile.id;
          await user.save();

          return done(null, user);
        }

        // 3. Create a new Google user
        user = await User.create({
          name: profile.displayName,
          email: email,
          googleId: profile.id,
        });

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

module.exports = passport;