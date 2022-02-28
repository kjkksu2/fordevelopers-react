import express from "express";
import { board, enrollment } from "../controllers/menuController";

const menuRouter = express.Router();

/************************************
            게시물 등록하기
 ************************************/
menuRouter.post("/:categories(devs|communities)/enrollment", enrollment);

/************************************
         게시물 전부 가져오기
 ************************************/
menuRouter.get("/:categories(devs|communities)/board", board);

export default menuRouter;
