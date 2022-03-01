import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import Board from "../common/Board";

const Container = styled.div`
  padding-top: 150px;
  background-color: ${(props) => props.theme.bgColors.main};
`;

const Text = styled.div`
  padding: 0 300px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;

  span {
    display: inline-block;
    color: white;

    font-size: 50px;
    border-radius: 5px;
  }

  a {
    display: inline-block;
    background-color: ${(props) => props.theme.bgColors.lighter};
    color: white;
    padding: 10px;
    border-radius: 5px;
  }
`;

function Dev() {
  return (
    <Container>
      <Text>
        <span>Dev</span>
        <span>검색</span>
        <Link to="/devs/enrollment">글쓰기</Link>
      </Text>
      <Board />
    </Container>
  );
}

export default Dev;
