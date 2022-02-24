import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import Slogan from "../components/Slogan";
import { isLoginBtnClicked } from "../recoil/atom";

const Container = styled.main`
  height: 100vh;
  display: flex;
`;

const HomeSection = styled.section`
  position: relative;
  width: 70%;
  height: 100%;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to right,
      ${(props) => props.theme.bgColors.main},
      transparent 20%
    );
  }

  .bgImage {
    width: 100%;
    height: 100%;
  }
`;

function Home() {
  const setLoginBtnClicked = useSetRecoilState(isLoginBtnClicked);

  function containerClicked() {
    setLoginBtnClicked(false);
  }

  return (
    <Container onClick={containerClicked}>
      <Slogan />
      <HomeSection>
        <img className="bgImage" src="/images/hufs1.jpg" />
      </HomeSection>
    </Container>
  );
}

export default Home;
