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
  margin-top: 10vw;
  @media (max-width: 600px) {
    margin-top: 15vw;
  }
`;

const SearchMain = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 83vh;
  @media (max-width: 1024px) {
    min-height: 89vh;
  }
`;

const Title = styled.div`
  font-size: 2.5rem;
  text-align: center;
  color: #fff;
  @media (max-width: 1440px) {
    font-size: 2rem;
  }
  @media (max-width: 1024px) {
    font-size: 1.5rem;
  }
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
  @media (max-width: 600px) {
    font-size: 1rem;
  }
`;

const ResultDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 40px 5px;
  padding: 4vw 0px 5vw 0px;
  width: 100%;
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const NoResult = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NoFoundImg = styled.img`
  width: 20vw;
  height: 20vw;
  @media (max-width: 1024px) {
    width: 30vw;
    height: 30vw;
  }
  @media (max-width: 768px) {
    width: 40vw;
    height: 40vw;
  }
`;

const MovieDiv = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  text-align: center;
`;

const MoviePoster = styled.img`
  min-width: 15vw;
  height: 20vw;
  object-fit: contain;
  :hover {
    transform: all 0.8s ease-in-out;
    transform: scale(1.1);
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px,
      rgba(0, 0, 0, 0.23) 0px 6px 6px;
  }
  @media (max-width: 768px) {
    min-width: 20vw;
    height: 25vw;
  }
`;

const MovieTitle = styled.div`
  margin-top: 1vw;
  font-size: 1.5rem;
  text-align: center;
  color: #fff;
  @media (max-width: 1440px) {
    font-size: 1.2rem;
  }
  @media (max-width: 1024px) {
    font-size: 1rem;
  }
  @media (max-width: 768px) {
    font-size: 1rem;
  }
  @media (max-width: 600px) {
    font-size: 0.9rem;
  }
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
