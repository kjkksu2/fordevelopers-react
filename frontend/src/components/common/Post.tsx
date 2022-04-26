import { motion } from "framer-motion";
import styled from "styled-components";
import PostComment from "./PostComment";
import PostText from "./PostText";

const Container = styled(motion.main)`
  top: 100px;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  display: flex;
  border-radius: 10px;
  overflow: hidden;
`;

interface IPost {
  post?: {
    _id: string;
    title: string;
    content: string;
    like: number;
    choice: number;
    views: number;
    created_at: string;
    user: {
      nickname: string;
      image_url: string;
      like: number;
    };
    comment: [];
  };
}

function Post({ post }: IPost) {
  return (
    <Container
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <PostText post={post} />
      <PostComment postId={post?._id} />
    </Container>
  );
}

export default Post;
