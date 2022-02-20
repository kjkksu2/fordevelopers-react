import { AnimatePresence } from "framer-motion";
import { useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import LoginBox from "../components/LoginBox";
import Slogan from "../components/Slogan";

const Container = styled.main`
  height: 100vh;
  display: flex;
`;

const HomeSection = styled.section`
  position: relative;
  width: 70%;
  height: 100%;

  .bgImage {
    width: 100%;
    height: 100%;
  }
`;

function Home() {
  const loginMatch = useRouteMatch("/login");

  return (
    <Container>
      <Slogan />
      <HomeSection>
        <img className="bgImage" src="/images/hufs1.jpg" />
        <AnimatePresence>
          {loginMatch ? <LoginBox layoutId="login" /> : null}
        </AnimatePresence>
      </HomeSection>
    </Container>
  );
}

export default Home;
