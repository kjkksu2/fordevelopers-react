import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
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
  display: grid;
  grid-template-columns: 0.5fr 1fr 0.5fr;
  align-items: center;
  margin-bottom: 15px;
  color: white;

  span {
    display: inline-block;
    font-size: 50px;
    border-radius: 5px;
  }

  div {
    text-align: end;

    a {
      display: inline-block;
      background-color: ${(props) => props.theme.bgColors.lighter};
      padding: 10px;
      border-radius: 5px;
    }
  }

  .searchBar {
    width: 100%;
    padding: 10px;
    font-size: 20px;
    outline: none;
    border: 2px solid white;
    border-radius: 30px;
    background-color: transparent;
    color: white;

    &::placeholder {
      color: #bdc3c7;
    }
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
  const [searchValue, setSearchValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { search: queryString } = useLocation<string>();
  const history = useHistory();

  const regex = /category=[a-z]+/g;
  const category = queryString.match(regex)?.join("").split("=")[1];

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

  // const { isLoading, data, refetch } = useQuery<IArticleLists[]>(
  //   ["articles"],
  //   getArticles,
  //   {
  //     refetchOnWindowFocus: false,
  //   }
  // );

  // console.log(queryString);

  // useEffect(() => {
  //   data && setArticleLists(data);
  // }, [data]);

  // useEffect(() => {
  //   refetch();
  //   console.log(currentPage);
  // }, [currentPage]);

  useEffect(() => {
    (async function () {
      const response = await (
        await fetch(
          `${backendUrl}/play/board?category=${category}&page=${currentPage}`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ articlesPerPage }),
          }
        )
      ).json();

      setIsLoading(false);
      setArticleLists(response);
    })();
  }, [currentPage]);

  useEffect(() => {
    const regex = /page=[0-9]+/g;
    const currentPage = Number(
      queryString.match(regex)?.join("").split("=")[1]
    );

    queryString &&
      setPaginate((prev) => ({
        ...prev,
        currentPage,
      }));
  }, [queryString]);

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

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    fetch(`${backendUrl}/play/board/search?category=${category}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ searchValue }),
    });

    setSearchValue("");
    setPaginate((prev) => ({ ...prev, currentPage: 1 }));
    history.push(
      `/board/search?keyword=${searchValue}&category=${category}&page=1`
    );
  }

  function onInput(event: React.FormEvent<HTMLInputElement>) {
    const {
      currentTarget: { value },
    } = event;

    setSearchValue(value);
  }

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
            <form onSubmit={onSubmit}>
              <input
                className="searchBar"
                type="text"
                placeholder="Search for..."
                spellCheck={false}
                value={searchValue}
                onInput={onInput}
              />
            </form>
            <div>
              <Link to="/devs/enrollment">글쓰기</Link>
            </div>
          </Text>
          <Articles articleLists={articleLists} />
          <Pagination />
        </>
      )}
    </Container>
  );
}

export default Lists;
