import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { corsUrl } from "../recoil/common";

const Container = styled(motion.div)`
  position: absolute;
  background-color: #e1ecf5;
  top: 100%;
  right: 0;
  color: black;
  display: flex;
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.5);

  img {
    width: 300px;
  }
`;

const Text = styled.section`
  background-color: white;
  padding: 20px;
  white-space: nowrap;

  h1 {
    text-align: center;
    font-size: 30px;
    margin-bottom: 20px;
  }
`;

const Alert = styled.article`
  line-height: 40px;

  span {
    display: block;
    color: red;
    font-size: 18px;
    font-weight: 700;
  }
`;

const Login = styled.div`
  text-align: center;
  transform: translateY(20px);

  img {
    width: 200px;
    cursor: pointer;
  }
`;

interface ILoginBox {
  layoutId: string;
}

const LoginBox = ({ layoutId }: ILoginBox) => {
  const { pathname, search } = useLocation<string>();
  const backendUrl = useRecoilValue(corsUrl);

  const googleClicked = () => {
    localStorage.setItem("returningUrl", pathname + search);
    window.location.href = `${backendUrl}/users/google/login`;
  };

  return (
    <Container className="loginBox" layoutId={layoutId}>
      <img src="/images/login.jpg" alt="login" />
      <Text>
        <h1>Welcome</h1>
        <Alert>
          <span>유의사항</span>
          <ul>
            <li>1. 학교 웹메일로 로그인 해주세요.</li>
            <li>2. 로그인이 안되면 구글 계정을 확인해보세요.</li>
          </ul>
        </Alert>
        <Login className="loginBox" onClick={googleClicked}>
          <img src="/images/googleLogin.png" alt="googleLogin" />
        </Login>
      </Text>
    </Container>
  );
};

export default LoginBox;
