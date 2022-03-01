import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";

const Comment = styled.article`
  width: 400px;
  text-align: center;
  background-color: ${(props) => props.theme.postColors.comment};
  padding: 20px;

  input {
    padding: 5px;
    font-size: 17px;
  }
`;

const FirstRow = styled.div`
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
    }
  }
`;

const SecondRow = styled.div``;

function PostComment() {
  function commentSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log("hi");
  }

  return (
    <Comment>
      <FirstRow>
        <h1>댓글</h1>
        <form onSubmit={commentSubmit}>
          <input type="text" placeholder="댓글 쓰기" />
          <button type="submit">
            <FontAwesomeIcon icon={faPencil} />
          </button>
        </form>
      </FirstRow>
      <SecondRow></SecondRow>
    </Comment>
  );
}

export default PostComment;
