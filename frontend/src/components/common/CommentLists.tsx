import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { article, corsUrl, IArticle, IComment, IUser } from "../../recoil/atom";
import WrittenTime from "./WrittenTime";

const Container = styled.ul`
  margin-top: 15px;
  background-color: ${(props) => props.theme.bgColors.lighter};
  padding: 15px;
`;

const Comment = styled.li`
  display: flex;
  margin-top: 5px;

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
      margin-bottom: 3px;
    }

    .content {
      text-align: start;
      background-color: ${(props) => props.theme.commentColors.opponent};
      color: ${(props) => props.theme.commentColors.me};
      border-radius: 10px;
      padding: 10px;
      margin-bottom: 3px;
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

function CommentLists() {
  const backendUrl = useRecoilValue(corsUrl);
  const { comment: lists } = useRecoilValue<IArticle>(article);

  return (
    <Container>
      {lists?.map((item, idx) => (
        <Comment key={idx}>
          <div className="first-column">
            <img src={item.user.image_url} />
          </div>
          <div className="second-column">
            <span className="nickname">{item.user.nickname}</span>
            <pre className="content">{item.content}</pre>
            <span className="time">
              <WrittenTime created_at={item.created_at} />
            </span>
          </div>
        </Comment>
      ))}
    </Container>
  );
}

export default CommentLists;
