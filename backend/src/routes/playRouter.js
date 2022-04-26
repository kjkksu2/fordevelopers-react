import express from "express";
import {
  board,
  comment,
  commentLists,
  deletePost,
  write,
  search,
  updatePost,
} from "../controllers/playController";

const playRouter = express.Router();

/************************************
        전체 게시물 불러오기
 ************************************/
playRouter.post("/board", board);

/************************************
             검색하기
 ************************************/
playRouter.post("/board/search", search);

/************************************
              글쓰기
 ************************************/
playRouter.post("/board/write", write);

/************************************
             게시물 수정
 ************************************/
playRouter.post(
  "/:categories(devs|communities)/post/:postId([0-9a-f]{24})/update",
  updatePost
);

/************************************
             게시물 삭제
 ************************************/
playRouter.post(
  "/:categories(devs|communities)/post/:postId([0-9a-f]{24})/delete",
  deletePost
);

/************************************
            댓글 등록하기
 ************************************/
playRouter.post(
  "/:categories(devs|communities)/post/:postId([0-9a-f]{24})/comment",
  comment
);

/************************************
          댓글 전부 가져오기
 ************************************/
playRouter.get(
  "/:categories(devs|communities)/post/:postId([0-9a-f]{24})/commentLists",
  commentLists
);

export default playRouter;
