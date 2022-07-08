import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { isLoggedIn } from "../../recoil/auth";

function LoginSuccess() {
  const setLoginState = useSetRecoilState(isLoggedIn);

  useEffect(() => {
    setLoginState(true);
    const url = localStorage.getItem("returningUrl");
    window.location.replace(`${url}`);
  }, []);

  return null;
}

export default LoginSuccess;
