import styled, { keyframes } from 'styled-components';
import { useState, useEffect } from 'react';
import trailer from '../videos/trailer.mp4';
import { InfoOutlined } from '@material-ui/icons';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Coverflow from '../components/Coverflow';
import List from '../components/IndexList';
import Showing from '../components/Showing';
import { firestore } from '../utils/firebase';

const VideoSec = styled.div`
  width: 100%;
  top: 0;
  position: inherit;
  object-fit: contain;
  height: 100vh;
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 10vmin;
    background: linear-gradient(to top, #111, transparent);
    z-index: 30;
  }
  @media (max-width: 1280px) {
    height: 0;
    /* &:after {
      height: 10vmin;
    } */
  }
`;

const Video = styled.video`
  position: absolute;
  top: 0;
  overflow: hidden;
  width: 100%;
  height: 100vh;
`;

const MainDiv = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  max-width: 1500px;
  padding: 30px 24px;
  margin: 0 auto;
  @media (max-width: 1280px) {
    margin-top: 800px;
  }
`;

const Pulsate = keyframes`
100% {
text-shadow:
0 0 4px #fff,
0 0 11px #fff,
0 0 19px #fff,
0 0 40px #90EE90,
0 0 80px #75e799,
0 0 90px #ffd700,
0 0 100px #75e799,
0 0 150px #1e90ff;
}

0% {
text-shadow:
0 0 2px #fff,
0 0 4px #fff,
0 0 6px #fff,
0 0 10px #189a18,
0 0 45px #75e799,
0 0 55px #ffd700,
0 0 70px #189a18,
0 0 80px #1e90ff;
}
`;

const Title = styled.div`
  margin-top: 10vmin;
  width: 30rem;
  text-align: center;
  font-size: 4.2rem;
  animation: ${Pulsate} 1.5s infinite alternate;
  border-width: 8px;
  border-style: solid;
  border-image: linear-gradient(to bottom, #75e799, #00ffff, rgba(0, 0, 0, 0)) 1
    100%;
  text-shadow: 0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #90ee90,
    0 0 82px #ffd700, 0 0 92px #00ffff, 0 0 102px #75e799, 0 0 151px #00ffff;
  @media (max-width: 1280px) {
    width: 30rem;
    font-size: 3.5rem;
  }
`;

const TrailerDiv = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  z-index: 10;
  left: 50px;
  top: 500px;
  text-shadow: 2px 2px #778899;
  max-width: 500px;
  @media (max-width: 1280px) {
    top: 300px;
  }
`;

const TrailerTitle = styled.div`
  font-size: 70px;
  @media (max-width: 1280px) {
    font-size: 56px;
  }
`;

const TrailerIntro = styled.div`
  font-size: 30px;
  @media (max-width: 1280px) {
    font-size: 24px;
  }
`;

const TrailerBtn = styled.div`
  margin-top: 20px;
  width: 10rem;
  height: 3rem;
  z-index: 10;
  font-size: 24px;
  font-weight: bold;
  color: #fff;
  background-color: #008080;
  box-shadow: 2px 2px 7px #75e799;
  padding: 5px 5px;
  border-radius: 10px;
  border: 0;
  outline: 0;
  line-height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  @media (max-width: 1280px) {
    font-size: 18px;
  }
`;

const InfoIcon = styled(InfoOutlined)`
  transform: scale(1.4);
  margin-right: 10px;
`;

export default function Index() {
  const [showParallax, setShowParallax] = useState([]);
  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  useEffect(() => {
    let isMounted = true;
    firestore
      .collection('Movies')
      .where('date', '>', '2021/11/5')
      .orderBy('date')
      .limit(8)
      .get()
      .then((item) => {
        const parallaxList = item.docs.map((doc) => doc.data());
        if (isMounted) setShowParallax(parallaxList);
      })
      .catch((error) => {
        console.log('Error getting documents: ', error);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <VideoSec>
        <Video autoPlay muted loop>
          <source src={trailer} type="video/mp4" />
        </Video>
        <TrailerDiv>
          <TrailerTitle>駭客任務：復活</TrailerTitle>
          <TrailerIntro>
            睽違17年，2020開拍，基努李維、凱莉安摩絲回歸演出
            「尼歐」與「崔妮蒂」，延續人類與機器人的戰爭。
          </TrailerIntro>
          <TrailerBtn>
            <InfoIcon />
            更多資訊
          </TrailerBtn>
        </TrailerDiv>
      </VideoSec>
      <MainDiv>
        <Title data-aos="fade-up">網友推薦</Title>
        <Coverflow />
        <Title data-aos="fade-up">精選片單</Title>
        <List />
        <Title data-aos="fade-up">近期上映</Title>
        {showParallax.map((movie) => {
          return (
            <Showing
              key={movie.movieId}
              chTitle={movie.chTitle}
              enTitle={movie.enTitle}
              story={movie.story}
              poster={movie.poster}
              bgImg={movie.gallery[0]}
              movieId={movie.movieId}
            />
          );
        })}
      </MainDiv>
    </>
  );
}
