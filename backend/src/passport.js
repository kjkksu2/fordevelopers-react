import passport from "passport";
import dotenv from "dotenv";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { googleCallback } from "./controllers/userController";
import User from "./models/User";

dotenv.config();

/********************************
          구글 로그인
********************************/
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    googleCallback
  )
);

// googleCallback이 valid면 실행
passport.serializeUser(function (user, done) {
  return done(null, user.id);
});

// googleCallback이 valid면 실행
passport.deserializeUser(async function (id, done) {
  const user = await User.findById(id);
  return done(null, user);
});
