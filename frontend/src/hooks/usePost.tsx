import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { article, IArticle } from "../recoil/article";
import { corsUrl } from "../recoil/common";

interface IUsePost {
  category: string;
  id: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setContent: React.Dispatch<React.SetStateAction<string>>;
}

const usePost = (data: IUsePost) => {
  const { category, id, setTitle, setContent } = data;
  const backendUrl = useRecoilValue<string>(corsUrl);
  const [post, setPost] = useRecoilState<IArticle>(article);
  const { pathname } = useLocation<string>();

  useEffect(() => {
    if (pathname.includes("update")) {
      (async function () {
        const { article } = await (
          await fetch(
            `${backendUrl}/play/board/article?category=${category}&id=${id}`
          )
        ).json();

        setPost(() => ({ ...article, category }));
      })();
    }
  }, []);

  useEffect(() => {
    if (pathname.includes("update")) {
      setTitle(post.title);
      setContent(post.content);
    }
  }, [post, pathname]);
};

export default usePost;
