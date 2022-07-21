const LoginSuccess = () => {
  const url = localStorage.getItem("returningUrl");
  window.location.replace(`${url}`);

  return null;
};

export default LoginSuccess;
