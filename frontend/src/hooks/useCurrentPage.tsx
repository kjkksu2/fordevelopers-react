import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { IPagination, pagination } from "../recoil/common";

const useCurrentPage = (queryString: string) => {
  const [{ currentPage }, setPaginate] =
    useRecoilState<IPagination>(pagination);

  useEffect(() => {
    const regex = /page=[0-9]+/g;
    const urlPage = Number(queryString.match(regex)?.join("").split("=")[1]);

    currentPage !== urlPage &&
      setPaginate((prev) => ({
        ...prev,
        currentPage: urlPage,
      }));
  }, [queryString]);
};

export default useCurrentPage;
