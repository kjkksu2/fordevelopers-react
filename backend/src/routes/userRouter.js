import express from "express";
import passport from "passport";
import {
  googleLoginFinish,
  logout,
  authUser,
  isLoggedIn,
  loggedInUserLists,
  webClosed,
  webOpen,
} from "../controllers/userController";
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
    failureRedirect: "http://localhost:3000/",
  }),
  googleLoginFinish
);

/********************************
          구글 로그아웃
********************************/
userRouter.get("/google/logout", logout);

/********************************
        유저 정보 가져오기
********************************/
userRouter.get("/auth", authUser);

/********************************
      로그인 상태인지 확인
********************************/
userRouter.get("/isLoggedIn", isLoggedIn);

/********************************
      로그인한 유저 리스트
********************************/
userRouter.get("/loginLists", loggedInUserLists);

/********************************
      유저가 웹을 닫은 경우
********************************/
userRouter.post("/web/close", webClosed);

/********************************
      유저가 웹을 연 경우
********************************/
userRouter.post("/web/open", webOpen);

export default userRouter;
