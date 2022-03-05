import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import styled from "styled-components";
import { useMutation } from "react-query";
import TextareaAutosize from "react-textarea-autosize";
import CommentLists from "./CommentLists";
import { comment } from "../../reactQuery/common";

const Container = styled.section`
  width: 400px;
  text-align: center;
  background-color: ${(props) => props.theme.postColors.comment};
  padding: 20px;
  overflow-y: scroll;
`;

const Input = styled.article`
  position: fixed;
  top: 700px;
  transform: translateX(-20px);

  form {
    position: absolute;
    bottom: 0;
    width: 400px;
    padding: 20px;
    background-color: ${(props) => props.theme.postColors.comment};
    border-bottom-right-radius: 10px;
    display: flex;

    textarea {
      border: 1px solid rgba(0, 0, 0, 0.5);
      background-color: transparent;
      width: 100%;
      resize: none;
      max-height: 70px;
      border-radius: 5px;
      outline: none;
      padding: 10px;
      padding-right: 30px;
      font-size: 15px;
    }

    button {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 27px;
      font-size: 20px;
      background-color: transparent;
      border: none;
      cursor: pointer;
      outline: none;
    }
  }
`;

const Content = styled.article``;

interface IPostComment {
  postId?: string;
}

interface IFakeComment {
  content: string;
  created_at: string;
  user: {
    nickname: string;
    image_url: string;
  };
}

function PostComment({ postId }: IPostComment) {
  const [input, setInput] = useState<string>("");
  const [fakeComment, setFakeComment] = useState<IFakeComment>();
  const mutation = useMutation(comment);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await mutation.mutateAsync({ postId, input });

    if (response.status === 200) {
      const json = await response.json();
      setFakeComment((prev) => (prev = json));
      setInput("");
    }
  }

  function onChange(event: React.FormEvent<HTMLTextAreaElement>) {
    const {
      currentTarget: { value },
    } = event;

    setInput(value);
  }

  return (
    <Container>
      <Content>
        <CommentLists postId={postId} fakeComment={fakeComment} />
      </Content>
      <Input>
        <form onSubmit={onSubmit}>
          <TextareaAutosize
            onChange={onChange}
            placeholder="댓글 쓰기"
            value={input}
            spellCheck={false}
            autoFocus
          />
          <button type="submit">
            <FontAwesomeIcon icon={faPencil} />
          </button>
        </form>
      </Input>
    </Container>
  );
}

export default PostComment;
