import express from "express";
import { deleteImage, like, views, scrap } from "../controllers/apiController";

const apiRouter = express.Router();

/************************************
      게시물 수정에서 이미지 삭제
************************************/
apiRouter.post("/board/image/delete", deleteImage);

/************************************
          게시글 좋아요 수
************************************/
apiRouter.post("/board/like", like);

/************************************
          게시글 스크랩 수
************************************/
apiRouter.post("/board/scrap", scrap);

/************************************
            게시글 조회수
************************************/
apiRouter.post("/board/views", views);

export default apiRouter;
