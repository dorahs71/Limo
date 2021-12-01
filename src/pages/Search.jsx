import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import algolia from '../utils/algolia';
import nofound from '../images/nofound.gif';
import Loading from '../components/Common/Loading';

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

  return search ? (
    <SearchSection>
      <SearchMain>
        {keyword === 'undefined' && (
          <Title>不知道要看什麼？可參考以下隨機推薦</Title>
        )}
        {keyword !== 'undefined' && search.length !== 0 && (
          <Title>
            你搜尋了
            <Span> 「{keyword}」</Span> <br />
            以下為包含此關鍵字的電影
          </Title>
        )}
        {search.length === 0 && (
          <Title>
            你搜尋了
            <Span> 「{keyword}」</Span> <br />
            很抱歉，沒有找到相關的電影
          </Title>
        )}
        {search.length !== 0 && (
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
        )}
        {search.length === 0 && (
          <NoResult>
            <NoFoundImg src={nofound} alt="" />
          </NoResult>
        )}
      </SearchMain>
    </SearchSection>
  ) : (
    <Loading />
  );
}

const SearchSection = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10%;
`;

const SearchMain = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 85vh;
  @media (max-width: 768px) {
    margin-top: 5vmin;
  }
`;

const Title = styled.div`
  font-size: 4vmin;
  text-align: center;
  color: #fff;
`;

const ResultDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 40px 5px;
  padding: 10vmin 0px 10vmin 0px;
  width: 100%;
  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const NoResult = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NoFoundImg = styled.img`
  width: 40vmin;
  height: 40vmin;
`;

const MovieDiv = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  text-align: center;
`;

const MoviePoster = styled.img`
  min-width: 24vmin;
  height: 35vmin;
  object-fit: contain;
  :hover {
    transform: all 0.8s ease-in-out;
    transform: scale(1.1);
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px,
      rgba(0, 0, 0, 0.23) 0px 6px 6px;
  }
`;

const MovieTitle = styled.div`
  margin-top: 2vmin;
  font-size: 2.2vmin;
  text-align: center;
  color: #fff;
`;

const Span = styled.span`
  color: #62d498;
  font-size: 4.5vmin;
  font-weight: 500;
`;

const MyLink = styled(Link)`
  text-decoration: none;
  width: 100%;
`;
