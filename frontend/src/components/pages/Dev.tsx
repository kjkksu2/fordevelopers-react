import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import queryString from "query-string";
import { getDevLists } from "../../reactQuery/pages";
import { corsUrl } from "../../recoil/atom";
import Board from "../common/Board";
import Pagination from "../common/Pagination";

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

function Dev() {
  const backendUrl = useRecoilValue<string>(corsUrl);
  const [articleLists, setArticleLists] = useState<IArticleLists[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [numberOfArticles, setNumberOfArticles] = useState<number>(-1);
  const { search } = useLocation<string>();
  const articlesPerPage = 1;
  const maxShownButtons = 10;

  async function getDevLists() {
    const response = await fetch(
      `${backendUrl}/menus/devs/board?page=${currentPage}`,
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
    ["dev-lists"],
    getDevLists,
    {
      refetchOnWindowFocus: false,
    }
  );

  // let isLoading = false;

  // useEffect(() => {
  //   (async function () {
  //     const response = await (
  //       await fetch(`${backendUrl}/menus/devs/board?page=${currentPage}`, {
  //         method: "POST",
  //         credentials: "include",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ articlesPerPage }),
  //       })
  //     ).json();

  //     setArticleLists(response);
  //   })();
  // }, [currentPage]);

  useEffect(() => {
    data && setArticleLists(data);
  }, [data]);

  useEffect(() => {
    refetch();
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(() => Number(search.split("=")[1]));
  }, [search]);

  useEffect(() => {
    (async function () {
      const response = await (
        await fetch(`${backendUrl}/menus/devs/board/total-page`, {
          credentials: "include",
        })
      ).json();

      setNumberOfArticles(response);
    })();
  }, []);

  return (
    <Container>
      {isLoading ? (
        <span className="loading">Loading...</span>
      ) : (
        <>
          <Text>
            <span>Dev</span>
            <span>검색</span>
            <Link to="/devs/enrollment">글쓰기</Link>
          </Text>
          <Board articleLists={articleLists} />
          <Pagination
            articlesPerPage={articlesPerPage}
            maxShownButtons={maxShownButtons}
            numberOfArticles={numberOfArticles}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
    </Container>
  );
}

export default Dev;
