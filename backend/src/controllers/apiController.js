import Dev from "../models/Dev";

/************************************
      게시물 수정에서 이미지 삭제
 ************************************/
export const deleteImage = async (req, res) => {
  try {
    const {
      query: { category, id },
      body: { existingImage },
    } = req;

    if (category === "dev") {
      let post = await Dev.findById(id);

      existingImage.forEach((element) => {
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
