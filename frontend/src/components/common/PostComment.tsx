import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import styled from "styled-components";
import { useMutation } from "react-query";
import TextareaAutosize from "react-textarea-autosize";
import CommentLists from "./CommentLists";
import { comment } from "../../reactQuery/common";
import { useRecoilValue } from "recoil";
import { article, IArticle } from "../../recoil/atom";

const Container = styled.section`
  padding: 20px;
`;

const Input = styled.article`
  form {
    padding: 20px;
    width: 100%;
    background-color: ${(props) => props.theme.postColors.comment};
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
  // const mutation = useMutation(comment);
  const { comment } = useRecoilValue<IArticle>(article);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // const response = await mutation.mutateAsync({ postId, input });

    // if (response.status === 200) {
    //   const json = await response.json();
    //   setFakeComment((prev) => (prev = json));
    //   setInput("");
    // }
  }

  function onChange(event: React.FormEvent<HTMLTextAreaElement>) {
    const {
      currentTarget: { value },
    } = event;

    setInput(value);
  }

  return (
    <Container>
      {/* <Content>
        <CommentLists postId={postId} fakeComment={fakeComment} />
      </Content> */}
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
