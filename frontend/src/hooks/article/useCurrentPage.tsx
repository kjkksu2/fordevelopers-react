import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { regexUrl } from "../../helpers/article";
import { IPagination, pagination } from "../../recoil/common";

const useCurrentPage = () => {
  const { search: url } = useLocation<string>();
  const [{ currentPage }, setPaginate] =
    useRecoilState<IPagination>(pagination);

  useEffect(() => {
    const page = Number(regexUrl(url, "page"));

    currentPage !== page &&
      setPaginate((prev) => ({
        ...prev,
        currentPage: page,
      }));
  }, [url]);
};

export default useCurrentPage;
