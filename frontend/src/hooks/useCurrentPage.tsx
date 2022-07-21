import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { regexUrl } from "../helpers/functions";
import { IPagination, pagination } from "../recoil/common";

const useCurrentPage = () => {
  const { search: url } = useLocation<string>();
  const [{ currentPage }, setPaginate] =
    useRecoilState<IPagination>(pagination);

  useEffect(() => {
    const page = Number(regexUrl(url, "page"));

    currentPage !== page &&
      setPaginate((prev) => ({
        ...prev,
        currentPage: page ?? -1,
      }));
  }, [url]);
};

export default useCurrentPage;
