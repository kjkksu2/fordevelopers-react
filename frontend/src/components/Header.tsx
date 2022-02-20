import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";

const Container = styled.header`
  position: fixed;
  z-index: 99;
  top: 3%;
  left: 50%;
  transform: translateX(-50%);
  width: 95%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  padding: 20px 100px;
  white-space: nowrap;
  background-color: ${(props) => props.theme.bgColors.darker};
  color: ${(props) => props.theme.textColors.main};
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

  a {
    &:not(:first-child) {
      margin-left: 30px;
    }
  }
`;

const Login = styled(motion.li)`
  cursor: pointer;
`;

function Header() {
  const history = useHistory();
  const [login, setLogin] = useState<boolean>(false);

  function loginClicked() {
    history.push("/login");
  }

  return (
    <Container>
      <Logo>
        <Link to="/">
          <span>For</span>
          <span>Hufs</span>
        </Link>
      </Logo>
      <Menu>
        <Link to="#">Dev</Link>
        <Link to="#">게시판</Link>
      </Menu>
      <User>
        {login ? (
          <>
            <Link to="/users/profile">프로필</Link>
            <Link to="/logout">로그아웃</Link>
            <Link to="/users/delete">회원탈퇴</Link>
          </>
        ) : (
          <Login onClick={loginClicked} layoutId="login">
            로그인
          </Login>
        )}
      </User>
    </Container>
  );
}

export default Header;
