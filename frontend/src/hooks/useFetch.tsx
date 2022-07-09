import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { articleLists, IArticle } from "../recoil/article";
import { corsUrl, IPagination, loading, pagination } from "../recoil/common";

const useFetch = (keyword: string, category: string) => {
  const backendUrl = useRecoilValue<string>(corsUrl);
  const [_, setIsLoading] = useRecoilState<boolean>(loading);
  const [__, setLists] = useRecoilState<IArticle[]>(articleLists);

  const [{ articlesPerPage, currentPage }, setPaginate] =
    useRecoilState<IPagination>(pagination);

  useEffect(() => {
    let fetchUrl = null;

    if (keyword) {
      fetchUrl = `${backendUrl}/play/board/search?keyword=${keyword}&category=${category}&page=${currentPage}`;
    } else {
      fetchUrl = `${backendUrl}/play/board?category=${category}&page=${currentPage}`;
    }

    (async function () {
      setIsLoading(true);

      const { articleLists, numberOfArticles } = await (
        await fetch(fetchUrl, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ articlesPerPage }),
        })
      ).json();

      setIsLoading(false);
      setLists(articleLists);
      setPaginate((prev) => ({ ...prev, numberOfArticles }));
    })();
  }, [currentPage, keyword]);
};

export default useFetch;
