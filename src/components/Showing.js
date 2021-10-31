import styled from 'styled-components';
import { Parallax } from 'react-parallax';
import { Link } from 'react-router-dom';

const ImgDiv = styled.div`
  width: 1800px;
  height: 800px;
  position: relative;
  @media (max-width: 1280px) {
    width: 100%;
    height: 300px;
  }
`;

const PosterImg = styled.img`
  z-index: 50;
  position: absolute;
  right: 0;
  top: 0;
  width: 53vmin;
  height: 84.15vmin;
  @media (max-width: 1280px) {
    width: 300px;
    height: 443px;
  }
`;

const Effect = styled.div`
  background: #fff;
  color: #333;
  font-size: 40px;
  opacity: 0.7;
  left: 50%;
  top: 50%;
  padding: 20px;
`;

const Intro = styled.div`
  width: 99%;
  font-size: 25px;
  background-color: #333;
  opacity: 0.7;
  padding: 20px 10px;
`;

const TopDiv = styled.div`
  height: 7vmin;
`;

const EffectDiv = styled.div`
  position: relative;
`;

const MyLink = styled(Link)`
  text-decoration: none;
  width: 100%;
  color: #fff;
`;

export default function Showing({
  chTitle,
  enTitle,
  story,
  poster,
  bgImg,
  movieId,
}) {
  return (
    <>
      <TopDiv />

      <EffectDiv>
        <MyLink to={`/movie/${movieId}`}>
          <Parallax bgImage={bgImg} strength={500} blur={{ min: -5, max: 8 }}>
            <ImgDiv />
            <Effect>
              {chTitle} <br /> {enTitle}
            </Effect>
            <Intro>{story}</Intro>
          </Parallax>
          <PosterImg src={poster} alt="" />
        </MyLink>
      </EffectDiv>

      <TopDiv />
    </>
  );
}
