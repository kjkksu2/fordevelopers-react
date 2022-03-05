import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getDevLists } from "../../reactQuery/pages";
import Board from "../common/Board";

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
  const [articleLists, setArticleLists] = useState<IArticleLists[]>([]);
  const { isLoading, data } = useQuery("dev-lists", getDevLists, {
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data?.status === 200) {
      setArticleLists(data?.devLists);
    }
  }, [data?.devLists]);

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
        </>
      )}
    </Container>
  );
}

export default Dev;
