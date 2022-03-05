import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import Slogan from "../components/Slogan";
import { loginBtn } from "../recoil/atom";

const Container = styled.main`
  height: 100vh;
  display: flex;
`;

const Section = styled.section`
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
  const setLoginBtn = useSetRecoilState(loginBtn);

  async function onClick() {
    setLoginBtn(false);
  }

  return (
    <Container onClick={onClick}>
      <Slogan />
      <Section>
        <img className="bgImage" src="/images/hufs1.jpg" />
      </Section>
    </Container>
  );
}

export default Home;
