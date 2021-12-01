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
  margin-left: 6vmin;
  margin-top: -40vmin;
  max-width: 50vmin;
  font-weight: 600;
  @media (max-width: 850px) {
    margin-top: -30vmin;
    max-width: 40vmin;
  }
  @media (max-width: 500px) {
    margin-top: -35vmin;
  }
`;

const TrailerTitle = styled.div`
  font-size: 5vmin;
  @media (max-width: 850px) {
    font-size: 4vmin;
  }
  @media (max-width: 500px) {
    font-size: 3vmin;
  }
`;

const TrailerIntro = styled.div`
  font-size: 3vmin;
  @media (max-width: 850px) {
    font-size: 2vmin;
  }
  @media (max-width: 500px) {
    font-size: 1.5vmin;
  }
`;

const TrailerLink = styled(Link)`
  text-decoration: none;
  width: 20vmin;
  height: 6vmin;
  color: #515151;
`;

const TrailerBtn = styled.div`
  /* margin-top: 1vmin; */
  width: 20vmin;
  height: 6vmin;
  z-index: 10;
  margin-top: 2vmin;
  font-size: 2.5vmin;
  font-weight: 450;
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
  @media (max-width: 850px) {
    font-size: 2vmin;
    width: 18vmin;
    height: 5vmin;
  }
  @media (max-width: 500px) {
    width: 23vmin;
  }
`;

const InfoIcon = styled(InfoOutlined)`
  transform: scale(1.4);
  margin-right: 1vmin;
  @media (max-width: 850px) {
    transform: scale(1);
  }
  @media (max-width: 500px) {
    transform: scale(0.8);
  }
`;
