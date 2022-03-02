import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRecoilValue } from "recoil";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { corsUrl } from "../../recoil/atom";
import CommentLists from "./CommentLists";

const Comment = styled.article`
  width: 400px;
  text-align: center;
  background-color: ${(props) => props.theme.postColors.comment};
  padding: 20px;
  overflow-y: scroll;
`;

const FirstRow = styled.div`
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

const SecondRow = styled.div`
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
  const backendUrl = useRecoilValue(corsUrl);
  const [commentBox, setCommentBox] = useState<string>("");
  const [enrollComment, setEnrollComment] = useState<boolean>(false);

  async function commentSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await fetch(
      `${backendUrl}/menus/devs/post/${postId}/comment`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ commentBox }),
      }
    );

    if (response.status === 200) {
      setEnrollComment(true);
      const json = await response.json();
    }
  }

  function commentChange(event: React.FormEvent<HTMLInputElement>) {
    const {
      currentTarget: { value },
    } = event;

    setCommentBox(value);
  }

  return (
    <Comment>
      <FirstRow>
        <h1>댓글</h1>
        <form onSubmit={commentSubmit}>
          <input onChange={commentChange} placeholder="댓글 쓰기" />
          <button type="submit">
            <FontAwesomeIcon icon={faPencil} />
          </button>
        </form>
      </FirstRow>
      <SecondRow>
        <CommentLists postId={postId} />
      </SecondRow>
    </Comment>
  );
}

export default PostComment;
