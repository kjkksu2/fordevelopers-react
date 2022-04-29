import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { article, corsUrl, IArticle } from "../../recoil/atom";
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

  .loading {
    width: 100%;
    display: block;
    text-align: center;
    font-size: 50px;
    color: white;
  }
`;

function Post() {
  const backendUrl = useRecoilValue(corsUrl);
  const setPost = useSetRecoilState<IArticle>(article);
  const { search: queryString } = useLocation<string>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const categoryRegex = /category=[a-z]+/g;
  const idRegex = /id=[0-9a-f]{24}/g;
  const category = queryString.match(categoryRegex)?.join("").split("=")[1];
  const id = queryString.match(idRegex)?.join("").split("=")[1];

  useEffect(() => {
    (async function () {
      const { article, category: resCategory } = await (
        await fetch(
          `${backendUrl}/play/board/article?category=${category}&id=${id}`
        )
      ).json();

      setIsLoading(false);
      setPost(() => ({ ...article, category: resCategory }));
    })();
  }, []);

  return (
    <Container>
      {isLoading ? (
        <span className="loading">Loading...</span>
      ) : (
        <>
          <PostText />
          <PostComment />
        </>
      )}
    </Container>
  );
}

export default Post;
