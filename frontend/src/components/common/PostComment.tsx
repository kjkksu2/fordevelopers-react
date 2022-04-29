import { faPaperPlane, faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useMutation } from "react-query";
import TextareaAutosize from "react-textarea-autosize";
import CommentLists from "./CommentLists";
import { comment } from "../../reactQuery/common";
import { useRecoilState, useRecoilValue } from "recoil";
import { article, corsUrl, IArticle, IComment } from "../../recoil/atom";
import { useLocation } from "react-router-dom";

const Container = styled.section`
  width: 700px;
  margin: 0 auto;
  border-radius: 15px;
`;

const Form = styled.form`
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

const Content = styled.article``;

function PostComment() {
  const backendUrl = useRecoilValue(corsUrl);
  const [input, setInput] = useState<string>("");
  const [fakeComment, setFakeComment] = useState<IComment>();
  const { _id, category, comment } = useRecoilValue<IArticle>(article);

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

    setFakeComment(response);
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
      <Form onSubmit={onSubmit}>
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
      </Form>
      <Content>
        <CommentLists fakeComment={fakeComment} />
      </Content>
    </Container>
  );
}

export default PostComment;
