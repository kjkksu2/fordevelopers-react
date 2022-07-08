import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { isLoggedIn, IUser, loggedInUser } from "../recoil/auth";
import { corsUrl } from "../recoil/common";

const useLogin = () => {
  const backendUrl = useRecoilValue<string>(corsUrl);
  const [loginState, setLoginState] = useRecoilState<boolean>(isLoggedIn);
  const [_, setUserData] = useRecoilState<IUser>(loggedInUser);

  useEffect(() => {
    (async function () {
      const { status, user } = await (
        await fetch(`${backendUrl}/users/auth`, {
          credentials: "include",
        })
      ).json();

      if (status === 200) {
        setLoginState(true);

        setUserData({
          choice: user.choice,
          comment: user.comment,
          dev: user.dev,
          created_at: user.created_at,
          department: user.department,
          email: user.email,
          github_url: user.github_url,
          goToSchool: user.goToSchool,
          image_url: user.image_url,
          introduction: user.introduction,
          heart: user.heart,
          heart_clicked_user: user.heart_clicked_user,
          name: user.name,
          nickname: user.nickname,
          visit: user.visit,
          _id: user._id,
        });
      }
    })();
  }, [loginState]);
};

export default useLogin;
