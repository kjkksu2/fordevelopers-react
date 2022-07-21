import { memo } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { initializedButtons } from "../helpers/functions";
import { IPagination, pagination } from "../recoil/common";

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
    margin-left: 20px;
  }

  a,
  span {
    background-color: #bdc3c7;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  a {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    padding: 20px;

    &.active {
      background-color: #7f8c8d;
    }
  }

  span {
    height: 30px;
    border-radius: 10px;
    padding: 20px 10px;
  }
`;

const Pagination = () => {
  const history = useHistory();
  const { articlesPerPage, maxShownButtons, numberOfArticles, currentPage } =
    useRecoilValue<IPagination>(pagination);
  const { search: url } = useLocation<string>();
  const paginateUrl = url.split("&page")[0];

  const { totalBtn, paginatedButtons } = initializedButtons({
    articlesPerPage,
    maxShownButtons,
    numberOfArticles,
    currentPage,
  });

  const prevClick = () => {
    currentPage === 1
      ? alert("첫 페이지입니다.")
      : history.push(`/board${paginateUrl}&page=${currentPage - 1}`);
  };
  const nextClick = () => {
    currentPage === totalBtn
      ? alert("마지막 페이지입니다.")
      : history.push(`/board${paginateUrl}&page=${currentPage + 1}`);
  };

  return (
    <Nav>
      <Ul>
        <Li onClick={prevClick}>
          <span>이전</span>
        </Li>
        {paginatedButtons.map((item, idx) => (
          <Li key={idx}>
            <Link
              to={`/board${paginateUrl}&page=${item}`}
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
};

export default memo(Pagination);
