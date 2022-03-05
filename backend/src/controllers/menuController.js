import Dev from "../models/Dev";
import Comment from "../models/Comment";

/************************************
            게시물 등록하기
 ************************************/
export const enrollment = async (req, res) => {
  try {
    const {
      body: { title, content },
      params: { categories },
    } = req;

    console.log("hi");

    let article = null;
    if (categories === "devs") {
      article = await Dev.create({
        title,
        content,
        user: req.session.user,
      });
    }

    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

/************************************
         게시물 전부 가져오기
 ************************************/
export const board = async (req, res) => {
  try {
    const {
      params: { categories },
    } = req;

    let articleLists = null;
    if (categories === "devs") {
      articleLists = await Dev.find().populate("user").sort({ _id: -1 });
    }

    return res.status(200).json(articleLists);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

/************************************
            댓글 등록하기
 ************************************/
export const comment = async (req, res) => {
  try {
    const {
      body: { input: content },
      params: { categories, postId },
      session: {
        user: { _id },
      },
    } = req;

    let comment = null;
    if (categories === "devs") {
      comment = await Comment.create({
        content,
        post_kinds: categories,
        post_id: postId,
        user: _id,
      });
    }

    await comment.populate("user", ["nickname", "image_url"]);
    return res.status(200).json(comment);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

/************************************
          댓글 전부 가져오기
 ************************************/
export const commentLists = async (req, res) => {
  try {
    const {
      params: { categories, postId },
    } = req;

    let commentLists = null;
    if (categories === "devs") {
      commentLists = await Comment.find({ post_id: postId }).populate("user", [
        "nickname",
        "image_url",
      ]);
    }

    return res.status(200).json(commentLists);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
