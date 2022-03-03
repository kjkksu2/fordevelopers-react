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
      // useQuery는 함수 안에서 사용할 수 없다.
      // 그렇다고 Component에서 사용하면 클릭하기도 전에 logout 상태가 되므로
      // fetch를 사용했다.
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
