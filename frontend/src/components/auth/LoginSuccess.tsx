import { useEffect } from "react";
import { useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { getUserData } from "../../reactQuery/auth";
import { isLoggedIn } from "../../recoil/atom";

function LoginSuccess() {
  const history = useHistory();
  const setLoginState = useSetRecoilState(isLoggedIn);
  const { data: user } = useQuery("user", getUserData, {
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (user) {
      setLoginState(true);
      localStorage.setItem("user", JSON.stringify(user));

      const url = localStorage.getItem("loginClickedPosition");
      history.push(`${url}`);
    }
  }, [user]);

  return null;
}

export default LoginSuccess;
