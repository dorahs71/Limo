import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import algolia from '../utils/algolia';

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
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 40px 5px;
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
  :hover {
    transform: scale(1.1);
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px,
      rgba(0, 0, 0, 0.23) 0px 6px 6px;
  }
`;

const MovieTitle = styled.div`
  margin-top: 2vmin;
  font-size: 2.5vmin;
  text-align: center;
  color: #fff;
`;

const Span = styled.span`
  color: #62d498;
`;

const MyLink = styled(Link)`
  text-decoration: none;
  width: 100%;
`;

export default function Search() {
  const search = useSelector((state) => state.search);
  let { keyword } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    if (keyword === 'undefined') {
      keyword = undefined;
    }
    algolia.search(keyword).then((result) => {
      const searchResult = result.hits.map((hit) => {
        return hit;
      });
      dispatch({ type: 'getSearch', todo: searchResult });
    });
  }, [keyword]);

  return (
    <SearchSection>
      <Title>
        {keyword === 'undefined'
          ? '不知道要看什麼？可參考以下隨機推薦'
          : `你搜尋了「${keyword}」，以下為包含此關鍵字的電影`}
        {/* '你搜尋了' && (
              <>
                <Span> {keyword}</Span> <br />
              </>
            ) &&   '以下為包含此關鍵字的電影' 
          */}
      </Title>
      <ResultDiv>
        {search.map((item) => (
          <MovieDiv key={item.objectID}>
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
