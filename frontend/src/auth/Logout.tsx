import { memo } from "react";
import useLogout from "../hooks/useLogout";

const Logout = () => {
  const onClick = useLogout();

  return <li onClick={onClick}>로그아웃</li>;
};

export default memo(Logout);
