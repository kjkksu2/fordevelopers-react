import { Link } from "react-router-dom";
import styled from "styled-components";
import Board from "../common/Board";

const Container = styled.div`
  margin-top: 150px;
`;

const Text = styled.div`
  text-align: end;

  a {
    background-color: ${(props) => props.theme.bgColors.lighter};
    color: white;
  }
`;

function Dev() {
  return (
    <Container>
      <Text>
        <Link to="/devs/enrollment">등록하기</Link>
      </Text>
      <Board />
    </Container>
  );
}

export default Dev;
