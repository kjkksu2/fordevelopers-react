import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { corsUrl } from "../../recoil/atom";

const Container = styled.ul`
  margin-top: 15px;
  margin-bottom: 75px;
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
    }

    .time {
      text-align: end;
      font-size: 14px;
    }
  }
`;

interface ICommentLists {
  postId?: string;
  fakeComment?: IList;
}

interface IList {
  content: string;
  created_at: string;
  user: {
    nickname: string;
    image_url: string;
  };
}

function CommentLists({ postId, fakeComment }: ICommentLists) {
  const backendUrl = useRecoilValue(corsUrl);
  const [lists, setLists] = useState<IList[]>([]);
  const [time, setTime] = useState("");

  useEffect(() => {
    async function fetcher() {
      const response = await fetch(
        `${backendUrl}/menus/devs/post/${postId}/commentLists`,
        {
          credentials: "include",
        }
      );

      if (response.status === 200) {
        const json = await response.json();
        setLists((lists) => (lists = json));
      }
    }

    fetcher();
  }, [postId, fakeComment]);

  function dateTime(created_at: string) {
    const writtenTime = new Date(created_at);

    const year = writtenTime.toLocaleString("ko-KR", { year: "numeric" });
    const month = writtenTime
      .toLocaleString("ko-KR", { month: "numeric" })
      .padStart(2, "0");
    const day = writtenTime
      .toLocaleString("ko-KR", { day: "numeric" })
      .padStart(2, "0");

    return `${year} ${month} ${day}`;
  }

  function commentTime(created_at: string) {
    const writtenTime = new Date(created_at);

    const hour = writtenTime
      .toLocaleString("ko-KR", { hour: "2-digit" })
      .padStart(2, "0")
      .split("시")[0];
    const minute = writtenTime
      .toLocaleString("ko-KR", { minute: "numeric" })
      .padStart(2, "0");

    return `${hour}:${minute}`;
  }

  return (
    <Container>
      {lists.map((item, idx) => (
        <Comment key={idx}>
          <div className="first-column">
            <img src={item.user.image_url} />
          </div>
          <div className="second-column">
            <span className="nickname">{item.user.nickname}</span>
            <span className="content">{item.content}</span>
            <span className="time">{commentTime(item.created_at)}</span>
          </div>
        </Comment>
      ))}
    </Container>
  );
}

export default CommentLists;
