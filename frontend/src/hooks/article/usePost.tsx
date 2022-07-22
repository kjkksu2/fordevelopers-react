import { useEffect } from "react";
import { SetterOrUpdater, useRecoilValue } from "recoil";
import { IArticle } from "../../recoil/article";
import { corsUrl } from "../../recoil/common";

interface IUsePost {
  category: string;
  id: string;
  setIsLoading: SetterOrUpdater<boolean>;
  setPost: SetterOrUpdater<IArticle>;
}

const usePost = (data: IUsePost) => {
  const { category, id, setIsLoading, setPost } = data;
  const backendUrl = useRecoilValue<string>(corsUrl);

  useEffect(() => {
    setIsLoading(true);

    (async function () {
      const { article, category: resCategory } = await (
        await fetch(
          `${backendUrl}/play/board/article?category=${category}&id=${id}`
        )
      ).json();

      setIsLoading(false);
      setPost(() => ({ ...article, category: resCategory }));
    })();
  }, []);

  useEffect(() => {
    (async function () {
      await fetch(
        `${backendUrl}/api/board/views?category=${category}&id=${id}`,
        {
          method: "POST",
          credentials: "include",
        }
      );
    })();
  }, []);
};

export default usePost;
