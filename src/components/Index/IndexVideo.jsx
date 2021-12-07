import styled from 'styled-components';
import trailer from '../../videos/trailer.mp4';
import { InfoOutlined } from '@material-ui/icons';
import { Link } from 'react-router-dom';

export default function IndexVideo() {
  return (
    <VideoDiv>
      <Video autoPlay muted loop>
        <source src={trailer} type="video/mp4" />
      </Video>

      <TrailerDiv>
        <TrailerTitle>駭客任務：復活</TrailerTitle>
        <TrailerIntro>
          睽違17年，2020開拍，基努李維、凱莉安摩絲回歸演出
          「尼歐」與「崔妮蒂」，延續人類與機器人的戰爭。
        </TrailerIntro>
        <TrailerLink to={'/movie/gmAKlYPKrYgwSdBHuMng'}>
          <TrailerBtn>
            <InfoIcon />
            更多資訊
          </TrailerBtn>
        </TrailerLink>
      </TrailerDiv>
    </VideoDiv>
  );
}

const VideoDiv = styled.div`
  top: 0;
  width: 100%;
  object-fit: contain;
`;

const Video = styled.video`
  top: 0;
  width: 100%;
  height: 100%;
  position: relative;
`;

const TrailerDiv = styled.div`
  position: absolute;
  align-self: flex-start;
  display: flex;
  flex-direction: column;
  text-align: justify;
  z-index: 100;
  margin-left: 5vw;
  margin-top: -25vw;
  max-width: 30vw;
  font-weight: 600;
  @media (max-width: 1560px) {
    max-width: 35vw;
  }
  @media (max-width: 1280px) {
    max-width: 38vw;
  }
  @media (max-width: 1024px) {
    max-width: 38vw;
  }
  @media (max-width: 768px) {
    max-width: 37vw;
  }
  @media (max-width: 600px) {
    max-width: 40vw;
    margin-top: -35vw;
  }
`;

const TrailerTitle = styled.div`
  font-size: 3rem;
  @media (max-width: 1024px) {
    font-size: 2.5rem;
  }
  @media (max-width: 768px) {
    font-size: 1.6rem;
  }
  @media (max-width: 600px) {
    font-size: 1rem;
  }
`;

const TrailerIntro = styled.div`
  font-size: 1.8rem;
  @media (max-width: 1024px) {
    font-size: 1.4rem;
  }
  @media (max-width: 768px) {
    font-size: 1rem;
  }
  @media (max-width: 600px) {
    font-size: 0.5rem;
  }
`;

const TrailerLink = styled(Link)`
  text-decoration: none;
  width: 20vmin;
  height: 6vmin;
  color: #515151;
`;

const TrailerBtn = styled.div`
  width: 15vw;
  height: 3vw;
  z-index: 10;
  margin-top: 2vmin;
  font-size: 1.5rem;
  font-weight: bold;
  color: #515151;
  background: #62d498;
  padding: 5px 5px;
  border-radius: 10px;
  text-shadow: none;
  border: 0;
  outline: 0;
  line-height: 50px;
  display: flex;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
    rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    background: #8aefba;
    color: #fff;
  }
  @media (max-width: 1560px) {
    font-size: 1.4rem;
  }
  @media (max-width: 1024px) {
    font-size: 1.2rem;
  }
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
  @media (max-width: 600px) {
    font-size: 0.5rem;
    width: 22vw;
  }
`;

const InfoIcon = styled(InfoOutlined)`
  transform: scale(1.6);
  margin-right: 1vw;
  @media (max-width: 1560px) {
    transform: scale(1.4);
  }
  @media (max-width: 1024px) {
    transform: scale(1.2);
  }
  @media (max-width: 850px) {
    transform: scale(1);
  }
  @media (max-width: 500px) {
    transform: scale(0.8);
  }
`;
