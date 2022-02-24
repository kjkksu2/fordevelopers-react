import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { isLoginBtnClicked } from "../../recoil/atom";

const Container = styled.div`
  height: 100vh;
`;

function Dev() {
  const setLoginClickedState = useSetRecoilState(isLoginBtnClicked);

  function onClick() {
    setLoginClickedState(false);
  }

  return <Container onClick={onClick}></Container>;
}

export default Dev;
