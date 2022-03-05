import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRecoilValue } from "recoil";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { corsUrl } from "../../recoil/atom";
import CommentLists from "./CommentLists";
import { useMutation } from "react-query";
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
  top: 100px;
  transform: translateX(-20px);
  border-top-right-radius: 10px;
  width: 400px;
  padding: 20px;
  background-color: ${(props) => props.theme.postColors.comment};

  h1 {
    font-size: 25px;
    margin-bottom: 20px;
  }

  form {
    position: relative;

    input {
      border: 1px solid rgba(0, 0, 0, 0.5);
      background-color: transparent;
      outline: none;
      width: 100%;
      padding-right: 35px;
      resize: none;
      padding: 5px;
      font-size: 17px;
    }

    button {
      position: absolute;
      height: 100%;
      top: 0;
      right: 7px;
      font-size: 20px;
      background-color: transparent;
      border: none;
      cursor: pointer;
      outline: none;
    }
  }
`;

const Content = styled.article`
  padding-top: 100px;
`;

interface IPostComment {
  postId?: string;
}

interface IUser {
  nickname: string;
  image_url: string;
}

interface IComment {
  content: string;
  created_at: string;
  user: IUser[];
}

function PostComment({ postId }: IPostComment) {
  const [input, setInput] = useState<string>("");
  const mutation = useMutation(comment);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await mutation.mutateAsync({ postId, input });

    if (response.status === 200) {
      const json = await response.json();
      console.log(json);
      setInput("");
    }
  }

  function onInput(event: React.FormEvent<HTMLInputElement>) {
    const {
      currentTarget: { value },
    } = event;

    setInput(value);
  }

  return (
    <Container>
      <Input>
        <h1>댓글</h1>
        <form onSubmit={onSubmit}>
          <input onInput={onInput} placeholder="댓글 쓰기" />
          <button type="submit">
            <FontAwesomeIcon icon={faPencil} />
          </button>
        </form>
      </Input>
      <Content>
        <CommentLists postId={postId} />
      </Content>
    </Container>
  );
}

export default PostComment;
