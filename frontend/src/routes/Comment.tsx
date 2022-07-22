import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TextareaAutosize from "react-textarea-autosize";
import { useRecoilState, useRecoilValue } from "recoil";
import { article, IArticle } from "../recoil/article";
import { corsUrl } from "../recoil/common";
import CommentItem from "../components/CommentItem";

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

const Comment = () => {
  const backendUrl = useRecoilValue(corsUrl);
  const [input, setInput] = useState<string>("");
  const [{ _id, category }, setPost] = useRecoilState<IArticle>(article);

  const { comment: lists } = useRecoilValue<IArticle>(article);
  const [commentExist, setCommentExist] = useState<boolean>(false);

  useEffect(() => {
    lists?.length > 0 ? setCommentExist(true) : setCommentExist(false);
  }, [lists]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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
  };

  const onChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
    const {
      currentTarget: { value },
    } = event;

    setInput(value);
  };

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
          <CommentItem key={idx} item={item} />
        ))}
      </List>
    </Container>
  );
};

export default Comment;
