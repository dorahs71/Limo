import Slider from 'react-slick';
import { useState, useEffect, useRef } from 'react';
import { firestore } from '../utils/firebase';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import './slick.css';
import { FastForward, FastRewind, StarRounded } from '@material-ui/icons';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const SlickDiv = styled.div`
  width: 100%;
  margin-left: 8vmin;
  overflow: hidden;
  height: auto;
  margin-top: 5vmin;
  @media (max-width: 1280px) {
    margin-left: 16vmin;
  }
`;

const RateDiv = styled.div`
  display: flex;
  align-items: center;
`;

const Star = styled(StarRounded)`
  color: gold;
`;

const ButtonDiv = styled.div`
  margin-top: 5vmin;
  display: flex;
  justify-content: center;
  width: 100%;
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

export default function Slick() {
  const slickRef = useRef(null);

  const [movies, setMovies] = useState([]);

  function getMovies() {
    firestore
      .collection('Movies')
      .where('rate', '>', '6.5')
      .orderBy('rate', 'desc')
      .limit(16)
      .get()
      .then((item) => {
        const movieList = item.docs.map((doc) => doc.data());
        setMovies(movieList);
      })
      .catch((error) => {
        console.log('Error getting documents: ', error);
      });
  }

  useEffect(() => {
    getMovies();
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
        <Slider
          className="center"
          centerMode={true}
          infinite={true}
          ref={slickRef}
          slidesToShow={5}
          swipeToSlide={true}
        >
          {movies.map((movie) => (
            <>
              <div className="introDiv">
                <div className="title">{movie.chTitle}</div>
                <RateDiv>
                  <Star /> {movie.rate}
                </RateDiv>
              </div>
              <MyLink to={`/movie/${movie.movieId}`}>
                <img key={movie.movieId} src={movie.poster} alt="" />
              </MyLink>
            </>
          ))}
        </Slider>
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
