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
import { useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { article, corsUrl } from "../../recoil/atom";

const Container = styled.section`
  width: 700px;
  margin: 0 auto;
  background-color: ${(props) => props.theme.bgColors.lighter};
  padding: 20px;
  border-radius: 15px;
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

const Options = styled(motion.div)`
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

const EllipsisBox = styled(motion.div)`
  position: fixed;
  top: 100px;
  display: flex;
  background-color: white;
  padding: 10px;
  border-radius: 10px;

  .common {
    cursor: pointer;
    padding: 5px 10px;
    border-radius: 5px;

    span {
      margin-left: 10px;
    }

    &:hover {
      background-color: #e3e7e6;
    }
  }
`;

function PostText() {
  const backendUrl = useRecoilValue(corsUrl);
  const post = useRecoilValue(article);

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

  async function updatePost() {
    const response = await fetch(
      `${backendUrl}/menus/devs/post/${post?._id}/update`,
      {
        method: "POST",
      }
    );

    if (response.status === 200) {
      window.location.replace(`http://localhost:3000/devs/${post?._id}`);
    }
  }

  async function deletePost() {
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
      <User>
        <Writer>
          <div className="first-column">
            <img src={post?.user.image_url} />
          </div>
          <div className="second-column">
            <div className="info">
              <span>{post?.user.nickname}</span>
              <FontAwesomeIcon icon={faHeart} className="heart-icon" />
              <span>{post?.user.like}</span>
            </div>
            <div className="time">{showTime(post?.created_at)}</div>
          </div>
        </Writer>
      </User>
      <Content>
        <h1>{post.title}</h1>
        <p>{post.content}</p>
      </Content>
      <Options>
        <div className="icon like">
          <FontAwesomeIcon icon={faThumbsUp} />
          <span>{post.like}</span>
        </div>
        <div className="icon comment">
          <FontAwesomeIcon icon={faMessage} />
          <span>{post.comment.length}</span>
        </div>
        <div className="icon choice">
          <FontAwesomeIcon icon={faScroll} />
          <span>{post.choice}</span>
        </div>
        <div className="icon view">
          <FontAwesomeIcon icon={faEye} />
          <span>{post.views}</span>
        </div>
      </Options>
      {/* <AnimatePresence>
        {ellipsis ? (
          <EllipsisBox
            initial={{ scale: 1.1, opacity: 0, x: -230, y: 10 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.1, opacity: 0 }}
            transition={{
              duration: 0.3,
            }}
          >
            <div className="common">
              <FontAwesomeIcon icon={faPenToSquare} />
              <span onClick={() => updatePost()}>수정</span>
            </div>
            <div className="common">
              <FontAwesomeIcon icon={faTrashCan} />
              <span onClick={() => deletePost()}>삭제</span>
            </div>
          </EllipsisBox>
        ) : null}
      </AnimatePresence> */}
    </Container>
  );
}

export default PostText;
