import styled from "styled-components";
import { Link, useRouteMatch } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import LoginBox from "../auth/LoginBox";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  corsUrl,
  isLoggedIn,
  IUser,
  loggedInUser,
  loginBtn,
} from "../../recoil/atom";
import Logout from "../auth/Logout";
import Profile from "../user/Profile";
import UserDelete from "../auth/UserDelete";
import React, { useEffect } from "react";

const Container = styled.header<{ isHome?: boolean }>`
  position: fixed;
  z-index: 99;
  top: ${(props) => (props.isHome ? "3%" : "0")};
  left: 50%;
  transform: translateX(-50%);
  width: ${(props) => (props.isHome ? "95%" : "100%")};
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  padding: 20px 100px;
  white-space: nowrap;
  background-color: ${(props) => props.theme.bgColors.darker};
  color: white;
  transition-property: top, width;
  transition: 0.3s ease;
`;

const Logo = styled.ul`
  font-size: 25px;
  letter-spacing: 1px;
  justify-self: left;

  span {
    display: inline-block;

    &::first-letter {
      font-size: 30px;
    }
  }
`;

const Menu = styled.ul`
  font-size: 20px;
  justify-self: center;

  a {
    &:not(:first-child) {
      margin-left: 30px;
    }
  }
`;

const User = styled.ul`
  justify-self: end;
  display: flex;

  li {
    cursor: pointer;

    &:not(:first-child) {
      margin-left: 30px;
    }
  }
`;

const Login = styled(motion.li)`
  cursor: pointer;
`;

function Header() {
  const backendUrl = useRecoilValue<string>(corsUrl);
  const [clickLoginBtn, setLoginBtn] = useRecoilState<boolean>(loginBtn);
  const [loginState, setLoginState] = useRecoilState<boolean>(isLoggedIn);
  const [userData, setUserData] = useRecoilState<IUser>(loggedInUser);
  const isHome = useRouteMatch<string>("/");

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
          community: user.community,
          created_at: user.created_at,
          department: user.department,
          email: user.email,
          github_url: user.github_url,
          goToSchool: user.goToSchool,
          image_url: user.image_url,
          interest: user.interest,
          introduction: user.introduction,
          like: user.like,
          like_clicked_user: user.like_clicked_user,
          name: user.name,
          nickname: user.nickname,
          recruitment: user.recruitment,
          visit: user.visit,
          _id: user._id,
        });
      }
    })();

    // 로그인한 모든 유저 가져오기
    // async function fetcher() {
    //   await fetch(`${backendUrl}/users/loggedIn`, {
    //     credentials: "include",
    //   });
    // }

    // fetcher();
  }, [loginState]);

  useEffect(() => {
    window.addEventListener("click", (event) => {
      const element = event.target as HTMLElement;

      if (
        element.innerText === "로그인" ||
        element.offsetParent?.className.includes("loginBox")
      ) {
        setLoginBtn(true);
      } else {
        setLoginBtn(false);
      }
    });
  }, []);

  return (
    <Container isHome={isHome?.isExact}>
      <Logo>
        <Link to="/">
          <span>For</span>
          <span>Hufs</span>
        </Link>
      </Logo>
      <Menu>
        <Link to="/devs/board?page=1">Dev</Link>
        <Link to="/boards">게시판</Link>
      </Menu>
      <User>
        {loginState ? (
          <>
            <Profile />
            <Logout />
            <UserDelete />
          </>
        ) : (
          <Login className="login" layoutId="login">
            로그인
          </Login>
        )}
      </User>
      <AnimatePresence>
        {clickLoginBtn ? <LoginBox layoutId="login" /> : null}
      </AnimatePresence>
    </Container>
  );
}

export default Header;
