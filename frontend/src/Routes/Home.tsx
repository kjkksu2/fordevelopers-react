import styled from "styled-components";
import Slogan from "../components/Slogan";

const Container = styled.main`
  height: 100vh;
  display: flex;
`;

const Background = styled.section`
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

  img {
    width: 100%;
    height: 100%;
  }
`;

const Home = () => {
  return (
    <Container>
      <Slogan />
      <Background>
        <img src="/images/hufs1.jpg" alt="bgImage" />
      </Background>
    </Container>
  );
};

export default Home;
