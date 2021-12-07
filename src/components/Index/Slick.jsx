import Slider from 'react-slick';
import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import './slick.css';
import { FastForward, FastRewind, StarRounded } from '@material-ui/icons';
import { getSlickMovies } from '../../utils/firebase';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function Slick() {
  const slickRef = useRef(null);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getSlickMovies(setMovies);
  }, []);

  const goNext = () => {
    if (slickRef.current) slickRef.current.slickNext();
  };

  const goBack = () => {
    if (slickRef.current) slickRef.current.slickPrev();
  };

  return (
    <>
      <SlickDiv>
        <DesktopSlider
          className="center"
          centerMode={true}
          infinite={true}
          ref={slickRef}
          slidesToShow={5}
          swipeToSlide={true}
        >
          {movies.map((movie) => (
            <div key={movie.movieId}>
              <div className="introDiv">
                <div className="title">{movie.chTitle}</div>
                <RateDiv>
                  <Star /> {movie.rate}
                </RateDiv>
              </div>
              <MyLink to={`/movie/${movie.movieId}`}>
                <img key={movie.movieId} src={movie.poster} alt="" />
              </MyLink>
            </div>
          ))}
        </DesktopSlider>
        <MobileFlex>
          {movies.map((movie) => (
            <MobileMovie key={movie.movieId}>
              <div className="introDiv">
                <div className="title">{movie.chTitle}</div>
                <RateDiv>
                  <Star /> {movie.rate}
                </RateDiv>
              </div>
              <MyLink to={`/movie/${movie.movieId}`}>
                <img key={movie.movieId} src={movie.poster} alt="" />
              </MyLink>
            </MobileMovie>
          ))}
        </MobileFlex>
      </SlickDiv>
      <ButtonDiv>
        <Button onClick={goBack}>
          <FastRewind />
        </Button>
        <Button onClick={goNext}>
          <FastForward />
        </Button>
      </ButtonDiv>
    </>
  );
}

const SlickDiv = styled.div`
  width: 120%;
  margin-left: 9vw;
  overflow: hidden;
  height: 30vw;
  margin-top: 3vw;
  @media (max-width: 1560px) {
    width: 100%;
    margin-left: 8vw;
  }
  @media (max-width: 1440px) {
    margin-left: 7vw;
  }

  @media (max-width: 1024px) {
    overflow: scroll;
    margin-top: 0;
    margin-left: 0;
    width: 99%;
    margin-left: 7vw;
    height: 38vw;
  }
  @media (max-width: 768px) {
    height: 45vw;
  }
  @media (max-width: 500px) {
    height: 55vw;
  }
`;

const DesktopSlider = styled(Slider)`
  @media (max-width: 1024px) {
    display: none;
  }
`;

const MobileFlex = styled.div`
  display: none;
  @media (max-width: 1024px) {
    display: flex;
    align-items: center;
  }
`;

const MobileMovie = styled.div`
  display: none;
  @media (max-width: 1024px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-right: 2vw;
  }
`;

const RateDiv = styled.div`
  display: flex;
  align-items: center;
`;

const Star = styled(StarRounded)`
  transform: scale(0.8);
  color: gold;
`;

const ButtonDiv = styled.div`
  margin-top: 2.5vw;
  display: flex;
  justify-content: center;
  width: 100%;
  @media (max-width: 768px) {
    display: none;
  }
`;

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  transform: scale(0.8);
  height: 3vmin;
  width: 5vmin;
  background-color: #060606;
  color: #e5e5e5;
  cursor: pointer;
`;

const MyLink = styled(Link)`
  text-decoration: none;
  width: 100%;
`;
