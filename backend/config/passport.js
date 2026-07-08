const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        let user = await User.findOne({ email });
        if (!user) {
         
          user = await User.create({
            email: email,
            password: "oauth_google_" + profile.id, 
          });
          console.log("✅ New user created via Google OAuth:", email);
        } else {
          console.log("✅ Existing user logged in via Google OAuth:", email);
        }

        // Generate JWT token
        const token = jwt.sign(
          {
            id: user._id,
            email: user.email,
          },
          process.env.JWT_SECRET,
          { expiresIn: "7d" }
        );

        // Pass the user and token to the callback
        return done(null, { user, token });
      } catch (error) {
        console.error("Google OAuth Error:", error);
        return done(error, null);
      }
    }
  )
);

// Serialize user for session (required for passport)
passport.serializeUser((data, done) => {
  done(null, data);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

module.exports = passport;