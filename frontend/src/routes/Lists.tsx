import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import {
  corsUrl,
  IArticleLists,
  IPagination,
  pagination,
} from "../recoil/atom";
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

function Lists() {
  const backendUrl = useRecoilValue<string>(corsUrl);
  const [{ articlesPerPage, currentPage }, setPaginate] =
    useRecoilState<IPagination>(pagination);
  const [articleLists, setArticleLists] = useState<IArticleLists[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { search: queryString } = useLocation<string>();
  const history = useHistory();

  const keywordRegex = /keyword=[a-zA-Z0-9]+/g;
  const categoryRegex = /category=[a-z]+/g;
  const keyword = queryString.match(keywordRegex)?.join("").split("=")[1];
  const category = queryString.match(categoryRegex)?.join("").split("=")[1];

  useEffect(() => {
    let fetchUrl = null;

    if (queryString.includes("keyword")) {
      fetchUrl = `${backendUrl}/play/board/search?keyword=${keyword}&category=${category}&page=${currentPage}`;
    } else {
      fetchUrl = `${backendUrl}/play/board?category=${category}&page=${currentPage}`;
    }

    (async function () {
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
      setArticleLists(articleLists);
      setPaginate((prev) => ({ ...prev, numberOfArticles }));
    })();
  }, [currentPage, keyword]);

  useEffect(() => {
    const regex = /page=[0-9]+/g;
    const urlPage = Number(queryString.match(regex)?.join("").split("=")[1]);

    currentPage !== urlPage &&
      setPaginate((prev) => ({
        ...prev,
        currentPage: urlPage,
      }));
  }, [queryString]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    history.push(
      `/board/search?keyword=${inputValue}&category=${category}&page=1`
    );

    setInputValue("");
  }

  function onInput(event: React.FormEvent<HTMLInputElement>) {
    const {
      currentTarget: { value },
    } = event;

    setInputValue(value);
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
                value={inputValue}
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
