import { useRecoilState, useRecoilValue } from "recoil";
import { userData } from "../../helpers/auth";
import { isLoggedIn, IUser, loggedInUser } from "../../recoil/auth";
import { corsUrl } from "../../recoil/common";

const useLogout = () => {
  const backendUrl = useRecoilValue(corsUrl);
  const [_, setLoginState] = useRecoilState<boolean>(isLoggedIn);
  const [__, setUser] = useRecoilState<IUser>(loggedInUser);

  return async () => {
    const { status, user } = await (
      await fetch(`${backendUrl}/users/google/logout`, {
        credentials: "include",
      })
    ).json();

    if (status === 200) {
      setLoginState(false);
      setUser(userData(user));
    }
  };
};

export default useLogout;
