import { useLocation } from "react-router-dom";
import { useRecoilValue, SetterOrUpdater } from "recoil";
import { IArticle } from "../../recoil/article";
import { corsUrl } from "../../recoil/common";

interface IUseIcon {
  type: string;
  setPost: SetterOrUpdater<IArticle>;
}

const useIcon = (data: IUseIcon) => {
  const { type, setPost } = data;
  const backendUrl = useRecoilValue<string>(corsUrl);
  const { search } = useLocation<string>();

  const setState = () => {
    switch (type) {
      case "like":
        return setPost((prev) => ({
          ...prev,
          like: prev.like + 1,
        }));
      case "scrap":
        return setPost((prev) => ({
          ...prev,
          scrap: prev.scrap + 1,
        }));
    }
  };

  return async () => {
    const response = await fetch(`${backendUrl}/api/board/${type}/${search}`, {
      method: "POST",
      credentials: "include",
    });

    if (response.status !== 200) alert("이미 눌렀습니다.");
    else setState();
  };
};

export default useIcon;
