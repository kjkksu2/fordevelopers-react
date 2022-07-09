import styled from "styled-components";
import { Link, useRouteMatch } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import LoginBox from "../auth/LoginBox";
import { useRecoilState } from "recoil";
import Logout from "../auth/Logout";
import Profile from "../user/Profile";
import UserDelete from "../auth/UserDelete";
import { loading } from "../../recoil/common";
import { isLoggedIn, loginBtn } from "../../recoil/auth";
import useCheck from "../../hooks/useCheck";
import useLogin from "../../hooks/useLogin";
import { memo } from "react";

const Container = styled.nav<{ isHome?: boolean; isLoading: boolean }>`
  position: fixed;
  z-index: 99;
  top: ${({ isHome, isLoading }) => (isHome || isLoading ? "3%" : "0")};
  left: 50%;
  transform: translateX(-50%);
  width: ${({ isHome, isLoading }) => (isHome || isLoading ? "95%" : "100%")};
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  padding: 20px 100px;
  white-space: nowrap;
  background-color: ${(props) => props.theme.bgColors.darker};
  color: white;
  transition-property: width, top;
  transition: 0.5s ease;
  transition-delay: 0.1s;
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

const Header = () => {
  const [clickLoginBtn, setLoginBtn] = useRecoilState<boolean>(loginBtn);
  const [loginState, _] = useRecoilState<boolean>(isLoggedIn);
  const [isLoading, __] = useRecoilState<boolean>(loading);

  const isHome = useRouteMatch("/");

  useLogin();
  useCheck("loginBox", setLoginBtn);

  return (
    <Container isHome={isHome?.isExact} isLoading={isLoading}>
      <Logo>
        <Link to="/">
          <span>For</span>
          <span>Hufs</span>
        </Link>
      </Logo>
      <Menu>
        <Link to="/board?category=dev&page=1">Dev</Link>
      </Menu>
      <User>
        {loginState ? (
          <>
            <Profile />
            <Logout />
            <UserDelete />
          </>
        ) : (
          <motion.li style={{ cursor: "pointer" }} layoutId="login">
            로그인
          </motion.li>
        )}
      </User>
      <AnimatePresence>
        {clickLoginBtn ? <LoginBox layoutId="login" /> : null}
      </AnimatePresence>
    </Container>
  );
};

export default Header;
