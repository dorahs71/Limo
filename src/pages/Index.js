import styled from 'styled-components';
import trailer from '../videos/matrix_trailer.mp4';
import Coverflow from 'react-coverflow';
import { StyleRoot } from 'radium';
import { InfoOutlined } from '@material-ui/icons';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const VideoDiv = styled.div`
  background-color: #000;
  width: 100%;
  height: 1000px;
  top: 0;
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 150px;
    background: linear-gradient(to bottom, #000, transparent);
    z-index: 30;
  }
`;

const Video = styled.video`
  position: absolute;
  top: 0;
  overflow: hidden;
  width: 100%;
  height: 1100px;
  display: block;
`;

const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1260px;
  padding: 30px 24px;
  margin: 0 auto;
`;

const Title = styled.div`
  margin-top: 10px;
  font-size: 48px;
  border-bottom: 3px solid #75e799;
  z-index: 50;
`;

const TrailerTitle = styled.div`
  position: relative;
  z-index: 10;
  left: 30px;
  top: 500px;
  font-size: 70px;
  text-shadow: 2px 2px #778899;
`;

const TrailerIntro = styled.div`
  position: relative;
  max-width: 500px;
  z-index: 10;
  left: 30px;
  top: 500px;
  font-size: 30px;
  text-shadow: 2px 2px #778899;
`;

const TrailerBtn = styled.div`
  position: absolute;
  width: 200px;
  height: 50px;
  z-index: 10;
  left: 30px;
  top: 750px;
  font-size: 23px;
  font-weight: bold;
  color: #fff;
  background-color: #008080;
  box-shadow: 2px 2px #888888;
  padding: 5px 5px;
  border-radius: 10px;
  border: 0;
  outline: 0;
  line-height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const InfoIcon = styled(InfoOutlined)`
  transform: scale(1.4);
  margin-right: 10px;
`;

const ListDiv = styled.div`
  margin-left: 200px;
  margin-top: 50px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 100px;
`;

const List = styled.div`
  width: 300px;
  height: 300px;
  position: relative;
  margin: 30px 50px;
`;

const ListCh1 = styled.img`
  position: absolute;
  width: 200px;
  height: 300px;
  right: 200px;
  z-index: -1;
  box-shadow: 1px 1px 10px 1px;
  -moz-transform: rotate(5deg);
  transform: rotate(5deg);
`;

const ListCh2 = styled.img`
  position: absolute;
  width: 200px;
  height: 300px;
  right: 250px;
  z-index: 0;
  box-shadow: 1px 1px 10px 1px;
`;

const ListCh3 = styled.img`
  position: absolute;
  width: 200px;
  height: 300px;
  right: 300px;
  z-index: 1;
  box-shadow: 1px 1px 10px 1px #333;
  -moz-transform: rotate(-3deg);
  transform: rotate(-3deg);
`;

