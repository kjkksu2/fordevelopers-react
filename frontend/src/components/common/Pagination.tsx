import { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { corsUrl } from "../../recoil/atom";

const Nav = styled.nav`
  margin-bottom: 50px;
`;

const Ul = styled.ul`
  display: flex;
  justify-content: center;
`;

const Li = styled.li`
  font-size: 20px;
  font-weight: 700;

  &:not(:first-child) {
    margin-left: 10px;
  }

  a,
  span {
    background-color: #bdc3c7;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    padding: 20px;
    cursor: pointer;

    &.active {
      background-color: #7f8c8d;
    }
  }
`;

interface IPagination {
  articlesPerPage: number;
  maxShownButtons: number;
  numberOfArticles: number;
  currentPage: number;
  setCurrentPage: (page: React.SetStateAction<number>) => void;
}

function Pagination({
  articlesPerPage,
  maxShownButtons,
  numberOfArticles,
  currentPage,
  setCurrentPage,
}: IPagination) {
  const history = useHistory();
  const paginatedButtons: number[] = [];

  let multiple = 0;
  while (maxShownButtons * multiple < currentPage) {
    multiple++;
  }

  const totalBtn = Math.ceil(numberOfArticles / articlesPerPage);
  const startBtn = 1 + maxShownButtons * (multiple - 1);
  const endBtn =
    totalBtn < startBtn + maxShownButtons - 1
      ? totalBtn
      : startBtn + maxShownButtons - 1;

  for (let i = startBtn; i <= endBtn; i++) {
    paginatedButtons.push(i);
  }

  function prevClick() {
    currentPage === 1
      ? alert("첫 페이지입니다.")
      : history.push(`/devs/board?page=${currentPage - 1}`);
  }
  function nextClick() {
    currentPage === totalBtn
      ? alert("마지막 페이지입니다.")
      : history.push(`/devs/board?page=${currentPage + 1}`);
  }

  return (
    <Nav>
      <Ul>
        <Li onClick={prevClick}>
          <span>이전</span>
        </Li>
        {paginatedButtons.map((item, idx) => (
          <Li key={idx}>
            <Link
              to={`/devs/board?page=${item}`}
              className={item === currentPage ? "active" : ""}
            >
              {item}
            </Link>
          </Li>
        ))}
        <Li onClick={nextClick}>
          <span>다음</span>
        </Li>
      </Ul>
    </Nav>
  );
}

export default Pagination;
