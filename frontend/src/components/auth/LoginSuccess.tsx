import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { corsUrl, isLoggedIn } from "../../recoil/atom";

function LoginSuccess() {
  const history = useHistory();
  const backendUrl = useRecoilValue(corsUrl);
  const setIsLoggedIn = useSetRecoilState(isLoggedIn);

  useEffect(() => {
    async function checkUserLoggedIn() {
      const response = await fetch(`${backendUrl}/users/auth`, {
        credentials: "include",
      });
      const user = await response.json();

      if (user) {
        setIsLoggedIn(true);
        localStorage.setItem("user", JSON.stringify(user));
      }

      const url = localStorage.getItem("loginClickedPosition");
      history.push(`${url}`);
    }

    checkUserLoggedIn();
  }, []);

  return null;
}

export default LoginSuccess;
