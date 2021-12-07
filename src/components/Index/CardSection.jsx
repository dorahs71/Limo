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
  margin-top: 3vw;
  justify-items: center;
  margin-bottom: 5vmin;
  margin-bottom: 5vw;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 3vw 1vw;
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 768px) {
    margin-top: 2vw;
  }
`;

const Star = styled(StarRounded)`
  transform: scale(1);
  color: gold;

  @media (max-width: 500px) {
    transform: scale(0.6);
  }
`;

const CardLink = styled(Link)`
  text-decoration: none;
  color: #fff;
  margin-top: 3vmin;
  display: flex;
  width: 17vw;
  height: 25vw;
  justify-content: center;
  align-items: center;
  position: relative;
  transition: 1.5s ease-in-out;
  transform-style: preserve-3d;
  @media (max-width: 1280px) {
    width: 15vw;
    height: 20vw;
  }

  @media (max-width: 1024px) {
    width: 20vw;
    height: 24vw;
  }

  @media (max-width: 768px) {
    width: 24vw;
    height: 28vw;
  }
  @media (max-width: 600px) {
    width: 30vw;
    height: 38vw;
  }
`;

const RecentCard = styled.div`
  display: flex;
  width: 17vw;
  height: 25vw;
  position: relative;
  transition: 0.7s ease-in-out;
  transform-style: preserve-3d;
  &:hover {
    transform: rotateY(180deg);
  }
  @media (max-width: 1280px) {
    width: 15vw;
    height: 20vw;
  }

  @media (max-width: 1024px) {
    width: 20vw;
    height: 24vw;
  }

  @media (max-width: 768px) {
    width: 24vw;
    height: 28vw;
  }

  @media (max-width: 600px) {
    width: 30vw;
    height: 38vw;
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
  font-size: 1.5rem;
  width: 100%;
  height: 6vw;
  padding: 2vmin;
  word-wrap: break-word;
  font-weight: 400;
  margin-top: 98%;
  @media (max-width: 1280px) {
    margin-top: 85%;
    height: 5vw;
    font-size: 1.2rem;
  }
  @media (max-width: 1024px) {
    margin-top: 75%;
    height: 6vw;
  }
  @media (max-width: 768px) {
    margin-top: 75%;
    height: 7vw;
  }

  @media (max-width: 600px) {
    margin-top: 90%;
    font-size: 0.7rem;
  }
  @media (max-width: 375px) {
    margin-top: 93%;
  }
`;

const BackTitle = styled.div`
  font-size: 1.5rem;
  font-weight: 450;
  margin-bottom: 1vmin;
  margin-top: 1vmin;
  @media (max-width: 1280px) {
    font-size: 1.2rem;
  }
  @media (max-width: 600px) {
    font-size: 0.8rem;
  }
`;

const RecentRate = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 600px) {
    margin-top: -5%;
  }
`;

const BackIntro = styled.div`
  background: rgba(20, 20, 20, 0.8);
  width: 93.2%;
  height: 95%;
  padding: 1vmin;
  font-weight: 350;
  @media (max-width: 600px) {
    width: 94%;
  }
`;

const BackWord = styled.p`
  overflow: hidden;
  white-space: normal;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 8;
  font-size: 1.3rem;
  @media (max-width: 1280px) {
    font-size: 1rem;
  }
  @media (max-width: 600px) {
    font-size: 0.5rem;
    -webkit-line-clamp: 5;
  }
`;
