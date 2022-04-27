import Dev from "../models/Dev";
import Comment from "../models/Comment";

/************************************
        전체 게시물 불러오기
 ************************************/
export const board = async (req, res) => {
  try {
    const {
      body: { articlesPerPage },
      query: { category, page: currentPage },
    } = req;

    let articleLists = null;
    let numberOfArticles = null;

    if (category === "dev") {
      articleLists = await Dev.find()
        .populate("user")
        .sort({ _id: -1 })
        .skip((Number(currentPage) - 1) * articlesPerPage)
        .limit(articlesPerPage);

      numberOfArticles = await Dev.count();
    }

    return res.status(200).json({ articleLists, numberOfArticles });
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

/************************************
              검색하기
************************************/
export const search = async (req, res) => {
  try {
    const {
      query: { keyword, category, page: currentPage },
      body: { articlesPerPage },
    } = req;

    const regex = new RegExp(keyword, "i");
    let articleLists = null;
    let numberOfArticles = null;

    if (category === "dev") {
      articleLists = await Dev.find({
        $or: [{ title: regex }, { content: regex }],
      })
        .populate("user")
        .sort({ _id: -1 })
        .skip((Number(currentPage) - 1) * articlesPerPage)
        .limit(articlesPerPage);

      numberOfArticles = await Dev.count({
        $or: [{ title: regex }, { content: regex }],
      });
    }

    return res.status(200).json({ articleLists, numberOfArticles });
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

/************************************
               글쓰기
 ************************************/
export const write = async (req, res) => {
  try {
    const {
      body: { title, content },
      query: { category },
    } = req;

    let article = null;
    if (category === "dev") {
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
             게시물 수정
 ************************************/
export const updatePost = async (req, res) => {
  try {
    const {
      params: { postId },
    } = req;

    await Dev.findByIdAndUpdate(postId);
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

/************************************
             게시물 삭제
 ************************************/
export const deletePost = async (req, res) => {
  try {
    const {
      params: { postId },
    } = req;

    await Dev.findByIdAndDelete(postId);
    return res.sendStatus(200);
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
