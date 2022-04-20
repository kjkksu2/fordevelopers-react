import express from "express";
import {
  board,
  comment,
  commentLists,
  deletePost,
  enrollment,
  updatePost,
} from "../controllers/menuController";

const menuRouter = express.Router();

/************************************
            게시물 등록하기
 ************************************/
menuRouter.post("/:categories(devs|communities)/enrollment", enrollment);

/************************************
         게시물 전부 가져오기
 ************************************/
menuRouter.get("/:categories(devs|communities)/board", board);

/************************************
             게시물 수정
 ************************************/
menuRouter.post(
  "/:categories(devs|communities)/post/:postId([0-9a-f]{24})/update",
  updatePost
);

/************************************
             게시물 삭제
 ************************************/
menuRouter.post(
  "/:categories(devs|communities)/post/:postId([0-9a-f]{24})/delete",
  deletePost
);

/************************************
            댓글 등록하기
 ************************************/
menuRouter.post(
  "/:categories(devs|communities)/post/:postId([0-9a-f]{24})/comment",
  comment
);

/************************************
          댓글 전부 가져오기
 ************************************/
menuRouter.get(
  "/:categories(devs|communities)/post/:postId([0-9a-f]{24})/commentLists",
  commentLists
);

export default menuRouter;
