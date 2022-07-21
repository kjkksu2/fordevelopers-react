import { useLocation } from "react-router-dom";

const useUrl = () => {
  const { search } = useLocation<string>();

  const keyword = search?.split("keyword=")[1]?.split("&category")[0];
  const category =
    search
      .match(/category=[a-z]+/g)
      ?.join("")
      .split("=")[1] ?? "";

  return { keyword, category };
};

export default useUrl;
