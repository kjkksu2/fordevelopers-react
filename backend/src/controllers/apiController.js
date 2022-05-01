import Dev from "../models/Dev";
import User from "../models/User";

/************************************
      게시물 수정에서 이미지 삭제
 ************************************/
export const deleteImage = async (req, res) => {
  try {
    const {
      query: { category, id },
      body: { erasedImage },
    } = req;

    if (category === "dev") {
      let post = await Dev.findById(id);

      erasedImage.forEach((element) => {
        post.images = post.images.filter(
          (image) => image.split("images\\")[1] !== element
        );
      });
      await post.save();
    }

    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
/************************************
          게시글 좋아요 수
************************************/
export const like = async (req, res) => {
  try {
    const {
      query: { category, id },
      session: {
        user: { _id },
      },
    } = req;

    let post = null;
    if (category === "dev") {
      post = await Dev.findById(id);
    }

    const userId = post.like_clicked_user.find((element) =>
      String(element).includes(_id)
    );

    if (!userId) {
      post.like_clicked_user.push(_id);
      post.like += 1;
      await post.save();
      return res.sendStatus(200);
    }

    return res.sendStatus(400);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

/************************************
          게시글 스크랩 수
************************************/
export const scrap = async (req, res) => {
  try {
    const {
      query: { category, id },
      session: {
        user: { _id },
      },
    } = req;

    let post = null;
    if (category === "dev") {
      post = await Dev.findById(id);
    }

    const userId = post.scrap_clicked_user.find((element) =>
      String(element).includes(_id)
    );

    if (!userId) {
      post.scrap_clicked_user.push(_id);
      post.scrap += 1;
      await post.save();
      return res.sendStatus(200);
    }

    return res.sendStatus(400);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

/************************************
            게시글 조회수
************************************/
export const views = async (req, res) => {
  try {
    const {
      query: { category, id },
    } = req;

    if (category === "dev") {
      const post = await Dev.findById(id);
      post.views += 1;
      await post.save();
    }

    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
