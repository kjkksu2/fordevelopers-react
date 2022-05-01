import Dev from "../models/Dev";
import Comment from "../models/Comment";
import User from "../models/User";

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
      files: { imageFile },
    } = req;

    let article = null;
    if (category === "dev") {
      article = await Dev.create({
        title,
        content,
        user: req.session.user,
      });

      imageFile?.forEach((file) => article.images.push(`/${file.path}`));
      await article.save();
    }

    return res.redirect(
      `http://localhost:3000/board?category=${category}&page=1`
    );
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

/************************************
            게시물 불러오기
 ************************************/
export const article = async (req, res) => {
  try {
    const {
      query: { category, id },
    } = req;

    let article = null;
    if (category === "dev") {
      article = await Dev.findById(id).populate([
        "user",
        {
          path: "comment",
          options: { sort: { _id: -1 } },
          populate: { path: "user" },
        },
      ]);
    }

    return res.status(200).json({ category, article });
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

/************************************
             게시물 수정
 ************************************/
export const update = async (req, res) => {
  try {
    const {
      body: { title, content },
      query: { category, id },
      files: { imageFile },
    } = req;

    let article = null;
    if (category === "dev") {
      article = await Dev.findByIdAndUpdate(id, {
        title,
        content,
      });

      imageFile?.forEach((file) => article.images.push(`/${file.path}`));
      await article.save();
    }

    return res.redirect(
      `http://localhost:3000/board/article?category=${category}&id=${id}`
    );
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

/************************************
             게시물 삭제
 ************************************/
export const remove = async (req, res) => {
  try {
    const {
      query: { category, id },
    } = req;

    if (category === "dev") {
      await Dev.findByIdAndDelete(id);
    }
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

/************************************
            댓글 등록하기
 ************************************/
export const writeComment = async (req, res) => {
  try {
    const {
      query: { id: articleId, category },
      body: { input },
      session: {
        user: { _id },
      },
    } = req;

    const comment = await Comment.create({
      content: input,
      post_kinds: category,
      post_id: articleId,
      user: _id,
    });
    await comment.populate("user");

    let article = null;
    if (category === "dev") {
      article = await Dev.findById(articleId);
    }
    article.comment.push(comment);
    await article.save();

    const user = await User.findById(_id);
    user.comment.push(comment);
    await user.save();

    return res.status(200).json(comment);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

/************************************
          댓글 전부 가져오기
 ************************************/
export const comment = async (req, res) => {
  try {
    const {
      query: { category, id },
    } = req;

    let commentLists = null;
    if (category === "dev") {
      commentLists = await Dev.findById(id).populate("comment");
    }

    return res.status(200).json(commentLists);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
