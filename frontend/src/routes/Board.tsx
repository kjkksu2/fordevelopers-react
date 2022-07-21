import React, { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { articleLists, IArticle } from "../recoil/article";
import Articles from "./Articles";
import Pagination from "../components/Pagination";
import { loading } from "../recoil/common";
import { isLoggedIn } from "../recoil/auth";
import useFetch from "../hooks/article/useFetch";
import useCurrentPage from "../hooks/article/useCurrentPage";
import { regexUrl } from "../helpers/article";

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

const Board = () => {
  const [lists, _] = useRecoilState<IArticle[]>(articleLists);
  const [isLoading, __] = useRecoilState<boolean>(loading);
  const [loginState, ___] = useRecoilState<boolean>(isLoggedIn);

  const [inputValue, setInputValue] = useState<string>("");
  const history = useHistory();
  const { search } = useLocation<string>();

  const keyword = String(regexUrl(search, "keyword"));
  const category = String(regexUrl(search, "category"));

  useFetch(keyword, category);
  useCurrentPage();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    history.push(
      `/board/search?keyword=${inputValue}&category=${category}&page=1`
    );

    setInputValue("");
  };

  const onInput = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;

    setInputValue(value);
  };

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
};

export default Board;
