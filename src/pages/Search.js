import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

const SearchSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20vmin;
`;

const Title = styled.div`
  font-size: 40px;
  color: #fff;
`;

const ResultDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px 10px;
  padding: 10vmin 0px 10vmin 0px;
  width: 100%;
  max-width: 1440px;
  @media (max-width: 1280px) {
    max-width: 1140px;
    padding: 10vmin 0px 10vmin 0px;
  }
`;

const MovieDiv = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  text-align: center;
`;

const MoviePoster = styled.img`
  width: 25vmin;
  height: 35vmin;
`;

const MovieTitle = styled.div`
  margin-top: 2vmin;
  font-size: 25px;
  text-align: center;
  color: #fff;
  @media (max-width: 1280px) {
    font-size: 20px;
  }
`;

const MyLink = styled(Link)`
  text-decoration: none;
  width: 100%;
`;

export default function Search() {
  const search = useSelector((state) => state.search);

  return (
    <SearchSection>
      <Title>搜尋結果：</Title>
      <ResultDiv>
        {search.map((item) => (
          <MovieDiv>
            <MyLink to={`/movie/${item.objectID}`}>
              <MoviePoster src={item.poster} alt="" />
              <MovieTitle>{item.chTitle}</MovieTitle>
            </MyLink>
          </MovieDiv>
        ))}
      </ResultDiv>
    </SearchSection>
  );
}
