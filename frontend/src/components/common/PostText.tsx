import {
  faEllipsisV,
  faEye,
  faHeart,
  faMessage,
  faPenToSquare,
  faScroll,
  faThumbsUp,
  faTrashCan,
  faUpRightAndDownLeftFromCenter,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { article, corsUrl, IArticle } from "../../recoil/atom";

const Container = styled.section`
  width: 700px;
  margin: 0 auto;
  background-color: ${(props) => props.theme.bgColors.lighter};
  padding: 20px;
  position: relative;
`;

const Options = styled.ul`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  margin: 10px;

  li {
    cursor: pointer;
    padding: 10px;
    border-radius: 10px;

    &:hover {
      background-color: #7f8c8d;
    }

    span {
      margin-left: 3px;
    }
  }
`;

const User = styled.article`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const Writer = styled.div`
  display: flex;
  align-items: center;

  .first-column {
    margin-right: 10px;

    img {
      width: 50px;
      height: 50px;
      border-radius: 10px;
    }
  }

  .second-column {
    .info {
      margin-bottom: 3px;

      .heart-icon {
        color: red;
        font-size: 13px;
        margin: 0 3px 0 5px;
      }
    }
  }
`;

const Content = styled.article`
  h1,
  p {
    user-select: text;
  }

  h1 {
    margin-bottom: 15px;
    font-size: 35px;
  }

  p {
    line-height: 30px;
    font-size: 18px;
  }
`;

const Image = styled.ul`
  li {
    margin-top: 20px;

    img {
      max-width: 100%;
    }
  }
`;

const Status = styled(motion.div)`
  display: flex;
  font-size: 20px;
  position: relative;
  bottom: 0;
  left: 0;
  margin-top: 20px;

  .icon {
    margin-right: 17px;

    span {
      margin-left: 5px;
    }
  }

  .like {
    color: #e74c3c;

    svg {
      cursor: pointer;

      &:hover {
        transform: scale(1.2);
      }
    }
  }

  .comment {
    color: #5f27cd;

    svg {
      transform: translateY(1px);
    }
  }

  .choice {
    color: #f1c40f;

    svg {
      cursor: pointer;

      &:hover {
        transform: scale(1.2);
      }
    }
  }

  .view {
    color: #2ecc71;
  }
`;

function PostText() {
  const backendUrl = useRecoilValue<string>(corsUrl);
  const post = useRecoilValue<IArticle>(article);
  const { search: queryString } = useLocation<string>();
  const history = useHistory();

  function showTime(created_at: string | undefined) {
    const writtenTime = created_at && new Date(created_at);

    const year = writtenTime?.toLocaleString("en-US", { year: "numeric" });
    const month = writtenTime
      ?.toLocaleString("en-US", { month: "numeric" })
      .padStart(2, "0");
    const day = writtenTime
      ?.toLocaleString("en-US", { day: "numeric" })
      .padStart(2, "0");

    const hour = writtenTime
      ?.toLocaleString("en-US", { hour: "numeric", hour12: false })
      .padStart(2, "0");
    const minute = writtenTime
      ?.toLocaleString("ko-KR", { minute: "numeric" })
      .padStart(2, "0");
    const second = writtenTime
      ?.toLocaleString("ko-KR", { second: "numeric" })
      .padStart(2, "0");

    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  }

  async function updateArticle() {
    history.push(`/board/update${queryString}`);
  }

  async function deleteArticle() {
    const response = await fetch(
      `${backendUrl}/menus/devs/post/${post?._id}/delete`,
      {
        method: "POST",
      }
    );

    if (response.status === 200) {
      window.location.replace("http://localhost:3000/devs");
    }
  }

  return (
    <Container>
      <Options>
        <li className="update" onClick={updateArticle}>
          <FontAwesomeIcon icon={faPenToSquare} />
          <span>수정</span>
        </li>
        <li className="delete" onClick={deleteArticle}>
          <FontAwesomeIcon icon={faTrashCan} />
          <span>삭제</span>
        </li>
      </Options>
      <User>
        <Writer>
          <div className="first-column">
            <img src={post.user?.image_url} />
          </div>
          <div className="second-column">
            <div className="info">
              <span>{post.user?.nickname}</span>
              <FontAwesomeIcon icon={faHeart} className="heart-icon" />
              <span>{post.user?.like}</span>
            </div>
            <div className="time">{showTime(post?.created_at)}</div>
          </div>
        </Writer>
      </User>
      <Content>
        <h1>{post.title}</h1>
        <p>{post.content}</p>
      </Content>
      <Image>
        {post.images?.map((element, idx) => (
          <li key={idx}>
            <img src={backendUrl + element} />
          </li>
        ))}
      </Image>
      <Status>
        <div className="icon like">
          <FontAwesomeIcon icon={faThumbsUp} />
          <span>{post.like}</span>
        </div>
        <div className="icon comment">
          <FontAwesomeIcon icon={faMessage} />
          <span>{post.comment?.length}</span>
        </div>
        <div className="icon choice">
          <FontAwesomeIcon icon={faScroll} />
          <span>{post.choice}</span>
        </div>
        <div className="icon view">
          <FontAwesomeIcon icon={faEye} />
          <span>{post.views}</span>
        </div>
      </Status>
    </Container>
  );
}

export default PostText;
