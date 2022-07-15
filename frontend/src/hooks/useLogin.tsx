import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { userData } from "../functions/ftns";
import { isLoggedIn, IUser, loggedInUser } from "../recoil/auth";
import { corsUrl } from "../recoil/common";

const useLogin = () => {
  const backendUrl = useRecoilValue<string>(corsUrl);
  const [loginState, setLoginState] = useRecoilState<boolean>(isLoggedIn);
  const [_, setUser] = useRecoilState<IUser>(loggedInUser);

  useEffect(() => {
    (async () => {
      const { status, user } = await (
        await fetch(`${backendUrl}/users/auth`, {
          credentials: "include",
        })
      ).json();

      if (status === 200) {
        setLoginState(true);
        setUser(userData(user));
      }
    })();
  }, [loginState]);
};

export default useLogin;
