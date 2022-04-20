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
import { corsUrl } from "../../recoil/atom";

const Container = styled.section`
  position: relative;
  width: 500px;
  background-color: ${(props) => props.theme.postColors.content};
  padding: 20px;
  overflow-y: scroll;
`;

const User = styled.article`
  position: fixed;
  top: 100px;
  transform: translateX(-20px);
  border-top-left-radius: 10px;
  width: 500px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.theme.postColors.content};
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

const Options = styled.div`
  .expand {
    display: inline-block;
    cursor: pointer;
    padding: 5px 10px;
    transition: 0.3s ease;
    border-radius: 5px;

    .expand-icon {
      font-size: 13px;
      margin-right: 8px;
      transform: translateY(-2px);
    }

    &:hover {
      background-color: rgba(189, 195, 199, 0.5);
    }
  }
`;

const Content = styled.article`
  padding-top: 85px;

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
    font-size: 18px;
  }
`;

const RestOptions = styled(motion.div)`
  position: fixed;
  top: 100px;
  transform: translate(-80px, 20px);
  display: flex;
  flex-direction: column;
  font-size: 30px;
  z-index: -1;

  .icon {
    background-color: #f5f6fa;
    padding: 7px 100px 7px 15px;
    border-radius: 30px;
    cursor: pointer;

    span {
      margin-left: 20px;
    }
  }

  .ellipsis-icon {
    color: white;
    margin-bottom: 50px;
    transform: translateX(40px);
    display: flex;
    cursor: pointer;
  }

  .like-icon {
    color: #e74c3c;
    padding: 5px 100px 7px 17px;
    margin-bottom: 20px;
  }
  .comment-icon {
    color: #9c88ff;
    padding: 5px 100px 7px 17px;
    margin-bottom: 20px;
  }
  .choice-icon {
    color: #f1c40f;
    margin-bottom: 20px;
  }
  .view-icon {
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

interface IPostText {
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

function PostText({ post }: IPostText) {
  const backendUrl = useRecoilValue(corsUrl);
  const [ellipsis, setEllipsis] = useState<boolean>(false);

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

  function ellipsisClicked() {
    setEllipsis((prev) => !prev);
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
        <Options>
          <div className="expand">
            <FontAwesomeIcon
              icon={faUpRightAndDownLeftFromCenter}
              className="expand-icon"
            />
            <span>크게</span>
          </div>
        </Options>
      </User>
      <Content>
        <h1>{post?.title}</h1>
        <p>{post?.content}</p>
      </Content>
      <RestOptions>
        <motion.div className="ellipsis-icon" onClick={ellipsisClicked}>
          <FontAwesomeIcon icon={faEllipsisV} />
        </motion.div>
        <motion.div whileHover={{ x: -50 }} className="like-icon icon">
          <FontAwesomeIcon icon={faThumbsUp} />
          <span>{post?.like}</span>
        </motion.div>
        <motion.div whileHover={{ x: -50 }} className="comment-icon icon">
          <FontAwesomeIcon icon={faMessage} />
          <span>{post?.comment.length}</span>
        </motion.div>
        <motion.div whileHover={{ x: -50 }} className="choice-icon icon">
          <FontAwesomeIcon icon={faScroll} />
          <span>{post?.choice}</span>
        </motion.div>
        <motion.div whileHover={{ x: -50 }} className="view-icon icon">
          <FontAwesomeIcon icon={faEye} />
          <span>{post?.views}</span>
        </motion.div>
      </RestOptions>
      <AnimatePresence>
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
      </AnimatePresence>
    </Container>
  );
}

export default PostText;
