import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { getDevLists } from "../reactQuery/pages";
import { corsUrl, IPagination, pagination } from "../recoil/atom";
import Articles from "../components/common/Articles";
import Pagination from "../components/common/Pagination";

const Container = styled.main`
  padding-top: 150px;
  background-color: ${(props) => props.theme.bgColors.main};
  min-height: 100vh;

  .loading {
    width: 100%;
    display: block;
    text-align: center;
    font-size: 50px;
    color: white;
  }

  .pagination {
    display: flex;
    justify-content: center;

    .page-item {
      background-color: #bdc3c7;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px;
      font-size: 20px;
      font-weight: 700;

      &:not(:first-child) {
        margin-left: 10px;
      }
    }
  }
`;

const Text = styled.section`
  padding: 0 300px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;

  span {
    display: inline-block;
    color: white;

    font-size: 50px;
    border-radius: 5px;
  }

  a {
    display: inline-block;
    background-color: ${(props) => props.theme.bgColors.lighter};
    color: white;
    padding: 10px;
    border-radius: 5px;
  }
`;

interface IArticleLists {
  _id: string;
  title: string;
  content: string;
  like: number;
  choice: number;
  views: number;
  user: {
    nickname: string;
    image_url: string;
    department: string;
    goToSchool: string;
    like: number;
  };
  created_at: string;
  comment: [];
}

function Lists() {
  const backendUrl = useRecoilValue<string>(corsUrl);
  const [{ articlesPerPage, currentPage }, setPaginate] =
    useRecoilState<IPagination>(pagination);
  const [articleLists, setArticleLists] = useState<IArticleLists[]>([]);
  const { search } = useLocation<string>();

  const regex = /category=[a-z]+/g;
  const category = search.match(regex)?.join("").split("=")[1];

  async function getArticles() {
    const response = await fetch(
      `${backendUrl}/play/board?category=${category}&page=${currentPage}`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ articlesPerPage }),
      }
    );
    return response.json(); // pending
  }

  const { isLoading, data, refetch } = useQuery<IArticleLists[]>(
    ["articles"],
    getArticles,
    {
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    data && setArticleLists(data);
  }, [data]);

  useEffect(() => {
    refetch();
  }, [currentPage]);

  useEffect(() => {
    const regex = /page=[0-9]+/g;
    const currentPage = Number(search.match(regex)?.join("").split("=")[1]);

    search &&
      setPaginate((prev) => ({
        ...prev,
        currentPage,
      }));
  }, [search]);

  useEffect(() => {
    (async function () {
      const response = await (
        await fetch(
          `${backendUrl}/play/board/total-page?category=${category}`,
          {
            credentials: "include",
          }
        )
      ).json();

      setPaginate((prev) => ({ ...prev, numberOfArticles: response }));
    })();
  }, []);

  return (
    <Container>
      {isLoading ? (
        <span className="loading">Loading...</span>
      ) : (
        <>
          <Text>
            <span>
              {`${category?.slice(0, 1).toUpperCase()}` +
                `${category?.slice(1)}`}
            </span>
            <span>검색</span>
            <Link to="/devs/enrollment">글쓰기</Link>
          </Text>
          <Articles articleLists={articleLists} />
          <Pagination />
        </>
      )}
    </Container>
  );
}

export default Lists;
