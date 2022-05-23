import React, { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import {
  articleLists,
  corsUrl,
  IArticle,
  IPagination,
  isLoggedIn,
  loading,
  pagination,
} from "../recoil/atom";
import Articles from "./Articles";
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

const Header = styled.section`
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

function Board() {
  const backendUrl = useRecoilValue<string>(corsUrl);
  const [{ articlesPerPage, currentPage }, setPaginate] =
    useRecoilState<IPagination>(pagination);
  const [lists, setLists] = useRecoilState<IArticle[]>(articleLists);
  const [inputValue, setInputValue] = useState<string>("");
  const [isLoading, setIsLoading] = useRecoilState<boolean>(loading);
  const { search: queryString } = useLocation<string>();
  const history = useHistory();
  const loginState = useRecoilValue<boolean>(isLoggedIn);

  const keywordRegex = /keyword=[\w|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]+/g;
  const keyword = queryString.match(keywordRegex)?.join("").split("=")[1];
  const categoryRegex = /category=[a-z]+/g;
  const category = queryString.match(categoryRegex)?.join("").split("=")[1];

  useEffect(() => {
    let fetchUrl = null;

    if (queryString.includes("keyword")) {
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
          <Header>
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
              {loginState && (
                <Link to={`/board/write?category=${category}`}>글쓰기</Link>
              )}
            </div>
          </Header>
          <Articles />
          {lists.length > 0 && <Pagination />}
        </>
      )}
    </Container>
  );
}

export default Board;
