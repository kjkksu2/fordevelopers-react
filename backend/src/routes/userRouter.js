import express from "express";
import passport from "passport";
import { authUser, googleLoginFinish } from "../controllers/userController";
import "../passport";

const userRouter = express.Router();

/********************************
          구글 로그인
********************************/
userRouter.get(
  "/google/login",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

userRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3000/login",
  }),
  googleLoginFinish
);

/********************************
        로그인 했는지 확인
********************************/
userRouter.get("/auth", authUser);

export default userRouter;
