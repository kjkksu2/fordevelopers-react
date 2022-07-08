import { useEffect } from "react";

const useCheck = (type: string, setState: any) => {
  useEffect(() => {
    switch (type) {
      case "loginBox":
        window.addEventListener("click", (e) => {
          const el = e.target as HTMLElement;
          const clicked =
            el.innerText === "로그인" ||
            el.offsetParent?.className.includes("loginBox");

          if (clicked) setState(true);
          else setState(false);
        });
        break;
      default:
        return;
    }
  }, []);
};

export default useCheck;
