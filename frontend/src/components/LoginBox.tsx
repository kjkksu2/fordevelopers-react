import { motion } from "framer-motion";
import styled from "styled-components";

interface ILoginBoxProps {
  layoutId: string;
}

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
`;

const Title = styled.h1`
  text-align: center;
  font-size: 30px;
  margin-bottom: 20px;
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

function LoginBox({ layoutId }: ILoginBoxProps) {
  async function googleClicked() {
    window.location.href = "http://localhost:4000/users/google/login";
  }

  return (
    <Container layoutId={layoutId}>
      <img src="/images/login.jpg" />
      <Text>
        <Title>Welcome</Title>
        <Alert>
          <span>유의사항</span>
          <ul>
            <li>1. 학교 웹메일로 로그인 해주세요.</li>
            <li>2. 로그인이 안되면 구글 계정을 확인해보세요.</li>
          </ul>
        </Alert>
        <Login onClick={googleClicked}>
          <img src="/images/googleLogin.png" />
        </Login>
      </Text>
    </Container>
  );
}

export default LoginBox;
