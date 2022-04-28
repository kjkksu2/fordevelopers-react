import { motion } from "framer-motion";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import PostComment from "./PostComment";
import PostText from "./PostText";

const Container = styled.main`
  padding: 150px 0;
  width: 100%;
  min-height: 100vh;
  background-color: ${(props) => props.theme.bgColors.main};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function Post() {
  return (
    <Container>
      <PostText />
      <PostComment />
    </Container>
  );
}

export default Post;
