import { motion } from "framer-motion";
import styled from "styled-components";

const Container = styled(motion.section)`
  position: fixed;
  top: 200px;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 900px;
  height: 400px;
  padding: 20px;
  background-color: tomato;
  display: flex;
`;

const Text = styled.article`
  width: 500px;
  overflow: scroll;
`;

const FirstRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Writer = styled.div`
  margin-bottom: 20px;

  img {
    width: 50px;
    height: 50px;
  }
`;

const Options = styled.div`
  span {
    margin-left: 10px;
  }
`;

const SecondRow = styled.div`
  h1,
  p {
    user-select: text;
  }

  h1 {
    margin-bottom: 20px;
    font-size: 30px;
  }

  p {
    line-height: 30px;
  }
`;

const Comment = styled.article`
  width: 400px;
  text-align: center;

  input {
    padding: 5px;
    font-size: 17px;
  }
`;

interface IPost {
  layoutId?: string;
  post?: {
    _id: string;
    title: string;
    content: string;
    choice: number;
    user: {
      nickname: string;
      image_url: string;
    };
  };
}

function Post({ layoutId, post }: IPost) {
  return (
    <Container layoutId={layoutId}>
      <Text>
        <FirstRow>
          <Writer>
            <img src={post?.user.image_url} />
            <span>{post?.user.nickname}</span>
          </Writer>
          <Options>
            <span>좋아요</span>
            <span>댓글 수</span>
            <span>찜</span>
            <span>조회수</span>
            <span>확대</span>
          </Options>
        </FirstRow>
        <SecondRow>
          <h1>{post?.title}</h1>
          <p>{post?.content}</p>
        </SecondRow>
      </Text>
      <Comment>
        <h1>댓글</h1>
        <input placeholder="댓글을 작성해주세요." />
      </Comment>
    </Container>
  );
}

export default Post;
