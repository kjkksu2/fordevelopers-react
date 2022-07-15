import { AnimatePresence, motion } from "framer-motion";
import { memo } from "react";
import { useRecoilState } from "recoil";

import useLogin from "../../hooks/useLogin";
import useCheck from "../../hooks/useCheck";
import { loginBtn } from "../../recoil/auth";
import LoginBox from "./LoginBox";

const Login = () => {
  const [clickLoginBtn, setLoginBtn] = useRecoilState<boolean>(loginBtn);

  useLogin();
  useCheck("loginBox", setLoginBtn);

  return (
    <>
      <motion.li style={{ cursor: "pointer" }} layoutId="login">
        로그인
      </motion.li>
      <AnimatePresence>
        {clickLoginBtn ? <LoginBox layoutId="login" /> : null}
      </AnimatePresence>
    </>
  );
};

export default memo(Login);
