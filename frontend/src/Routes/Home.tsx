import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import Slogan from "../components/Slogan";
import { isLoggedIn } from "../recoil/atom";

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
  const history = useHistory();
  const setLoginState = useSetRecoilState(isLoggedIn);

  function bgClicked() {
    history.push("/");
  }

  useEffect(() => {
    async function checkUserLoggedIn() {
      const response = await fetch("http://localhost:4000/users/auth", {
        credentials: "include",
      });
      const user = await response.json();

      if (user) setLoginState(true);
    }

    checkUserLoggedIn();
  }, []);

  return (
    <Container onClick={bgClicked}>
      <Slogan />
      <HomeSection>
        <img className="bgImage" src="/images/hufs1.jpg" />
      </HomeSection>
    </Container>
  );
}

export default Home;
