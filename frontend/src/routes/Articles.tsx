import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage, faEye, faClock } from "@fortawesome/free-solid-svg-icons";
import { articleLists, IArticle, isLoggedIn } from "../recoil/atom";
import WrittenTime from "../components/common/WrittenTime";

const Container = styled.ul`
  width: 100%;

  .list {
    margin: 0 300px;
    margin-bottom: 10px;
    border-radius: 10px;
    overflow: hidden;

    a {
      display: flex;
    }
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

  return (
    <Container>
      {lists.map((item, idx) => (
        <motion.li key={idx} className="list" whileHover={{ x: 20 }}>
          <Link to={`/board/article?category=${category}&id=${item._id}`}>
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
                <span>
                  <WrittenTime created_at={item.created_at} />
                </span>
              </div>
            </Info>
          </Link>
        </motion.li>
      ))}
    </Container>
  );
}

export default Articles;
