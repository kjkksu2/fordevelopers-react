import express from "express";
import multer from "multer";
import {
  board,
  comment,
  commentLists,
  deletePost,
  write,
  search,
  update,
  article,
  writeComment,
} from "../controllers/playController";

const uploadImages = multer({ dest: "uploads/images" });

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
playRouter.post(
  "/board/write",
  uploadImages.fields([{ name: "imageFile" }]),
  write
);

/************************************
            게시물 불러오기
 ************************************/
playRouter.get("/board/article", article);

/************************************
             게시물 수정
 ************************************/
playRouter.post(
  "/board/update",
  uploadImages.fields([{ name: "imageFile" }]),
  update
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
playRouter.post("/board/comment/write", writeComment);

/************************************
          댓글 전부 가져오기
 ************************************/
playRouter.get("/board/comment", comment);

export default playRouter;
