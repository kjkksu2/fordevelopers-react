import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { corsUrl, isLoggedIn } from "../../recoil/atom";

const Container = styled.li``;

function Logout() {
  const backendUrl = useRecoilValue(corsUrl);
  const setIsLoggedIn = useSetRecoilState(isLoggedIn);

  async function containerClicked() {
    const answer = window.confirm("로그아웃 하시겠습니까?");

    if (answer) {
      const response = await fetch(`${backendUrl}/users/google/logout`, {
        credentials: "include",
      });

      if (response.status === 200) {
        setIsLoggedIn(false);
        localStorage.removeItem("user");
      }
    }
  }

  return <Container onClick={containerClicked}>로그아웃</Container>;
}

export default Logout;
