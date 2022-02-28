import styled from "styled-components";
import { Link, useRouteMatch } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import LoginBox from "../auth/LoginBox";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { isLoggedIn, isLoginBtnClicked } from "../../recoil/atom";
import Logout from "../auth/Logout";
import Profile from "../user/Profile";
import UserDelete from "../auth/UserDelete";
import { useEffect } from "react";

const Container = styled.header<{ isActive?: boolean }>`
  position: fixed;
  z-index: 99;
  top: ${(props) => (props.isActive ? "3%" : "0")};
  left: 50%;
  transform: translateX(-50%);
  width: ${(props) => (props.isActive ? "95%" : "100%")};
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  padding: 20px 100px;
  white-space: nowrap;
  background-color: ${(props) => props.theme.bgColors.darker};
  color: ${(props) => props.theme.textColors.main};
  transition-property: top, width;
  transition: 0.3s ease;
`;

const Logo = styled.div`
  font-size: 25px;
  letter-spacing: 1px;

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
  const loginState = useRecoilValue(isLoggedIn);
  const [valIsLoginBtnClicked, setIsLoginBtnClicked] =
    useRecoilState(isLoginBtnClicked);
  const setIsLoggedIn = useSetRecoilState(isLoggedIn);
  const isHome = useRouteMatch("/");

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setIsLoggedIn(true);
    }
  }, []);

  function loginClicked() {
    setIsLoginBtnClicked(true);
  }

  return (
    <Container isActive={isHome?.isExact}>
      <Logo>
        <Link to="/">
          <span>For</span>
          <span>Hufs</span>
        </Link>
      </Logo>
      <Menu>
        <Link to="/devs">Dev</Link>
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
          <Login onClick={loginClicked} layoutId="login">
            로그인
          </Login>
        )}
      </User>
      <AnimatePresence>
        {valIsLoginBtnClicked ? <LoginBox layoutId="login" /> : null}
      </AnimatePresence>
    </Container>
  );
}

export default Header;