export default function Index() {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  return (
    <>
      <VideoDiv>
        {/* <Video autoPlay muted loop> */}
        <Video>
          <source src={trailer} type="video/mp4" />
        </Video>

        <TrailerTitle>駭客任務：復活</TrailerTitle>
        <TrailerIntro>
          睽違17年，2020開拍，基努李維、凱莉安摩絲回歸演出
          「尼歐」與「崔妮蒂」，延續人類與機器人的戰爭。
        </TrailerIntro>
        <TrailerBtn>
          <InfoIcon />
          更多資訊
        </TrailerBtn>
      </VideoDiv>
      <MainDiv>
        <Title>網友推薦</Title>
        <StyleRoot>
          <Coverflow
            displayQuantityOfSide={4}
            navigation={true}
            infiniteScroll
            enableHeading
            enableScroll
            media={{
              '@media (max-width: 900px)': {
                width: '600px',
                height: '300px',
              },
              '@media (min-width: 1200px)': {
                width: '1300px',
                height: '500px',
              },
            }}
          >
            <img
              src="https://image.agentm.tw/images/movie/8b15a52055f527739653348c38187a4eda3768dee1fe4cad0eaa61e70fac9895/poster/image/px_0001.jpg"
              alt="Album one"
            />
            <img
              src="https://image.agentm.tw/images/movie/897bd9337c30cc7adb633b8d9229c177cda18ae929de42b55cbf756c6edf1baf/poster/image/px_0004.jpg"
              alt="Album two"
            />
            <img
              src="https://image.agentm.tw/images/movie/f66633641b7ff02115ffa2678b30e0118463154324e9ea061d908939d749124b/poster/image/px_0002.jpg"
              alt="Album three"
            />
            <img
              src="https://image.agentm.tw/images/movie/4e15b1010bd318cbc9c557b45e340e05215e4cdcd673da83f52961c2f3fbd54d/poster/image/px_0001.jpg"
              alt="Album four"
            />
            <img
              src="https://image.agentm.tw/images/movie/4e15b1010bd318cbc9c557b45e340e05215e4cdcd673da83f52961c2f3fbd54d/poster/image/px_0001.jpg"
              alt="Album four"
            />
            <img
              src="https://image.agentm.tw/images/movie/4e15b1010bd318cbc9c557b45e340e05215e4cdcd673da83f52961c2f3fbd54d/poster/image/px_0001.jpg"
              alt="Album four"
            />
            <img
              src="https://image.agentm.tw/images/movie/4e15b1010bd318cbc9c557b45e340e05215e4cdcd673da83f52961c2f3fbd54d/poster/image/px_0001.jpg"
              alt="Album four"
            />
            <img
              src="https://image.agentm.tw/images/movie/4e15b1010bd318cbc9c557b45e340e05215e4cdcd673da83f52961c2f3fbd54d/poster/image/px_0001.jpg"
              alt="Album four"
            />
          </Coverflow>
        </StyleRoot>
        <Title>精選片單</Title>
        <ListDiv>
          <List data-aos="fade-right">
            <ListCh1
              src="https://movies.yahoo.com.tw/x/r/w420/i/o/production/movies/September2021/HbO2lxjjQGtjxkbP86Uh-741x1080.jpg"
              alt=""
            ></ListCh1>
            <ListCh2
              src="https://movies.yahoo.com.tw/x/r/w420/i/o/production/movies/September2021/HbO2lxjjQGtjxkbP86Uh-741x1080.jpg"
              alt=""
            ></ListCh2>
            <ListCh3
              src="https://movies.yahoo.com.tw/x/r/w420/i/o/production/movies/September2021/HbO2lxjjQGtjxkbP86Uh-741x1080.jpg"
              alt=""
            ></ListCh3>
          </List>
          <List data-aos="fade-up">
            <ListCh1
              src="https://movies.yahoo.com.tw/x/r/w420/i/o/production/movies/September2021/HbO2lxjjQGtjxkbP86Uh-741x1080.jpg"
              alt=""
            ></ListCh1>
            <ListCh2
              src="https://movies.yahoo.com.tw/x/r/w420/i/o/production/movies/September2021/HbO2lxjjQGtjxkbP86Uh-741x1080.jpg"
              alt=""
            ></ListCh2>
            <ListCh3
              src="https://movies.yahoo.com.tw/x/r/w420/i/o/production/movies/September2021/HbO2lxjjQGtjxkbP86Uh-741x1080.jpg"
              alt=""
            ></ListCh3>
          </List>
          <List data-aos="fade-left">
            <ListCh1
              src="https://movies.yahoo.com.tw/x/r/w420/i/o/production/movies/September2021/HbO2lxjjQGtjxkbP86Uh-741x1080.jpg"
              alt=""
            ></ListCh1>
            <ListCh2
              src="https://movies.yahoo.com.tw/x/r/w420/i/o/production/movies/September2021/HbO2lxjjQGtjxkbP86Uh-741x1080.jpg"
              alt=""
            ></ListCh2>
            <ListCh3
              src="https://movies.yahoo.com.tw/x/r/w420/i/o/production/movies/September2021/HbO2lxjjQGtjxkbP86Uh-741x1080.jpg"
              alt=""
            ></ListCh3>
          </List>

          <List data-aos="fade-right">
            <ListCh1
              src="https://movies.yahoo.com.tw/x/r/w420/i/o/production/movies/September2021/HbO2lxjjQGtjxkbP86Uh-741x1080.jpg"
              alt=""
            ></ListCh1>
            <ListCh2
              src="https://movies.yahoo.com.tw/x/r/w420/i/o/production/movies/September2021/HbO2lxjjQGtjxkbP86Uh-741x1080.jpg"
              alt=""
            ></ListCh2>
            <ListCh3
              src="https://movies.yahoo.com.tw/x/r/w420/i/o/production/movies/September2021/HbO2lxjjQGtjxkbP86Uh-741x1080.jpg"
              alt=""
            ></ListCh3>
          </List>
          <List data-aos="fade-up">
            <ListCh1
              src="https://movies.yahoo.com.tw/x/r/w420/i/o/production/movies/September2021/HbO2lxjjQGtjxkbP86Uh-741x1080.jpg"
              alt=""
            ></ListCh1>
            <ListCh2
              src="https://movies.yahoo.com.tw/x/r/w420/i/o/production/movies/September2021/HbO2lxjjQGtjxkbP86Uh-741x1080.jpg"
              alt=""
            ></ListCh2>
            <ListCh3
              src="https://movies.yahoo.com.tw/x/r/w420/i/o/production/movies/September2021/HbO2lxjjQGtjxkbP86Uh-741x1080.jpg"
              alt=""
            ></ListCh3>
          </List>
        </ListDiv>
        <Title>近期上映</Title>
      </MainDiv>
    </>
  );
}
