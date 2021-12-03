import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { getRecentMovie } from '../../utils/firebase';
import { Link } from 'react-router-dom';
import { StarRounded } from '@material-ui/icons';

export default function CardSection() {
  const [getCardMovie, setGetCardMovie] = useState([]);
  useEffect(() => {
    getRecentMovie(setGetCardMovie);
  }, []);

  return (
    <CardSectionDiv>
      {getCardMovie.map((movie) => {
        return (
          <CardLink to={`/movie/${movie.movieId}`} key={movie.movieId}>
            <RecentCard>
              <FrontSide poster={movie.poster}>
                <FrontTitle>
                  {movie.chTitle}
                  <RecentRate>
                    <Star /> {movie.rate}
                  </RecentRate>
                </FrontTitle>
              </FrontSide>

              <BackSide poster={movie.poster}>
                <BackIntro>
                  <BackTitle>劇情簡介</BackTitle>
                  <BackWord>{movie.story}</BackWord>
                </BackIntro>
              </BackSide>
            </RecentCard>
          </CardLink>
        );
      })}
    </CardSectionDiv>
  );
}

const CardSectionDiv = styled.div`
  margin-top: 5vmin;
  justify-items: center;
  margin-bottom: 5vmin;
  margin-bottom: 15vmin;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 5vmin 3px;
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 500px) {
    margin-bottom: 15vmin;
    grid-gap: 15vmin 3px;
  }
`;

const Star = styled(StarRounded)`
  transform: scale(1);
  color: gold;
  margin-right: 3px;
  @media (max-width: 500px) {
    transform: scale(0.6);
  }
`;

const CardLink = styled(Link)`
  text-decoration: none;
  color: #fff;
  margin-top: 3vmin;
  display: flex;
  width: 25vmin;
  height: 35vmin;
  justify-content: center;
  align-items: center;
  position: relative;
  transition: 1.5s ease-in-out;
  transform-style: preserve-3d;

  @media (max-width: 1280px) {
    width: 25vmin;
    height: 30vmin;
  }
  @media (max-width: 600px) {
    width: 25vmin;
    height: 30vmin;
  }
`;

const RecentCard = styled.div`
  margin-top: 3vmin;
  display: flex;
  width: 25vmin;
  height: 35vmin;
  position: relative;
  transition: 0.7s ease-in-out;
  transform-style: preserve-3d;
  &:hover {
    transform: rotateY(180deg);
  }
  @media (max-width: 1280px) {
    width: 30vmin;
    height: 35vmin;
  }
  @media (max-width: 600px) {
    width: 25vmin;
    height: 30vmin;
  }
`;

const FrontSide = styled.div`
  position: absolute;
  text-align: center;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  backface-visibility: hidden;
  z-index: 2;
  background-size: 100vh;
  background-size: cover;
  background-image: ${(props) => `url(${props.poster})`};
`;

const BackSide = styled.div`
  position: absolute;
  text-align: center;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  backface-visibility: hidden;
  background-size: cover;
  background-color: #333;
  z-index: 0;
  transform: rotateY(180deg);
  background-image: ${(props) => `url(${props.poster})`};
`;

const FrontTitle = styled.div`
  transform: translateZ(10px);
  background: rgba(20, 20, 20, 0.9);
  font-size: 1.2vw;
  width: 100%;
  height: 7vmin;
  padding: 2vmin;
  word-wrap: break-word;
  font-weight: 400;
  margin-top: 98%;
  @media (max-width: 1024px) {
    font-size: 2vw;
  }

  @media (max-width: 600px) {
  }
  @media (max-width: 450px) {
  }
`;

const BackTitle = styled.div`
  font-size: 2.5vmin;
  font-weight: 450;
  margin-bottom: 1vmin;
  margin-top: 1vmin;
`;

const RecentRate = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BackIntro = styled.div`
  background: rgba(20, 20, 20, 0.8);
  font-size: 1.8vmin;
  width: 93.2%;
  height: 95%;
  padding: 1vmin;
  font-weight: 350;
`;

const BackWord = styled.p`
  overflow: hidden;
  white-space: normal;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 8;
  font-size: 2vmin;
`;
