import Dev from "../models/Dev";

/************************************
            게시물 등록하기
 ************************************/
export const enrollment = async (req, res) => {
  try {
    const {
      body: { title, content },
      params: { categories },
    } = req;

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
