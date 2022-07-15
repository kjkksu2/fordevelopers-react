import { Link, useRouteMatch } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";

import Login from "../auth/Login";
import Logout from "../auth/Logout";
import UserDelete from "../auth/UserDelete";
import Profile from "../user/Profile";
import { loading } from "../../recoil/common";
import { isLoggedIn } from "../../recoil/auth";

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

  & > li {
    cursor: pointer;

    &:not(:first-child) {
      margin-left: 30px;
    }
  }
`;

const Header = () => {
  const [loginState, _] = useRecoilState<boolean>(isLoggedIn);
  const [isLoading, __] = useRecoilState<boolean>(loading);

  const isHome = useRouteMatch("/");

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
          <Login />
        )}
      </User>
    </Container>
  );
};

export default Header;
