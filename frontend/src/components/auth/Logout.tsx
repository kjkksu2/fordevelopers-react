import { useRecoilValue, useSetRecoilState } from "recoil";
import { corsUrl, isLoggedIn } from "../../recoil/atom";

function Logout() {
  const backendUrl = useRecoilValue(corsUrl);
  const setLoginState = useSetRecoilState(isLoggedIn);

  async function onClick() {
    const answer = window.confirm("로그아웃 하시겠습니까?");

    if (answer) {
      const response = await fetch(`${backendUrl}/users/google/logout`, {
        credentials: "include",
      });

      if (response.status === 200) {
        setLoginState(false);
      }
    }
  }

  return <li onClick={onClick}>로그아웃</li>;
}

export default Logout;
