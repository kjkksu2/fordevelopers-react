import { motion } from "framer-motion";
import { useHistory } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { corsUrl } from "../../recoil/atom";

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

const Image = styled.img``;

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

interface ILoginBox {
  layoutId: string;
}

function LoginBox({ layoutId }: ILoginBox) {
  const history = useHistory();
  const backendUrl = useRecoilValue(corsUrl);

  async function googleClicked() {
    localStorage.setItem("loginClickedPosition", history.location.pathname);
    window.location.href = `${backendUrl}/users/google/login`;
  }

  return (
    <Container layoutId={layoutId}>
      <Image src="/images/login.jpg" />
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
