import { useRecoilValue, useSetRecoilState } from "recoil";
import { corsUrl, isLoggedIn, loggedInUser } from "../../recoil/atom";

function Logout() {
  const backendUrl = useRecoilValue(corsUrl);
  const setLoginState = useSetRecoilState(isLoggedIn);
  const setUserData = useSetRecoilState(loggedInUser);

  async function onClick() {
    const answer = window.confirm("로그아웃 하시겠습니까?");

    if (answer) {
      const { status } = await fetch(`${backendUrl}/users/google/logout`, {
        credentials: "include",
      });

      if (status === 200) {
        setLoginState(false);

        setUserData({
          choice: [],
          comment: [],
          community: [],
          created_at: "",
          department: "",
          email: "",
          github_url: "",
          goToSchool: "",
          image_url: "",
          interest: [],
          introduction: "",
          like: 0,
          like_clicked_user: [],
          name: "",
          nickname: "",
          recruitment: [],
          visit: 0,
          _id: "",
        });
      }
    }
  }

  return <li onClick={onClick}>로그아웃</li>;
}

export default Logout;
