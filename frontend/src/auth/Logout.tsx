import { memo } from "react";
import useLogout from "../hooks/auth/useLogout";

const Logout = () => {
  const onClick = useLogout();

  return <li onClick={onClick}>๋ก๊ทธ์์</li>;
};

export default memo(Logout);
