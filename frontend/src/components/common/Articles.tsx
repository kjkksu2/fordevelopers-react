import { AnimatePresence, motion } from "framer-motion";
import { Link, useHistory, useLocation, useRouteMatch } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage, faEye, faClock } from "@fortawesome/free-solid-svg-icons";
import { article, articleLists, IArticle, isLoggedIn } from "../../recoil/atom";

const Container = styled.ul`
  width: 100%;

  .list {
    margin: 0 300px;
    margin-bottom: 10px;
    display: flex;
    cursor: pointer;
    border-radius: 10px;
    overflow: hidden;
  }
`;

const Writer = styled.div<{ isHere: boolean }>`
  flex: 1;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px 0;

  .first-row {
    position: relative;

    img {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      margin-bottom: 15px;
    }

    .online-bg {
      position: absolute;
      top: -7%;
      right: -7%;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #e3e7e8;

      .online {
        width: 10px;
        height: 10px;
        background-color: ${(props) =>
          props.isHere
            ? props.theme.isHere.online
            : props.theme.isHere.offline};
        border-radius: 50%;
      }
    }
  }

  .second-row {
    display: flex;
    flex-direction: column;
    align-items: center;

    span {
      display: inline-block;
      font-size: 14px;
      font-weight: 700;

      &:first-child {
        border-top: 1px solid black;
        padding: 10px 0;
      }
    }
  }
`;

const Content = styled.div`
  flex: 3;
  background-color: ${(props) => props.theme.bgColors.lighter};
  padding: 15px 20px 20px 20px;

  h1 {
    margin-bottom: 20px;
    font-size: 25px;
  }

  p {
    font-size: 15px;
    line-height: 25px;
  }
`;

const Info = styled.div`
  flex: 1;
  background-color: #f5f5f5;
  display: grid;
  grid-template-rows: 1fr 0.5fr 0.5fr;

  .common {
    position: relative;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .comments {
    .message-icon {
      color: #b6bbbf;
      font-size: 55px;
    }

    span {
      display: inline-block;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -70%);
      font-size: 25px;
      font-weight: 700;
    }
  }

  .views,
  .created_at {
    color: #66707a;

    .eye-icon,
    .clock-icon {
      margin-right: 5px;
    }

    span {
      display: inline-block;
      transform: translateY(-2px);
      font-weight: 700;
    }
  }
`;

function Articles() {
  const loginState = useRecoilValue(isLoggedIn);
  const lists = useRecoilValue<IArticle[]>(articleLists);
  const { search: queryString } = useLocation<string>();

  const categoryRegex = /category=[a-z]+/g;
  const category = queryString.match(categoryRegex)?.join("").split("=")[1];

  function calculateTime(end: number, start: number, convertNumber: 60 | 24) {
    let count = 0;
    let i = start;

    while (true) {
      if (i === end) break;
      if (i === convertNumber) i = 0;

      count++;
      i++;
    }

    return count;
  }

  function showTime(created_at: string) {
    const currentTime = new Date();
    const writtenTime = new Date(created_at);

    // 초
    const S = 60 * 1000;
    if (currentTime.getTime() - writtenTime.getTime() < S) {
      return `${calculateTime(
        currentTime.getSeconds(),
        writtenTime.getSeconds(),
        60
      )}초 전`;
    }

    // 분
    const M = 60 * 60 * 1000;
    if (currentTime.getTime() - writtenTime.getTime() < M) {
      return `${calculateTime(
        currentTime.getMinutes(),
        writtenTime.getMinutes(),
        60
      )}분 전`;
    }

    // 시간
    const H = 23 * 60 * 60 * 1000;
    if (currentTime.getTime() - writtenTime.getTime() < H) {
      return `${calculateTime(
        currentTime.getHours(),
        writtenTime.getHours(),
        24
      )}시간 전`;
    }

    // 년
    const Y = 365 * 24 * 60 * 60 * 1000;
    const year = writtenTime.toLocaleString("en-US", { year: "numeric" });
    const month = writtenTime
      .toLocaleString("en-US", { month: "numeric" })
      .padStart(2, "0");
    const day = writtenTime
      .toLocaleString("en-US", { day: "numeric" })
      .padStart(2, "0");

    const hour = writtenTime
      .toLocaleString("en-US", { hour: "numeric", hour12: false })
      .padStart(2, "0");
    const minute = writtenTime
      .toLocaleString("ko-KR", { minute: "numeric" })
      .padStart(2, "0");
    const second = writtenTime
      .toLocaleString("ko-KR", { second: "numeric" })
      .padStart(2, "0");

    if (currentTime.getTime() - writtenTime.getTime() < Y) {
      return `${month}-${day} ${hour}:${minute}:${second}`;
    } else {
      return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    }
  }

  return (
    <Container>
      {lists.map((item, idx) => (
        <Link
          to={`/board/article?category=${category}&id=${item._id}`}
          key={idx}
        >
          <motion.li className="list" whileHover={{ x: 20 }}>
            <Writer isHere={loginState}>
              <div className="first-row">
                <img src={item.user.image_url} />
                <div className="online-bg">
                  <div className="online"></div>
                </div>
              </div>
              <div className="second-row">
                <span>
                  {item.user.nickname}({item.user.goToSchool})
                </span>
                <span>{item.user.department}</span>
              </div>
            </Writer>
            <Content>
              <h1>{item.title}</h1>
              <p>
                {item.content.length < 80
                  ? item.content
                  : item.content.slice(0, 80) + "..."}
              </p>
            </Content>
            <Info>
              <div className="comments common">
                <FontAwesomeIcon icon={faMessage} className="message-icon" />
                <span>{item.comment.length}</span>
              </div>
              <div className="views common">
                <FontAwesomeIcon icon={faEye} className="eye-icon" />
                <span>{item.views}</span>
              </div>
              <div className="created_at common">
                <FontAwesomeIcon icon={faClock} className="clock-icon" />
                <span>{showTime(item.created_at)}</span>
              </div>
            </Info>
          </motion.li>
        </Link>
      ))}
    </Container>
  );
}

export default Articles;
