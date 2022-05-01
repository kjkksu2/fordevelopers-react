import express from "express";
import { deleteImage } from "../controllers/apiController";

const apiRouter = express.Router();

/************************************
      게시물 수정에서 이미지 삭제
************************************/
apiRouter.post("/board/image/delete", deleteImage);

export default apiRouter;
