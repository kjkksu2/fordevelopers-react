import { useEffect, useState } from "react";
import styled from "styled-components";

const Nav = styled.nav`
  margin-bottom: 50px;
`;

const Ul = styled.ul`
  display: flex;
  justify-content: center;
`;

const Li = styled.li`
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

  &.active {
    background-color: #7f8c8d;
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
      : setCurrentPage((page) => page - 1);
  }
  function nextClick() {
    currentPage === totalBtn
      ? alert("마지막 페이지입니다.")
      : setCurrentPage((page) => page + 1);
  }

  return (
    <Nav>
      <Ul>
        <Li onClick={prevClick}>이전</Li>
        {paginatedButtons.map((item, idx) => (
          <Li
            key={idx}
            className={item === currentPage ? "active" : ""}
            onClick={() => setCurrentPage(item)}
          >
            {item}
          </Li>
        ))}
        <Li onClick={nextClick}>다음</Li>
      </Ul>
    </Nav>
  );
}

export default Pagination;
