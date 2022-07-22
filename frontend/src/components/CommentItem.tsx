import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { memo } from "react";
import styled from "styled-components";
import { IComment } from "../recoil/article";
import WrittenTime from "./WrittenTime";

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

interface ICommentItem {
  item: IComment;
}

const CommentItem = ({ item }: ICommentItem) => {
  return (
    <Item>
      <div className="first-column">
        <img src={item.user.image_url} alt="comment" />
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
  );
};

export default memo(CommentItem);
