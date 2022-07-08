import {
  faPaperPlane,
  faPenToSquare,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TextareaAutosize from "react-textarea-autosize";
import { useRecoilState, useRecoilValue } from "recoil";
import { article, IArticle } from "../recoil/article";
import WrittenTime from "../components/common/WrittenTime";
import { corsUrl } from "../recoil/common";

const Container = styled.section`
  width: 700px;
  margin: 0 auto;
  border-radius: 15px;
`;

const Write = styled.form`
  width: 100%;
  display: flex;
  position: relative;

  textarea {
    width: 100%;
    resize: none;
    outline: none;
    padding: 10px;
    padding-right: 50px;
    font-size: 15px;
  }

  button {
    height: 100%;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    padding: 0 10px;
    font-size: 20px;
    border: none;
    cursor: pointer;
    outline: none;
    background-color: ${(props) => props.theme.bgColors.darker};
    color: white;
  }
`;

const List = styled.ul<{ commentExist: boolean }>`
  display: ${(props) => (props.commentExist ? "visible" : "none")};
  margin-top: 15px;
  background-color: ${(props) => props.theme.bgColors.lighter};
  padding: 15px;
`;

const Item = styled.li`
  display: flex;
  margin-top: 15px;
  position: relative;

  .first-column {
    margin-right: 5px;

    img {
      width: 35px;
      height: 35px;
      border-radius: 5px;
      margin-bottom: 3px;
    }
  }

  .second-column {
    display: flex;
    flex-direction: column;
    width: 100%;

    .nickname {
      text-align: start;
      font-size: 14px;
      font-weight: 700;
      color: rgba(0, 0, 0, 0.5);
      margin-bottom: 7px;
    }

    .content {
      text-align: start;
      background-color: ${(props) => props.theme.commentColors.opponent};
      color: ${(props) => props.theme.commentColors.me};
      border-radius: 10px;
      padding: 10px;
      margin-bottom: 7px;
      user-select: text;
      line-height: 25px;
      font-size: 15px;
      white-space: pre-wrap;
    }

    .time {
      text-align: end;
      font-size: 14px;
    }
  }
`;

const Options = styled.ul`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  font-size: 12px;

  li {
    cursor: pointer;
    margin-left: 5px;
    padding: 2px;
    border-radius: 5px;

    &:hover {
      background-color: #7f8c8d;
    }

    span {
      margin-left: 3px;
    }
  }
`;

function Comment() {
  const backendUrl = useRecoilValue(corsUrl);
  const [input, setInput] = useState<string>("");
  const [{ _id, category }, setPost] = useRecoilState<IArticle>(article);

  const { comment: lists } = useRecoilValue<IArticle>(article);
  const [commentExist, setCommentExist] = useState<boolean>(false);

  useEffect(() => {
    lists?.length > 0 ? setCommentExist(true) : setCommentExist(false);
  }, [lists]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await (
      await fetch(
        `${backendUrl}/play/board/comment/write?category=${category}&id=${_id}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ input }),
        }
      )
    ).json();

    setPost((prev) => ({
      ...prev,
      comment: [response, ...prev.comment],
    }));
    setInput("");
  }

  function onChange(event: React.FormEvent<HTMLTextAreaElement>) {
    const {
      currentTarget: { value },
    } = event;

    setInput(value);
  }

  return (
    <Container>
      <Write onSubmit={onSubmit}>
        <TextareaAutosize
          onChange={onChange}
          placeholder="댓글 쓰기"
          value={input}
          spellCheck={false}
          autoFocus
        />
        <button type="submit">
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </Write>
      <List commentExist={commentExist}>
        {lists?.map((item, idx) => (
          <Item key={idx}>
            <div className="first-column">
              <img src={item.user.image_url} />
            </div>
            <div className="second-column">
              <span className="nickname">{item.user.nickname}</span>
              <pre className="content">{item.content}</pre>
              <span className="time">
                <WrittenTime created_at={item.created_at} />
              </span>
              <Options>
                <li className="update">
                  <FontAwesomeIcon icon={faPenToSquare} />
                  <span>수정</span>
                </li>
                <li className="delete">
                  <FontAwesomeIcon icon={faTrashCan} />
                  <span>삭제</span>
                </li>
              </Options>
            </div>
          </Item>
        ))}
      </List>
    </Container>
  );
}

export default Comment;
