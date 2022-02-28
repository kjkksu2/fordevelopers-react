import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { corsUrl } from "../../recoil/atom";
import Post from "./Post";

const Container = styled.ul`
  width: 100%;

  li {
    margin: 0 200px;
    margin-bottom: 10px;
    display: flex;
    cursor: pointer;
  }
`;

const Writer = styled.div`
  flex: 1;
  background-color: #f5f5f5;
  /* background-color: teal; */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px 0;

  img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    margin-bottom: 15px;
  }

  div {
    display: flex;
    flex-direction: column;
    align-items: center;

    span {
      display: inline-block;
      font-size: 15px;
      font-weight: 700;

      &:first-child {
        border-top: 1px solid black;
        padding: 15px 0;
      }
    }
  }
`;

const Content = styled.div`
  flex: 2;
  background-color: green;
  padding: 10px 20px 20px 20px;

  h1 {
    margin-bottom: 10px;
  }

  p {
    font-size: 18px;
    line-height: 25px;
  }
`;

const Info = styled.div`
  flex: 1;
  background-color: tomato;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: black;
`;

interface IArticleLists {
  _id: string;
  title: string;
  content: string;
  choice: number;
  user: {
    nickname: string;
    image_url: string;
    department: string;
    goToSchool: string;
  };
  created_at: string;
}

function Board() {
  const backendUrl = useRecoilValue(corsUrl);
  const [articleLists, setArticleLists] = useState<IArticleLists[]>([]);
  const history = useHistory();
  const postMatch = useRouteMatch<{ id: string }>("/devs/:id([0-9a-f]{24})");

  function calculateTime(created_at: string) {
    const time = new Date(created_at);

    const year = time.toLocaleString("en-US", { year: "numeric" });
    const month = time
      .toLocaleString("en-US", { month: "numeric" })
      .padStart(2, "0");
    const day = time
      .toLocaleString("en-US", { day: "numeric" })
      .padStart(2, "0");

    const hour = time

      .toLocaleString("en-US", { hour: "numeric", hour12: false })
      .padStart(2, "0");
    const minute = time
      .toLocaleString("ko-KR", { minute: "numeric" })
      .padStart(2, "0");
    const second = time
      .toLocaleString("ko-KR", { second: "numeric" })
      .padStart(2, "0");

    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  }

  function articleClicked(id: string) {
    history.push(`/devs/${id}`);
  }

  function overlayClicked() {
    history.push("/devs");
  }

  useEffect(() => {
    async function fetcher() {
      const response = await fetch(`${backendUrl}/menus/devs/board`, {
        credentials: "include",
      });

      if (response.status === 200) {
        const json = await response.json();
        setArticleLists(json);
      }
    }

    fetcher();
  }, []);

  return (
    <Container>
      {articleLists.map((item, idx) => (
        <motion.li
          key={idx}
          whileHover={{ x: 20 }}
          onClick={() => articleClicked(item._id)}
          layoutId={item._id}
        >
          <Writer>
            <img src={item.user.image_url} />
            <div>
              <span>
                {item.user.nickname}({item.user.goToSchool})
              </span>
              <span>{item.user.department}</span>
            </div>
          </Writer>
          <Content>
            <h1>{item.title}</h1>
            <p>
              {item.content.length < 106
                ? item.content
                : item.content.slice(0, 106) + "..."}
            </p>
          </Content>
          <Info>
            <span>찜: {item.choice}</span>
            <span>{calculateTime(item.created_at)}</span>
          </Info>
        </motion.li>
      ))}
      <AnimatePresence>
        {postMatch && (
          <>
            <Overlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={overlayClicked}
            />
            <Post
              layoutId={postMatch?.params.id}
              post={articleLists.find(
                (item) => item._id === postMatch?.params.id
              )}
            />
          </>
        )}
      </AnimatePresence>
    </Container>
  );
}

export default Board;
