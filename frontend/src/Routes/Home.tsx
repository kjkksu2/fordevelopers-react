import styled from "styled-components";
import Slogan from "../components/Slogan";

const Container = styled.main`
  height: 100vh;
  display: flex;
  background-color: ${(props) => props.theme.bgColors.main};
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
  return (
    <Container>
      <Slogan />
      <Section>
        <img className="bgImage" src="/images/hufs1.jpg" />
      </Section>
    </Container>
  );
}

export default Home;
